import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { message } from "antd";

import NavbarPage from "./components/NavbarPage/NavbarPage";
import DrawerPage from "./components/Drawer/DrawerPage";
import NotificationsDrawerPage from "./components/Notifications/NotificationsDrawerPage";
import MenuDrawerPage from "./components/MenuDrawerPage/MenuDrawerPage";
import BasePage from "./components/Basepage/BasePage";
import MyCartPage from "./components/MyCartPage/MyCartPage";
import OrdersPage from "./components/OrdersPage/OrdersPage";
import ResetPassword from "./components/ResetPassword/ResetPassword";

import "./App.css";

const url = "/api/v1/users";
const imgUrl = `https://ehc-hospital.s3.ap-south-1.amazonaws.com`;

const productCategories = [
  { id: 1, title: "All" },
  { id: 2, title: "Men" },
  { id: 3, title: "Women" },
  { id: 4, title: "Kids" },
  { id: 5, title: "Beauty" },
  { id: 6, title: "Home-Living" },
  { id: 7, title: "Others" },
];

const categoryList = [
  { id: 1, name: "Men" },
  { id: 2, name: "Women" },
  { id: 3, name: "Kids" },
  { id: 4, name: "Beauty" },
  { id: 5, name: "Home-Living" },
  { id: 6, name: "Others" },
];

const menSubCategoryList = [
  { id: 1, name: "Shirt" },
  { id: 2, name: "T-Shirt" },
  { id: 3, name: "Kurta" },
  { id: 4, name: "Vest" },
  { id: 5, name: "Shorts" },
  { id: 6, name: "Pant" },
  { id: 7, name: "Jeans" },
  { id: 8, name: "Pyjama" },
  { id: 9, name: "Underwear" },
  { id: 10, name: "Shoe" },
  { id: 11, name: "Socks" },
  { id: 12, name: "Slipper" },
];

const womenSubCategoryList = [
  { id: 1, name: "Shirt" },
  { id: 2, name: "Top" },
  { id: 3, name: "Kurti" },
  { id: 4, name: "Bra" },
  { id: 5, name: "Shorts" },
  { id: 6, name: "Pant" },
  { id: 7, name: "Jeans" },
  { id: 8, name: "Pyjama" },
  { id: 9, name: "Panties" },
  { id: 10, name: "Saree" },
  { id: 11, name: "Shoe" },
  { id: 12, name: "Socks" },
  { id: 13, name: "Slipper" },
];

const kidsSubCategoryList = [
  { id: 1, name: "Shirt" },
  { id: 2, name: "T-Shirt" },
  { id: 3, name: "Top" },
  { id: 4, name: "Kurta" },
  { id: 5, name: "Kurti" },
  { id: 6, name: "Vest" },
  { id: 7, name: "Shorts" },
  { id: 8, name: "Pant" },
  { id: 9, name: "Jeans" },
  { id: 11, name: "Pyjama" },
  { id: 12, name: "Underwear" },
  { id: 13, name: "Shoe" },
  { id: 14, name: "Socks" },
  { id: 15, name: "Slipper" },
];

const beautySubCategoryList = [
  { id: 1, name: "Face Wash" },
  { id: 2, name: "Shampoo" },
];
const homeSubCategoryList = [
  {
    id: 1,
    name: "Furnishing",
  },
];
const othersSubCategoryList = [];

