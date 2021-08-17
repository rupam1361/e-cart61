const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const Product = require("../models/productModel");

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

router.get("/", (req, res) => {
  Product.find()
    .exec()
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.get("/:id", (req, res) => {
  Product.findOne({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post("/uploads", (req, res) => {
  upload(req, res, (err) => {
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
        displayImage = req.file;
        res.status(200).json({
          message: "File uploaded successfully..",
          file: `uploads/${req.file.filename}`,
        });
      }
    }
  });
});

router.post("/", (req, res) => {
  const date = new Date().toString().split(" ");
  const day = date[2];
  const month = date[1];
  const year = date[3];
  const time = date[4];
  const fullTime = `${time}, ${day} ${month}, ${year}`;

  const newProduct = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    productImage: displayImage.filename,
    createdAt: fullTime,
  });

  newProduct
    .save()
    .then((data) => {
      res.status(201).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });

  res.status(201).json({
    message: "Product added successfully",
    data: newProduct,
  });
});

router.put("/:id", (req, res) => {
  Product.findOne({ _id: req.params.id })
    .exec()
    .then(async (data) => {
      if (displayImage !== undefined) {
        fs.unlink(`./public/uploads/${data.productImage}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

      console.log(data.name);
      await Product.updateOne(
        {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            productImage:
              displayImage !== undefined
                ? displayImage.filename
                : data.productImage,
          },
        }
      );

      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });

  console.log(displayImage);
});

router.delete("/:id", (req, res) => {
  Product.findOne({ _id: req.params.id })
    .exec()
    .then((data) => {
      fs.unlink(`./public/uploads/${data.productImage}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          Product.deleteOne({ _id: req.params.id })
            .then((result) => {
              res.status(200).json({
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
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

module.exports = router;
