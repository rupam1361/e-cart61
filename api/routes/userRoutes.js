const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const aws = require("aws-sdk");
const Razorpay = require("razorpay");
const request = require("request");

const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const checkAuth = require("../middleware/checkAuth");
const isUserAdmin = require("../middleware/adminAuth");

const mailgun = require("mailgun-js");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const mg = mailgun({
  apiKey: "2af9c1eacf5be490e192e1fbee942f47-ffefc4e4-55dc853f",
  domain: process.env.MAILGUN_DOMAIN,
});

const S3_BUCKET = process.env.S3_BUCKET;

const YOUR_KEY_ID = process.env.RAZORPAY_KEY_ID;
const YOUR_SECRET = process.env.RAZORPAY_SECRET;

let profileImage;
let displayImage;

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Images only...");
    }
  },
}).single("myImage");

// Sign Up Route
router.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((data) => {
      if (data) {
        res.status(500).json({
          message: "Email already exists..",
        });
      } else {
        if (req.body.password == req.body.confirmPassword) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              res.status(500).json({
                message: err.message,
              });
            }
            if (
              req.body.adminPassword &&
              req.body.adminPassword === ADMIN_PASSWORD
            ) {
              const newUser = new User({
                _id: mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                userProfileImage: profileImage.filename,
                role: "Admin",
                createdAt: Date.now(),
              });

              newUser
                .save()
                .then((data) => {
                  res.status(201).json({
                    data: data,
                    message: "Account created successfully..!!",
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    message: err.message,
                  });
                });
            } else if (
              req.body.adminPassword &&
              req.body.adminPassword !== ADMIN_PASSWORD
            ) {
              res.status(500).json({
                message: "Invalid Admin Password..",
              });
            } else if (!req.body.adminPassword) {
              const newUser = new User({
                _id: mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                userProfileImage: profileImage.filename,
                role: "General",
                createdAt: Date.now(),
              });

              newUser
                .save()
                .then((data) => {
                  res.status(201).json({
                    data: data,
                    message: "Account created successfully..!!",
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    message: err.message,
                  });
                });
            }
          });
        } else {
          res.status(401).json({
            message: "Passwords do not match..",
          });
        }
      }
    });
});

// Login Route
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((data) => {
      if (data) {
        bcrypt.compare(req.body.password, data.password, (err, hash) => {
          if (err) {
            res.status(500).json({
              message: err.messsage,
            });
          } else if (hash) {
            const accessToken = jwt.sign(
              {
                _id: data._id,
                username: data.username,
                email: data.email,
              },
              "secure",
              { expiresIn: "1h" }
            );
            const refreshToken = jwt.sign(
              {
                _id: data._id,
                username: data.username,
                email: data.email,
              },
              "secureRefresh",
              { expiresIn: "7d" }
            );
            res.status(200).json({
              accessToken: accessToken,
              refreshToken: refreshToken,
              message: "Logged in successfully..",
              _id: data._id,
              email: data.email,
              username: data.username,
            });
          } else {
            res.status(401).json({
              message: "Invalid credentials..",
            });
          }
        });
      } else {
        res.status(404).json({ message: "No user found with this email.." });
      }
    });
});

// Forgot password send link Route
router.post("/forgotPassword", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(async (data) => {
      if (data.length !== 0) {
        const token = jwt.sign(
          {
            _id: data._id,
            email: data.email,
          },
          "forgotPassword",
          {
            expiresIn: "30m",
          }
        );

        const passwordResetUrl = `${req.body.passwordResetUrl}/reset-password/${token}`;

        const reply = {
          from: req.body.passwordResetUrl,
          to: req.body.email,
          subject: "Reset your password for E-Cart",
          html: `
          <p>We have received a password reset request. The link to reset your password is below. if you did not make this request, ignore this mail</p>
          <a href=${passwordResetUrl}>${passwordResetUrl}</a>
        `,
        };

        await User.updateOne(
          { email: req.body.email },
          {
            $set: {
              passwordResetLink: token,
            },
          }
        )
          .exec()
          .then((data) => {
            if (data) {
              mg.messages().send(reply, function (error, body) {
                if (error) {
                  res.status(400).json({
                    message: error.message,
                  });
                }
                res.status(200).json({
                  message:
                    "Email has been sent.. Please follow the instructions..",
                });
              });
            } else {
              res.status(400).json({
                message: "Password resetting error..",
              });
            }
          });
      } else {
        res.status(401).json({
          message: "No user found with this email..",
        });
      }
    });
});