const App = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [authenticationPage, setAuthenticationPage] = useState("Login");
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [secondBreadcrum, setSecondBreadcrum] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isSingleProductPageActive, setIsSingleProductPageActive] = useState(
    false
  );
  const [forgotPasswordPageActive, setForgotPasswordPageActive] = useState(
    false
  );
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [loginBtnLoading, setLoginButtonLoading] = useState(false);
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [cart, setCart] = useState([]);
  const [cartBadge, setCartBadge] = useState(null);
  const [cartTotalPrice, setCartTotalPrice] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [notificationsDrawerVisible, setNotificationsDrawerVisible] = useState(
    false
  );
  const [menuDrawerVisible, setMenuDrawerVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAcceptOrderModalVisible, setIsAcceptOrderModalVisible] = useState(
    false
  );
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ordersForAdmin, setOrdersForAdmin] = useState(null);
  const [ordersForUser, setOrdersForUser] = useState(null);
  const [adminNotificationsLength, setAdminNotificationsLength] = useState(
    null
  );
  const [
    customerNotificationsLength,
    setCustomerNotificationsLength,
  ] = useState(null);
  const [pendingAdminOrdersList, setPendingAdminOrdersList] = useState(null);
  const [isSingleOrderPageActive, setIsSingleOrderPageActive] = useState(false);
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);
  const [breadcrumOrder, setBreadcrumOrder] = useState({});
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(false);
  const [newOrderId, setNewOrderId] = useState("");

  const history = useHistory();
  const token = localStorage.getItem("access-token");

  const openDrawer = () => {
    setDrawerVisible(true);
    setErrorMessage("");
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const openNotificationsDrawer = () => {
    setNotificationsDrawerVisible(true);
  };

  const closeNotificationsDrawer = () => {
    setNotificationsDrawerVisible(false);
  };

  const openMenuDrawer = () => {
    setMenuDrawerVisible(true);
  };

  const closeMenuDrawer = () => {
    setMenuDrawerVisible(false);
  };

  const changeCategory = (e) => {
    if (e === "Home") {
      getProducts("All");
      setSecondBreadcrum("All");
      setSelectedProduct(null);
      setIsSingleProductPageActive(false);
      console.log("All");
    } else {
      getProducts(e);
      setSecondBreadcrum(e);
      setSelectedProduct(null);
      setIsSingleProductPageActive(false);
      console.log(e);
    }
  };

  const getProducts = async (category) => {
    if (token === null) {
      setIsPageLoading(true);
      axios
        .get(`${url}/allProducts/${category}`)
        .then((result) => {
          setAllProducts(result.data.data);
        })
        .then(() => setIsPageLoading(false));
    } else {
      const decoded = jwt_decode(token);
      const exp = decoded.exp;
      const tokenExpiredTime = exp * 1000;
      const currentTime = new Date().valueOf();
      if (currentTime <= tokenExpiredTime) {
        setLoginButtonLoading(true);
        setIsPageLoading(true);
        axios
          .get(`${url}/allProducts/${category}`)
          .then((result) => {
            setAllProducts(result.data.data);
          })
          .then(() => setIsPageLoading(false));
      } else {
        const refreshToken = localStorage.getItem("refresh-token");

        await axios
          .post(`${url}/refresh-token`, {
            refreshToken: refreshToken,
          })
          .then(async (data) => {
            localStorage.setItem("access-token", data.data.accessToken);
            axios
              .get(`${url}/allProducts/${category}`)
              .then((result) => {
                setAllProducts(result.data.data);
              })
              .then(() => setIsPageLoading(false));
          });
      }
    }
  };

  const getUserDetails = async () => {
    const token = localStorage.getItem("access-token");
    const decoded = jwt_decode(token);
    await axios.get(`${url}/${decoded._id}`).then(async (data) => {
      setCurrentUserDetails(data.data.data[0]);
      setCart(data.data.data[0].cart);
      setAdminNotificationsLength(
        data.data.data[0].notifications.filter(
          (unseenNotifications) => unseenNotifications.isSeenByAdmin === false
        ).length
      );
      setCustomerNotificationsLength(
        data.data.data[0].notifications.filter(
          (unseenNotifications) =>
            unseenNotifications.orderDeliveryNotificationSeen === false
        ).length
      );

      if (data.data.data[0]) {
        let total = 0;
        let totalPrice = 0;
        await data.data.data[0].cart.forEach((cartItem) => {
          total = total + cartItem.quantity;
          totalPrice = totalPrice + cartItem.price * cartItem.quantity;
        });
        setCartBadge(total);
        setCartTotalPrice(totalPrice);
      }
    });
  };

  useEffect(() => {
    getProducts("All");

    if (token !== null) {
      getUserDetails();
      getOrdersForUser();
      getOrdersForAdmin();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeLoginSignup = (e) => {
    setAuthenticationPage(e);
    // setSuccessMessage("");
    // setErrorMessage(null);
  };

  const goToSingleProduct = (product) => {
    setIsPageLoading(true);
    setSelectedProduct(product.name);
    updateChangeProductCategory(product.category);
    axios
      .get(`${url}/allProducts/All/${product._id}`)
      .then((result) => {
        setAllProducts(result.data.data);
      })
      .then(() => {
        setIsPageLoading(false);
      });
    setIsSingleProductPageActive(true);
  };

  const signup = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    userProfileImage
  ) => {
    if (
      firstName === "" &&
      lastName === "" &&
      email === "" &&
      password === "" &&
      confirmPassword === ""
    ) {
      setErrorMessage("All fields are required..!!");
    } else if (firstName === "") {
      setErrorMessage("First name is required..!!");
    } else if (lastName === "") {
      setErrorMessage("Last name is required..!!");
    } else if (email === "") {
      setErrorMessage("Email is required..!!");
    } else if (password === "") {
      setErrorMessage("Password is required..!!");
    } else if (confirmPassword === "") {
      setErrorMessage("Confirm password is required..!!");
    } else if (userProfileImage === null) {
      setErrorMessage("Please choose a profile image..!!");
    } else {
      setLoginButtonLoading(true);
      setErrorMessage("");
      console.log(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        userProfileImage.name
      );
      const formData = new FormData();
      formData.append("myImage", userProfileImage, userProfileImage.name);

      await axios.post(`${url}/uploads`, formData).then(async () => {
        await axios
          .post(`${url}/signup`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            userProfileImage: userProfileImage.name,
          })
          .then((result) => {
            setSuccessMessage(result.data.message);
            console.log(result.data);
            setLoginButtonLoading(false);
          })
          .then(() => changeLoginSignup("Login"))
          .catch((err) => {
            console.log(err.response.data.message);
            setErrorMessage(err.response.data.message);
            setLoginButtonLoading(false);
          });
      });
    }
  };

  const login = async (email, password) => {
    console.log(email, password);
    if (email === "" && password === "") {
      setErrorMessage("All fields are required..!!");
    } else if (email === "") {
      setErrorMessage("Email is required..!!");
    } else if (password === "") {
      setErrorMessage("Password is required..!!");
    } else {
      setLoginButtonLoading(true);
      setErrorMessage("");
      await axios
        .post(`${url}/login`, {
          email: email,
          password: password,
        })
        .then((result) => {
          console.log(result.data.message);
          localStorage.setItem("access-token", result.data.accessToken);
          localStorage.setItem("refresh-token", result.data.refreshToken);
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setErrorMessage(err.response.data.message);
          setLoginButtonLoading(false);
        });
    }
  };

  const goToForgotPassword = () => {
    console.log("Forgot Password");
    setErrorMessage("");
    setForgotPasswordPageActive(!forgotPasswordPageActive);
  };

  const changeSectionPage = (e) => {
    console.log(e);
    setIsPageLoading(true);
    if (e === "Cart") {
      history.push("/cart");
      setIsPageLoading(false);
    } else if (e === "Home") {
      history.push("/");
      setIsPageLoading(false);
    } else if (e === "Orders") {
      history.push("/orders");
      setIsPageLoading(false);
    }
    setMenuDrawerVisible(false);
  };

  const setEditMode = () => {
    setIsEditModeActive(true);
    setErrorMessage(false);
  };

  const cancelEdit = () => {
    setIsEditModeActive(false);
  };

  const addProduct = async (
    title,
    description,
    price,
    subCategory,
    productImage
  ) => {
    console.log(title, description, price, subCategory, productImage);
    if (
      title === "" &&
      description === "" &&
      price === "" &&
      productCategory === "" &&
      subCategory === "" &&
      productImage === null
    ) {
      setErrorMessage("All the fields are required..");
    } else if (title === "") {
      setErrorMessage("Product Title cannot be empty..");
    } else if (description === "") {
      setErrorMessage("Description cannot be empty..");
    } else if (price === "") {
      setErrorMessage("Price cannot be empty..");
    } else if (productCategory === "") {
      setErrorMessage("Please choose a Category..");
    } else if (subCategory === "") {
      setErrorMessage("Please choose a Sub-category..");
    } else if (productImage === null) {
      setErrorMessage("Please choose a Product Image");
    } else {
      setErrorMessage("");
      const formData = new FormData();
      formData.append("myImage", productImage, productImage.name);
      await axios
        .post(`${url}/uploads`, formData)
        .then(async () => {
          const config = {
            headers: {
              Authorization: token,
            },
          };
          await axios
            .post(
              `${url}/${currentUserDetails._id}/products`,
              {
                name: title,
                description: description,
                price: parseFloat(price),
                productImage: productImage.name,
                category: productCategory,
                subCategory: subCategory,
                userId: currentUserDetails._id,
              },
              config
            )
            .then((data) => {
              console.log(data.data);
              changeCategory("Home");
              // parentCallback(data.data.message, "success");
              // setIsSaving(false);
            });
        })

        .then(() => history.push("/"));
    }
  };

  const sendForgotPasswordLink = async (forgotPasswordEmail) => {
    console.log(forgotPasswordEmail);
    if (forgotPasswordEmail === "") {
      setErrorMessage("Email address cannot be empty..");
    } else {
      setIsSendingLink(true);
      try {
        const response = await axios.post(`${url}/forgotPassword`, {
          email: forgotPasswordEmail,
          passwordResetUrl: `${window.location.href.split("/")[0]}/${
            window.location.href.split("/")[1]
          }/${window.location.href.split("/")[2]}`,
        });
        console.log(response.data.message);
        // parentCallback(response.data.message);
        setSuccessMessage(response.data.message);
        setIsSendingLink(false);
        setForgotPasswordPageActive(false);
      } catch (err) {
        // console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
        setIsSendingLink(false);
      }
    }
  };

  const resetPassword = async (password, confirmPassword, resetToken) => {
    console.log(resetToken);
    if (password === "" && confirmPassword === "") {
      setErrorMessage("Password & Confirm Password cannot be empty..");
    } else if (password === "") {
      setErrorMessage("Password cannot be empty..");
    } else if (confirmPassword === "") {
      setErrorMessage("Confirm password cannot be empty..");
    } else {
      setErrorMessage("");
      setResettingPassword(true);
      try {
        const response = await axios.post(`${url}/resetPassword`, {
          passwordResetLink: resetToken,
          password: password,
          confirmPassword: confirmPassword,
        });
        console.log(response.data.message);
        // parentCallback(response.data.message);
        setIsPasswordResetSuccess(true);
        setResettingPassword(false);
      } catch (err) {
        if (err) {
          console.log(err.response.data.message);
          setErrorMessage(err.response.data.message);
          setResettingPassword(false);
        }
      }
    }
  };

  const updateChangeProductCategory = (e) => {
    console.log(e);
    setProductCategory(e);
    if (e.toLowerCase() === "men") {
      setProductSubCategory(menSubCategoryList);
    } else if (e.toLowerCase() === "women") {
      setProductSubCategory(womenSubCategoryList);
    } else if (e.toLowerCase() === "kids") {
      setProductSubCategory(kidsSubCategoryList);
    } else if (e.toLowerCase() === "beauty") {
      setProductSubCategory(beautySubCategoryList);
    } else if (e.toLowerCase() === "home-living") {
      setProductSubCategory(homeSubCategoryList);
    } else if (e.toLowerCase() === "others") {
      setProductSubCategory(othersSubCategoryList);
    } else {
      setProductSubCategory("Select");
    }
  };

  const saveChanges = async (
    product,
    productId,
    title,
    description,
    price,
    productImage,
    subCategory
  ) => {
    if (productImage) {
      if (
        title === "" &&
        description === "" &&
        price === "" &&
        productCategory === "" &&
        subCategory === ""
      ) {
        setErrorMessage("All the fields are required..");
      } else if (title === "") {
        setErrorMessage("Product Title cannot be empty..");
      } else if (description === "") {
        setErrorMessage("Description cannot be empty..");
      } else if (price === "") {
        setErrorMessage("Price cannot be empty..");
      } else if (productCategory === "") {
        setErrorMessage("Please choose a Category..");
      } else if (subCategory === "") {
        setErrorMessage("Please choose a Sub-category..");
      } else {
        const formData = new FormData();
        formData.append("myImage", productImage, productImage.name);
        await axios.post(`${url}/uploads`, formData).then(async () => {
          await axios
            .put(`${url}/${currentUserDetails._id}/products/${productId}`, {
              name: title,
              description: description,
              price: parseFloat(price),
              productImage: productImage != null ? productImage.name : null,
              category: productCategory,
              subCategory: subCategory,
            })
            .then(() => {
              goToSingleProduct(product);
              setIsEditModeActive(false);
            });
        });
      }
    } else {
      if (
        title === "" &&
        description === "" &&
        price === "" &&
        productCategory === "" &&
        subCategory === "" &&
        productImage === null
      ) {
        setErrorMessage("All the fields are required..");
      } else if (title === "") {
        setErrorMessage("Product Title cannot be empty..");
      } else if (description === "") {
        setErrorMessage("Description cannot be empty..");
      } else if (price === "") {
        setErrorMessage("Price cannot be empty..");
      } else if (productCategory === "") {
        setErrorMessage("Please choose a Category..");
      } else if (subCategory === "") {
        setErrorMessage("Please choose a Sub-category..");
      } else {
        await axios
          .put(`${url}/${currentUserDetails._id}/products/${productId}`, {
            name: title,
            description: description,
            price: parseFloat(price),
            productImage: productImage != null ? productImage.name : null,
            category: productCategory,
            subCategory: subCategory,
          })
          .then(() => {
            goToSingleProduct(product);
            setIsEditModeActive(false);
          });
      }
    }
  };

  const addToCart = async (product, quantity) => {
    console.log(product, quantity);
    if (token) {
      await axios
        .post(`${url}/${jwt_decode(token)._id}/updateCart`, {
          category: product.category,
          description: product.description,
          name: product.name,
          price: product.price,
          productImage: product.productImage,
          _id: product._id,
          quantity: quantity,
          type: "Add",
        })
        .then(() => {
          getUserDetails();
          message.success({
            content: "Added to Cart..",
            style: {
              marginTop: 60,
            },
          });
        });
    } else {
      setDrawerVisible(true);
    }
  };

  const decreaseQuantity = async (product) => {
    await axios
      .post(`${url}/${jwt_decode(token)._id}/updateCart`, {
        category: product.category,
        description: product.description,
        name: product.name,
        price: product.price,
        productImage: product.productImage,
        _id: product._id,
        type: "Decrease",
      })
      .then(() => {
        getUserDetails();
      });
  };

  const increaseQuantity = async (product) => {
    console.log("Increase");
    await axios
      .post(`${url}/${jwt_decode(token)._id}/updateCart`, {
        category: product.category,
        description: product.description,
        name: product.name,
        price: product.price,
        productImage: product.productImage,
        _id: product._id,
        type: "Increase",
      })
      .then(() => {
        getUserDetails();
      });
  };

  const removeItemFromCart = async (cartProductId) => {
    await axios
      .post(`${url}/${jwt_decode(token)._id}/removeItemFromCart`, {
        cartProductId: cartProductId,
      })
      .then(() => {
        getUserDetails();
        message.info({
          content: "Removed from Cart..",
          style: {
            marginTop: 60,
          },
        });
      });
  };

  const emptyCart = async () => {
    await axios
      .post(`${url}/${jwt_decode(token)._id}/emptyCart`, {})
      .then(() => {
        getUserDetails();
      });
  };

  const submitOrder = async (addressData) => {
    console.log(addressData, currentUserDetails);
    const API_URL = `http://localhost:5000/api/v1/users`;
    const orderUrl = `${API_URL}/razorpay/order`;
    const response = await axios.post(orderUrl, {
      cartTotalPrice: cartTotalPrice,
    });
    const { data } = response;
    const options = {
      key: "rzp_test_XbPt3CKqRft6q6",
      name: "Shopping Cart",
      description: "wonderful shopping",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const razorpayUrl = `${API_URL}/razorpay/capture/${paymentId}`;
          const captureResponse = await axios.post(razorpayUrl, {
            amount: data.order.amount,
          });
          const successObj = JSON.parse(captureResponse.data);
          const captured = successObj.captured;
          if (captured) {
            await axios
              .post(`${url}/${jwt_decode(token)._id}/createNewOrder`, {
                name: `${currentUserDetails.firstName} ${currentUserDetails.lastName}`,
                email: currentUserDetails.email,
                address: addressData.deliveryAddress,
                city: addressData.city,
                country: addressData.country,
                pincode: addressData.pin,
                state: addressData.deliveryState,
                phoneCode: addressData.phoneCode,
                mobileNumber: addressData.mobileNumber,
                paymentMethod: successObj.method,
                paymentId: paymentId,
                paymentAcquirerData: successObj.acquirer_data,
                upiPaymentId:
                  successObj.method === "upi" ? successObj.vpa : null,
                paymentBank:
                  successObj.method === "netbanking" ? successObj.bank : null,
                items: cart,
                cartTotalPrice: cartTotalPrice,
                userId: currentUserDetails._id,
              })
              .then((data) => {
                emptyCart();
                getOrdersForAdmin();
                getOrdersForUser();
                pushCustomerNotificationsToAdmin(
                  data.data.data._id,
                  data.data.data.createdAt,
                  "You have a new Customer Order.."
                );
                setNewOrderId(data.data.data);
              })
              .then(() => setIsOrderSuccessful(true));
          }
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const getOrdersForAdmin = async () => {
    setIsPageLoading(true);
    await axios
      .get(`${url}/${jwt_decode(token)._id}/getOrdersForAdmin`)
      .then((result) => {
        setOrdersForAdmin(result.data.data);
        setPendingAdminOrdersList(
          result.data.data.filter(
            (pendingOrders) => pendingOrders.isAcceptedByAdmin === false
          ).length
        );
      })
      .then(() => setIsPageLoading(false));
  };

  const getOrdersForUser = async () => {
    setIsPageLoading(true);
    await axios
      .get(`${url}/${jwt_decode(token)._id}/getOrdersForUser`)
      .then((result) => {
        setOrdersForUser(result.data.data);
      })
      .then(() => setIsPageLoading(false));
  };

  const goBackToOrders = () => {
    setBreadcrumOrder({});
    getOrdersForUser();
    getOrdersForAdmin();
    setIsSingleOrderPageActive(false);
  };

  const getSingleOrder = async (order) => {
    setIsPageLoading(true);
    closeNotificationsDrawer();
    await axios
      .get(`${url}/${jwt_decode(token)._id}/getOrdersForUser/${order._id}`)
      .then(async (result) => {
        setOrdersForUser(result.data.data);
        setOrdersForAdmin(result.data.data);
        setBreadcrumOrder(order);
        setIsPageLoading(false);
        console.log(result.data.data);

        if (result.data.data[0].userId === currentUserDetails._id) {
          console.log("Seen by me");

          await axios
            .put(
              `${url}/${jwt_decode(token)._id}/getOrdersForCustomer/${
                order._id
              }/updateNotificationSeenStatus`
            )
            .then(() => getUserDetails());
          console.log(order._id);

          console.log("Lol");
        } else if (currentUserDetails.role === "Admin") {
          console.log("Seen By admin");
          await axios
            .put(
              `${url}/${jwt_decode(token)._id}/getOrdersForAdmin/${
                order._id
              }/changeOrderIsSeenByAdminStatus`
            )
            .then(() => getUserDetails());
        }
      })
      .then(() => {
        setIsPageLoading(false);
        setIsSingleOrderPageActive(true);
      });

    // console.log(order);
  };

  const showAcceptOrderModal = (order) => {
    setSelectedOrder(order);
    setIsAcceptOrderModalVisible(true);
  };

  const handleCancelOrderModal = () => {
    setIsAcceptOrderModalVisible(false);
  };

  const acceptOrder = async (date) => {
    console.log(selectedOrder, date);
    const date1 = parseInt(date.toString().split("-")[0]);
    const month1 = parseInt(date.toString().split("-")[1]);
    const year1 = parseInt(date.toString().split("-")[2]);
    if (!date) {
      setErrorMessage("Please enter a valid date..!!");
    } else {
      setErrorMessage(null);
      const deliveryDate = Date.parse(`${year1}-${month1}-${date1}`);
      await axios
        .put(
          `${url}/${jwt_decode(token)._id}/getOrdersForAdmin/${
            selectedOrder._id
          }/changeOrderIsAcceptedByAdminStatus`,
          {
            deliveryDate: deliveryDate,
          }
        )
        .then(async (data) => pushAdminNotificationsToCustomer(data))
        .then(() => {
          getOrdersForAdmin();
          getOrdersForUser();
          setIsAcceptOrderModalVisible(false);
        });
    }
  };

  const pushCustomerNotificationsToAdmin = async (
    notificationId,
    createdAt,
    message
  ) => {
    await axios.put(
      `${url}/${jwt_decode(token)._id}/pushCustomerNotificationsToAdmin`,
      {
        notificationId: notificationId,
        orderCreatedAt: createdAt,
        message: message,
      }
    );
  };

  const pushAdminNotificationsToCustomer = async (data) => {
    await axios.put(
      `${url}/${jwt_decode(token)._id}/pushAdminNotificationsToCustomer`,
      {
        userId: data.data.data.userId,
        notificationId: data.data.data._id,
        message: `Your order ${data.data.data._id} has been accepted`,
      }
    );
  };

  const logout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    history.push("/");
    window.location.reload();
  };

  return (
    <>
      <DrawerPage
        drawerVisible={drawerVisible}
        currentUserDetails={currentUserDetails}
        imgUrl={imgUrl}
        closeDrawer={closeDrawer}
        signup={signup}
        login={login}
        logout={logout}
        changeCategory={changeCategory}
        errorMessage={errorMessage}
        loginBtnLoading={loginBtnLoading}
        successMessage={successMessage}
        changeLoginSignup={changeLoginSignup}
        authenticationPage={authenticationPage}
        goToForgotPassword={goToForgotPassword}
        forgotPasswordPageActive={forgotPasswordPageActive}
        sendForgotPasswordLink={sendForgotPasswordLink}
        isSendingLink={isSendingLink}
      />
      <NotificationsDrawerPage
        currentUserDetails={currentUserDetails}
        notificationsDrawerVisible={notificationsDrawerVisible}
        openNotificationsDrawer={openNotificationsDrawer}
        closeNotificationsDrawer={closeNotificationsDrawer}
        getSingleOrder={getSingleOrder}
        changeSectionPage={changeSectionPage}
      />
      <MenuDrawerPage
        closeMenuDrawer={closeMenuDrawer}
        menuDrawerVisible={menuDrawerVisible}
        changeSectionPage={changeSectionPage}
        currentUserDetails={currentUserDetails}
        pendingAdminOrdersList={pendingAdminOrdersList}
        cartBadge={cartBadge}
      />
      <NavbarPage
        changeSectionPage={changeSectionPage}
        currentUserDetails={currentUserDetails}
        cartBadge={cartBadge}
        openDrawer={openDrawer}
        openNotificationsDrawer={openNotificationsDrawer}
        token={token}
        logout={logout}
        imgUrl={imgUrl}
        adminNotificationsLength={adminNotificationsLength}
        customerNotificationsLength={customerNotificationsLength}
        pendingAdminOrdersList={pendingAdminOrdersList}
        openMenuDrawer={openMenuDrawer}
      />
      <Switch>
        <Route exact path="/">
          <BasePage
            token={token}
            currentUserDetails={currentUserDetails}
            allProducts={allProducts}
            imgUrl={imgUrl}
            changeCategory={changeCategory}
            productCategories={productCategories}
            goToSingleProduct={goToSingleProduct}
            secondBreadcrum={secondBreadcrum}
            selectedProduct={selectedProduct}
            isSingleProductPageActive={isSingleProductPageActive}
            isPageLoading={isPageLoading}
            addToCart={addToCart}
            setEditMode={setEditMode}
            isEditModeActive={isEditModeActive}
            cancelEdit={cancelEdit}
            saveChanges={saveChanges}
            categoryList={categoryList}
            productSubCategory={productSubCategory}
            addProduct={addProduct}
            updateChangeProductCategory={updateChangeProductCategory}
            errorMessage={errorMessage}
          />
        </Route>
        <Route path="/cart">
          <MyCartPage
            currentUserDetails={currentUserDetails}
            isPageLoading={isPageLoading}
            imgUrl={imgUrl}
            changeSectionPage={changeSectionPage}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            removeItemFromCart={removeItemFromCart}
            cartBadge={cartBadge}
            cartTotalPrice={cartTotalPrice}
            submitOrder={submitOrder}
            isOrderSuccessful={isOrderSuccessful}
            newOrderId={newOrderId}
            getSingleOrder={getSingleOrder}
          />
        </Route>
        <Route path="/orders">
          <OrdersPage
            imgUrl={imgUrl}
            changeCategory={changeCategory}
            changeSectionPage={changeSectionPage}
            currentUserDetails={currentUserDetails}
            ordersForAdmin={ordersForAdmin}
            ordersForUser={ordersForUser}
            getSingleOrder={getSingleOrder}
            breadcrumOrder={breadcrumOrder}
            goBackToOrders={goBackToOrders}
            isSingleOrderPageActive={isSingleOrderPageActive}
            cartTotalPrice={cartTotalPrice}
            isPageLoading={isPageLoading}
            acceptOrder={acceptOrder}
            errorMessage={errorMessage}
            showAcceptOrderModal={showAcceptOrderModal}
            handleCancelOrderModal={handleCancelOrderModal}
            isAcceptOrderModalVisible={isAcceptOrderModalVisible}
          />
        </Route>
        <Route path="/reset-password">
          <ResetPassword
            resetPassword={resetPassword}
            isPasswordResetSuccess={isPasswordResetSuccess}
            resettingPassword={resettingPassword}
            errorMessage={errorMessage}
            openDrawer={openDrawer}
            changeSectionPage={changeSectionPage}
          />
        </Route>
      </Switch>
    </>
  );
};

export default App;