// Password reset or update Route
router.post("/resetPassword", (req, res) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.find({ passwordResetLink: req.body.passwordResetLink })
    .exec()
    .then(async (data) => {
      console.log(data);
      if (data) {
        jwt.verify(
          data[0] ? data[0].passwordResetLink : "1234",
          "forgotPassword",
          (err, decoded) => {
            if (password === confirmPassword) {
              if (err) {
                res.status(401).json({
                  message: "Invalid token or session expired..",
                });
              }
              bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                  res.status(400).json({
                    message: err.message,
                  });
                }
                await User.updateOne(
                  { passwordResetLink: req.body.passwordResetLink },
                  {
                    $set: {
                      password: hash,
                      passwordResetLink: "",
                    },
                  }
                );
              });
              return res.status(200).json({
                message: "You have successfully changed your password..",
              });
            } else {
              res.status(400).json({
                message: "Passwords do not match..",
              });
            }
          }
        );
      }
    });
});

//Get all users
router.get("/", async (req, res) => {
  await User.find()
    .exec()
    .then((data) => {
      res.status(200).json({
        data: data,
        bucketName: S3_BUCKET,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

//Get a aingle user by email
router.get("/:userId", (req, res) => {
  User.find({ _id: req.params.userId })
    .exec()
    .then((data) => {
      res.status(200).json({
        data: data,
        bucketName: S3_BUCKET,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post("/:userId/updateUserDetails", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.userId },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userProfileImage: req.body.userProfileImage,
      },
    }
  )
    .then((data) => {
      res.status(201).json({
        data: data,
        message: "Account details updated successfully..",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

// Get Products by category
router.get("/allProducts/:categoryName", (req, res) => {
  const category = req.params.categoryName.split(" ")[0];
  const subCategory = req.params.categoryName.split(" ")[1];
  if (req.params.categoryName == "All") {
    Product.find()
      .exec()
      .then((data) => {
        res.status(200).json({
          data: data,
          bucketName: S3_BUCKET,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  } else if (subCategory !== undefined) {
    Product.find({ category: category, subCategory: subCategory })
      .exec()
      .then((data) => {
        res.status(200).json({
          data: data,
          bucketName: S3_BUCKET,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  } else {
    Product.find({ category: category })
      .exec()
      .then((data) => {
        res.status(200).json({
          data: data,
          bucketName: S3_BUCKET,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  }
});

router.get("/allProducts/:categoryName/:productId", (req, res) => {
  if (req.params.categoryName == "All") {
    Product.find({ _id: req.params.productId })
      .exec()
      .then(async (data) => {
        res.status(200).json({
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  } else {
    Product.find(
      { category: req.params.categoryName } && { _id: req.params.productId }
    )
      .exec()
      .then(async (data) => {
        res.status(200).json({
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  }
});

//Add to cart
router.post("/:userId/updateCart", (req, res) => {
  User.find({ _id: req.params.userId }).then(async (data) => {
    if (data[0].cart.length <= 0) {
      await User.findByIdAndUpdate(
        { _id: req.params.userId },
        {
          $push: {
            cart: {
              category: req.body.category,
              description: req.body.description,
              name: req.body.name,
              price: req.body.price,
              productImage: req.body.productImage,
              _id: req.body._id,
              quantity: req.body.quantity,
            },
          },
        }
      );
      res.status(200).json({
        data: data,
        message: "Product added to cart successfully..!!",
      });
    } else {
      if (data[0].cart.some((somedItem) => somedItem._id === req.body._id)) {
        data[0].cart
          .filter((filteredItem) => filteredItem._id === req.body._id)
          .map(async (finalItem) => {
            await User.updateOne(
              { _id: req.params.userId, "cart._id": req.body._id },
              {
                $set: {
                  "cart.$.quantity":
                    req.body.type === "Add"
                      ? finalItem.quantity + req.body.quantity
                      : req.body.type === "Increase"
                      ? finalItem.quantity + 1
                      : finalItem.quantity - 1,
                },
              }
            );
            res.status(200).json({
              data: data,
              message: "Cart updated successfully..!!",
            });
          });
      } else {
        await User.findByIdAndUpdate(
          { _id: req.params.userId },
          {
            $push: {
              cart: {
                category: req.body.category,
                description: req.body.description,
                name: req.body.name,
                price: req.body.price,
                productImage: req.body.productImage,
                _id: req.body._id,
                quantity: req.body.quantity,
              },
            },
          }
        );
        res.status(200).json({
          data: data,
          message: "Product added to cart successfully..!!",
        });
      }
    }
  });
});

//Remove a single products from cart
router.post("/:userId/removeItemFromCart", (req, res) => {
  User.find({ _id: req.params.userId }).then(async (data) => {
    await User.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        $pull: {
          cart: {
            _id: req.body.cartProductId,
          },
        },
      }
    );
    res.status(200).json({
      data: data,
      message: "Product added to cart successfully..!!",
    });
  });
});

//Remove all products from cart
router.post("/:userId/emptyCart", (req, res) => {
  User.find({ _id: req.params.userId }).then(async (data) => {
    await User.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        $pull: {
          cart: {},
        },
      }
    );
    res.status(200).json({
      data: data,
      message: "Product added to cart successfully..!!",
    });
  });
});

//Create a new order (Customer)
router.post("/:userId/createNewOrder", (req, res) => {
  const newOrder = new Order({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    phoneCode: req.body.phoneCode,
    mobileNumber: req.body.mobileNumber,
    pincode: req.body.pincode,
    paymentMethod: req.body.paymentMethod,
    paymentId: req.body.paymentId,
    paymentAcquirerData: req.body.paymentAcquirerData,
    upiPaymentId: req.body.upiPaymentId,
    paymentBank: req.body.paymentBank,
    items: req.body.items,
    cartTotalPrice: req.body.cartTotalPrice,
    userId: req.params.userId,
    createdAt: Date.now(),
    isSeenByAdmin: false,
    isAcceptedByAdmin: false,
  });

  newOrder
    .save()
    .then((data) => {
      res.status(201).json({
        data: data,
        message: "New Order created successfully",
      });
    })

    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

//Get list of orders for a user
router.get("/:userId/getOrdersForUser", (req, res) => {
  Order.find({ userId: req.params.userId })
    .exec()
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

//Get single order for a user
router.get("/:userId/getOrdersForUser/:orderId", (req, res) => {
  Order.find({ _id: req.params.orderId })
    .exec()
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

//Get all Customer Orders for Admin
router.get("/:userId/getOrdersForAdmin", (req, res) => {
  Order.find()
    .exec()
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

//Get a single Customer Order for Admin
router.get("/:userId/getOrdersForAdmin/:orderId", (req, res) => {
  Order.find({ _id: req.params.orderId })
    .exec()
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

//Set deliveryDate by Admin
router.put(
  "/:userId/getOrdersForAdmin/:orderId/changeOrderIsAcceptedByAdminStatus",
  (req, res) => {
    Order.findByIdAndUpdate(
      { _id: req.params.orderId },
      {
        $set: {
          isAcceptedByAdmin: true,
          deliveryDate: req.body.deliveryDate,
        },
      }
    )
      .exec()
      .then((data) => {
        res.status(200).json({
          data: data,
          message: "Order accepted..",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  }
);

//Push Customer notifications to Admin
router.put("/:userId/pushCustomerNotificationsToAdmin", (req, res) => {
  User.find({ role: "Admin" })
    .then(async (data) => {
      await User.updateMany(
        { role: "Admin" },
        {
          $push: {
            notifications: {
              _id: req.body.notificationId,
              orderCreatedAt: req.body.orderCreatedAt,
              message: req.body.message,
              isSeenByAdmin: false,
            },
          },
        }
      );
      res.status(200).json({
        data: data,
        message: "Notification added successfully..!!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

//Send Customer notifications to Admin
router.get("/:userId/getNotificationsFromCustomer", (req, res) => {
  User.find({ _id: req.params.userId })
    .then((data) => {
      res.status(200).json({
        data: data,
        message: "Get notifications from customers!!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

//Push Admin notifications to Customer
router.put("/:userId/pushAdminNotificationsToCustomer", (req, res) => {
  User.find({ _id: req.body.userId })
    .then(async (data) => {
      await User.findByIdAndUpdate(
        { _id: req.body.userId },
        {
          $push: {
            notifications: {
              _id: req.body.notificationId,
              message: req.body.message,
              deliveryDetailsCreatedAt: Date.now(),
              orderDeliveryNotificationSeen: false,
            },
          },
        }
      );
      res.status(200).json({
        data: data,
        message: "Notification added successfully..!!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

//Get all notifications
router.get("/:userId/getAllNotifications", (req, res) => {
  User.find({ _id: req.params.userId })
    .then(async (data) => {
      res.status(200).json({
        data: data,
        message: "Get all notifications!!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

//Change order is seen by admin status
router.put(
  "/:userId/getOrdersForAdmin/:orderId/changeOrderIsSeenByAdminStatus",
  (req, res) => {
    Order.findByIdAndUpdate(
      { _id: req.params.orderId },
      {
        $set: {
          isSeenByAdmin: true,
        },
      }
    )
      .exec()
      .then(async () => {
        await User.updateMany(
          { role: "Admin", "notifications._id": req.params.orderId },
          {
            $set: {
              "notifications.$.isSeenByAdmin": true,
            },
          }
        );
      })
      .then((data) => {
        res.status(200).json({
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  }
);

//Update notification seen status
router.put(
  "/:userId/getOrdersForCustomer/:orderId/updateNotificationSeenStatus",
  (req, res) => {
    Order.findByIdAndUpdate(
      { _id: req.params.orderId },
      {
        $set: {
          orderDeliveryNotificationSeen: true,
        },
      }
    )
      .exec()
      .then(async () => {
        await User.updateOne(
          {
            _id: req.params.userId,
            "notifications._id": req.params.orderId,
          },
          {
            $set: {
              "notifications.$.orderDeliveryNotificationSeen": true,
            },
          }
        );
      })
      .then((data) => {
        res.status(200).json({
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  }
);

// Get Products Route for a user
router.get("/:userId/products", (req, res) => {
  Product.find({ userId: req.params.userId })
    .exec()
    .then((data) => {
      res.status(200).json({
        data: data,
        bucketName: S3_BUCKET,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

// Get a Single Product Route
router.get("/:userId/products/:productId", checkAuth, (req, res) => {
  Product.find({ userId: req.params.userId } && { _id: req.params.productId })
    .exec()
    .then((data) => {
      res.status(200).json({
        data: data,
        bucketName: S3_BUCKET,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

// Store images Route
router.post("/uploads", upload, (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: fs.readFileSync(req.file.path),
    ContentType: fileType,
    ACL: "public-read",
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      res.json({
        message: err,
      });
    } else {
      if (req.file == undefined) {
        res.json({
          message: "No file selected...",
        });
      } else {
        profileImage = req.file;
        displayImage = req.file;
        res.status(200).json({
          data: data,
          message: "File uploaded successfully..",
          file: `https://${S3_BUCKET}.s3.amazonaws.com/${req.file.filename}`,
        });
      }
    }
  });
});

// Add a new Product
router.post("/:userId/products", checkAuth, (req, res) => {
  const newProduct = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    productImage: displayImage.filename,
    category: req.body.category,
    subCategory: req.body.subCategory,
    tags: req.body.tags,
    createdAt: Date.now(),
  });

  newProduct
    .save()
    .then((data) => {
      res.status(201).json({
        data: data,
        message: "Product added successfully..",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

// Update a Product Route
router.put("/:userId/products/:productId", checkAuth, (req, res) => {
  Product.find({ userId: req.params.userId } && { _id: req.params.productId })
    .exec()
    .then(async (data) => {
      if (req.body.productImage != null) {
        const s3 = new aws.S3();
        const fileName = data[0].productImage;

        const s3Params = {
          Bucket: S3_BUCKET,
          Key: fileName,
        };

        s3.deleteObject(s3Params, (err, data1) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        console.log("Image unavailable..");
      }

      await Product.updateOne(
        {
          _id: new mongoose.Types.ObjectId(req.params.productId),
        },
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            productImage:
              req.body.productImage != null
                ? req.body.productImage
                : data[0].productImage,
            category: req.body.category,
            subCategory: req.body.subCategory,
            tags: req.body.tags,
          },
        }
      );
      res.status(200).json({
        message: "Product updated successfully...",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

// Delete a Product Route
router.delete("/:userId/products/:productId", checkAuth, (req, res) => {
  Product.find({ userId: req.params.userId } && { _id: req.params.productId })
    .exec()
    .then((data) => {
      if (data) {
        const s3 = new aws.S3();
        const fileName = data[0].productImage;

        const s3Params = {
          Bucket: S3_BUCKET,
          Key: fileName,
        };

        s3.deleteObject(s3Params, (err, data1) => {
          if (err) {
            console.log(err);
          } else {
            Product.deleteOne({ _id: req.params.productId })
              .then((result) => {
                res.status(200).json({
                  message: "Product deleted successfully..",
                  data: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err.message,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

// Refresh token Route
router.post("/refresh-token", (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) {
    res.status(401).json({
      error: "No refresh token found",
    });
  }
  jwt.verify(refreshToken, "secureRefresh", (err, user) => {
    if (err) {
      res.status(401).json({
        error: err.message,
      });
    }
    const accessToken = jwt.sign(
      {
        email: user.email,
        username: user.username,
        _id: user._id,
      },
      "secure",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      accessToken: accessToken,
    });
  });
});

router.post("/razorpay/order", (req, res) => {
  const instance = new Razorpay({
    key_id: YOUR_KEY_ID,
    key_secret: YOUR_SECRET,
  });

  const options = {
    amount: req.body.cartTotalPrice, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  instance.orders.create(options, function (err, order) {
    if (err) {
      res.status(401).json({
        error: err.message,
      });
    }
    res.status(200).json({
      order: order,
    });
  });
});

router.post("/razorpay/capture/:paymentId", (req, res) => {
  try {
    return request(
      {
        method: "POST",
        url: `https://${YOUR_KEY_ID}:${YOUR_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: 100,
          currency: "INR",
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({
            message: "Something error!s",
          });
        }
        return res.status(200).json(body);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
