import React, { useState } from "react";
import {
  Layout,
  Tabs,
  Row,
  Col,
  Spin,
  Card,
  Typography,
  Button,
  Divider,
  Steps,
  Form,
  Input,
  Select,
  Alert,
  Result,
} from "antd";
import { Country, State, City } from "country-state-city";
import { Hidden } from "@material-ui/core";
import { PlusOutlined, TagOutlined, MinusOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;
const { Title } = Typography;
const { Step } = Steps;
const { Option } = Select;

const steps = [
  {
    title: "Delivery Address",
    content: "First-content",
  },

  {
    title: "Review Order",
    content: "Last-content",
  },
];

const MyCartPage = ({
  currentUserDetails,
  isPageLoading,
  imgUrl,
  changeSectionPage,
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
  cartTotalPrice,
  cartBadge,
  submitOrder,
  isOrderSuccessful,
  newOrderId,
  getSingleOrder,
}) => {
  const [current, setCurrent] = React.useState(0);
  const [isCheckoutPageActive, setIsCheckoutPageActive] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [country, setCountry] = useState("");
  const [countryIso, setCountryIso] = useState("");
  const [stateList, setStateList] = useState([]);
  const [deliveryState, setDeliveryState] = useState("");
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [fullAddress, setFullAddress] = useState({});
  const [error, setError] = useState("");

  const countryList = Country.getAllCountries();
  const [flag, setFlag] = useState(countryList[0].flag);
  const [phoneCode, setPhoneCode] = useState(countryList[0].phonecode);

  const selectBefore = (
    <Select value={`${flag} +${phoneCode}`} className="select-before">
      <Option value={country.phoneCode} key={country.isoCode}>
        {flag} +{phoneCode}
      </Option>
    </Select>
  );

  const next = () => {
    console.log(phoneCode);
    if (
      deliveryAddress === "" &&
      country === "" &&
      deliveryState === "" &&
      city === "" &&
      pin === "" &&
      mobileNumber === "" &&
      phoneCode === ""
    ) {
      setError("All the fields are required");
    } else if (deliveryAddress === "") {
      setError("Delivery address cannot be empty");
    } else if (country === "") {
      setError("Country cannot be empty");
    } else if (deliveryState === "") {
      setError("State cannot be empty");
    } else if (city === "") {
      setError("City cannot be empty");
    } else if (pin === "") {
      setError("Pincode cannot be empty");
    } else if (mobileNumber === "") {
      setError("Mobile no. cannot be empty");
    } else {
      setError("");
      setFullAddress({
        deliveryAddress: deliveryAddress,
        country: country,
        deliveryState: deliveryState,
        city: city,
        pin: pin,
        mobileNumber: mobileNumber,
        phoneCode: phoneCode,
      });
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const goToCheckout = () => {
    setIsCheckoutPageActive(true);
  };

  const goBackToCart = () => {
    setIsCheckoutPageActive(false);
  };

  const changeCountry = (e) => {
    const countryIso = e.split(",")[0];
    const countryName = e.split(",")[1];
    const index = e.split(",")[2];
    console.log(index);
    setFlag(countryList[index].flag);
    setPhoneCode(countryList[index].phonecode);
    setCountry(countryName);
    setCountryIso(countryIso);
    setStateList(State.getStatesOfCountry(countryIso));
  };

  const changeState = (e) => {
    const stateIso = e.split(",")[0];
    const stateName = e.split(",")[1];
    setDeliveryState(stateName);
    setCityList(City.getCitiesOfState(countryIso, stateIso));
  };

  return currentUserDetails._id ? (
    !isPageLoading ? (
      <Layout>
        <Hidden xsDown>
          <Content
            className="site-layout"
            style={{
              padding: "16px 180px",
              height: "91.2vh",
              overflowY: "scroll",
              borderWidth: 1,
              borderStyle: "inherit",
            }}
          >
            <Tabs size="small">
              <TabPane tab={`My Cart (${cartBadge})`}>
                {currentUserDetails.cart.length > 0 ? (
                  <div
                    className="site-layout-background"
                    style={{ padding: 24 }}
                  >
                    <Row
                      style={{ justifyContent: "center" }}
                      // gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    >
                      {isCheckoutPageActive ? (
                        <div style={{ display: "block" }}>
                          <Steps
                            style={{ width: 600, margin: "20px 0" }}
                            current={current}
                            size="small"
                            progressDot
                          >
                            {steps.map((item) => (
                              <Step key={item.title} title={item.title} />
                            ))}
                          </Steps>
                          <Row>
                            <Col style={{ width: 600 }}>
                              {current === 0 ? (
                                <Card style={{ marginBottom: 20 }}>
                                  <div>
                                    <Form
                                      // onValuesChange={() => console.log("lol")}
                                      layout="vertical"
                                    >
                                      <Form.Item
                                        label="Delivery Address"
                                        name="Delivery Address"
                                        initialValue={
                                          fullAddress.deliveryAddress
                                        }
                                      >
                                        <Input
                                          placeholder="Delivery Address"
                                          onChange={(e) =>
                                            setDeliveryAddress(e.target.value)
                                          }
                                        />
                                      </Form.Item>

                                      <Row>
                                        <Col span={11}>
                                          <Form.Item
                                            label="Country"
                                            name="Country"
                                            initialValue={fullAddress.country}
                                          >
                                            <Input.Group compact>
                                              <Select
                                                onChange={(e) =>
                                                  changeCountry(e)
                                                }
                                                defaultValue={
                                                  fullAddress.country
                                                    ? fullAddress.country
                                                    : "Select"
                                                }
                                                style={{ width: "100%" }}
                                              >
                                                {countryList
                                                  // .filter(
                                                  //   (filteredCountry) =>
                                                  //     filteredCountry.isoCode ===
                                                  //     "IN"
                                                  // )
                                                  .map((country, i) => (
                                                    <Option
                                                      key={`${country.isoCode},${country.name},${i}`}
                                                    >
                                                      {country.name}
                                                    </Option>
                                                  ))}
                                              </Select>
                                            </Input.Group>
                                          </Form.Item>
                                        </Col>
                                        <Col span={11} offset={2}>
                                          <Form.Item
                                            label="State"
                                            initialValue={
                                              fullAddress.deliveryState
                                            }
                                          >
                                            <Input.Group compact>
                                              <Select
                                                onChange={(e) => changeState(e)}
                                                defaultValue={
                                                  fullAddress.deliveryState
                                                    ? fullAddress.deliveryState
                                                    : "Select"
                                                }
                                                style={{ width: "100%" }}
                                              >
                                                {stateList.map((state1) => (
                                                  <Option
                                                    key={`${state1.isoCode},${state1.name}`}
                                                  >
                                                    {state1.name}
                                                  </Option>
                                                ))}
                                              </Select>
                                            </Input.Group>
                                          </Form.Item>
                                        </Col>
                                      </Row>

                                      <Row>
                                        <Col span={11}>
                                          <Form.Item
                                            label="City / Town"
                                            initialValue={fullAddress.city}
                                          >
                                            <Input.Group compact>
                                              <Select
                                                onChange={(e) => setCity(e)}
                                                defaultValue={
                                                  fullAddress.city
                                                    ? fullAddress.city
                                                    : "Select"
                                                }
                                                style={{ width: "100%" }}
                                              >
                                                {cityList.map((city1) => (
                                                  <Option
                                                    value={city1.name}
                                                    key={city1.name}
                                                  >
                                                    {city1.name}
                                                  </Option>
                                                ))}
                                              </Select>
                                            </Input.Group>
                                          </Form.Item>
                                        </Col>
                                        <Col span={11} offset={2}>
                                          <Form.Item
                                            name="Pin / Zip Code"
                                            label="Pin / Zip Code"
                                            initialValue={fullAddress.pin}
                                          >
                                            <Input
                                              placeholder="Pincode / Zipcode"
                                              type="text"
                                              onChange={(e) =>
                                                setPin(e.target.value)
                                              }
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                      <Form.Item
                                        label="Mobile No"
                                        name="Mobile No"
                                        initialValue={fullAddress.mobileNumber}
                                        style={{ marginBottom: 0 }}
                                      >
                                        <Input
                                          placeholder="Mobile No"
                                          type="text"
                                          onChange={(e) =>
                                            setMobileNumber(e.target.value)
                                          }
                                          addonBefore={selectBefore}
                                        />
                                      </Form.Item>
                                    </Form>
                                  </div>
                                </Card>
                              ) : (
                                <Card>
                                  {currentUserDetails.cart.map((product) => (
                                    <Card key={product._id}>
                                      <Row>
                                        <Col>
                                          <Card
                                            style={{ height: 120, width: 90 }}
                                            cover={
                                              <img
                                                alt="example"
                                                // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                                src={`${imgUrl}/${product.productImage}`}
                                              />
                                            }
                                          ></Card>
                                        </Col>
                                        <Col style={{ width: 410 }}>
                                          <Meta
                                            style={{ paddingLeft: 20 }}
                                            title={
                                              <Row
                                                style={{
                                                  alignContent: "center",
                                                }}
                                              >
                                                <Col>{product.name}</Col>
                                              </Row>
                                            }
                                            description={product.description}
                                          />
                                          <Row
                                            style={{
                                              marginTop: 30,
                                              paddingLeft: 20,
                                            }}
                                          >
                                            <Col span={14}>
                                              <Typography>
                                                Qty:{" "}
                                                <span
                                                  style={{ fontWeight: 600 }}
                                                >
                                                  {product.quantity}
                                                </span>
                                              </Typography>
                                            </Col>
                                            <Col
                                              span={10}
                                              style={{ textAlign: "end" }}
                                            >
                                              <Row>
                                                <Col
                                                  span={10}
                                                  style={{
                                                    alignItems: "flex-end",
                                                  }}
                                                >
                                                  <TagOutlined />
                                                </Col>
                                                <Col span={14}>
                                                  <Title level={5}>
                                                    &#8377;{" "}
                                                    {`${
                                                      parseInt(product.price) *
                                                      parseInt(product.quantity)
                                                    }`}
                                                  </Title>
                                                </Col>
                                              </Row>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    </Card>
                                  ))}
                                  <Card style={{ marginTop: 20 }}>
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Col>
                                        <Typography style={{ fontWeight: 600 }}>
                                          Sub-Total
                                        </Typography>
                                      </Col>
                                      <Col>
                                        <Title level={5}>
                                          &#8377; {cartTotalPrice}
                                        </Title>
                                      </Col>
                                    </Row>
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 16,
                                      }}
                                    >
                                      <Col>
                                        <Typography>GST (%)</Typography>
                                      </Col>
                                      <Col>
                                        <Typography>&#8377; 0</Typography>
                                      </Col>
                                    </Row>
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 20,
                                      }}
                                    >
                                      <Col>
                                        <Typography>Service Charges</Typography>
                                      </Col>
                                      <Col>
                                        <Typography>&#8377; 0</Typography>
                                      </Col>
                                    </Row>
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 20,
                                      }}
                                    >
                                      <Col>
                                        <Typography>
                                          Delivery Charges
                                        </Typography>
                                      </Col>
                                      <Col>
                                        <Typography>&#8377; 10</Typography>
                                      </Col>
                                    </Row>
                                    <Divider />
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Col>
                                        <Title level={5}>Grand Total</Title>
                                      </Col>
                                      <Col>
                                        <Title level={4}>
                                          {" "}
                                          &#8377;{" "}
                                          {parseInt(cartTotalPrice) + 10}
                                        </Title>
                                      </Col>
                                    </Row>
                                  </Card>
                                  <br />
                                  <Card>
                                    <Typography
                                      style={{
                                        fontStyle: "italic",
                                        marginBottom: 10,
                                      }}
                                    >
                                      Delivery Address:
                                    </Typography>
                                    <div style={{ textAlign: "right" }}>
                                      {console.log(fullAddress)}

                                      <Typography
                                        style={{
                                          margin: "8px 0",
                                          fontWeight: 600,
                                        }}
                                      >
                                        {/* Asomi Path, Chandan Nagar */}
                                        {fullAddress.deliveryAddress}
                                      </Typography>

                                      <Typography style={{ margin: "8px 0" }}>
                                        {/* Guwahati, Assam */}
                                        {fullAddress.city},{" "}
                                        {fullAddress.deliveryState}
                                      </Typography>
                                      <Typography style={{ margin: "8px 0" }}>
                                        {/* Pin: 781028 */}
                                        Pin: {fullAddress.pin}
                                      </Typography>
                                      <Typography
                                        style={{
                                          margin: "8px 0",
                                          fontStyle: "italic",
                                        }}
                                      >
                                        <span style={{ fontWeight: "bold" }}>
                                          Contact No:
                                        </span>{" "}
                                        (+{fullAddress.phoneCode}){" "}
                                        {fullAddress.mobileNumber}
                                      </Typography>
                                    </div>
                                  </Card>
                                </Card>
                              )}
                              {error ? (
                                <Form.Item>
                                  <Alert message={error} type="error" />
                                </Form.Item>
                              ) : null}
                              <div
                                className="steps-action"
                                style={{ marginTop: 16 }}
                              >
                                <Row>
                                  {current === 0 && (
                                    <>
                                      <Col span={11}>
                                        <Button
                                          type="default"
                                          onClick={goBackToCart}
                                          block
                                        >
                                          Back to Cart
                                        </Button>
                                      </Col>
                                      <Col span={11} offset={2}>
                                        <Button
                                          type="primary"
                                          onClick={() => next()}
                                          block
                                        >
                                          Review
                                        </Button>
                                      </Col>
                                    </>
                                  )}
                                  <Col span={11}>
                                    {current > 0 && (
                                      <Button onClick={() => prev()} block>
                                        Delivery Address
                                      </Button>
                                    )}
                                  </Col>
                                  <Col span={12} offset={1}>
                                    {current === steps.length - 1 && (
                                      <Button
                                        block
                                        type="primary"
                                        onClick={() => submitOrder(fullAddress)}
                                      >
                                        Make Payment
                                      </Button>
                                    )}
                                  </Col>
                                </Row>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      ) : (
                        <>
                          <Col>
                            <div>
                              {!isPageLoading ? (
                                currentUserDetails.cart
                                  // .sort((a, b) => b.createdAt - a.createdAt)
                                  .map((product) => (
                                    <Card key={product._id}>
                                      <Row
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-evenly",
                                        }}
                                      >
                                        <Col>
                                          <Card
                                            style={{ height: 240, width: 180 }}
                                            cover={
                                              <img
                                                alt="example"
                                                // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                                src={`${imgUrl}/${product.productImage}`}
                                              />
                                            }
                                          ></Card>
                                        </Col>

                                        <Col>
                                          <Card style={{ width: 420 }}>
                                            <Meta
                                              title={
                                                <Row
                                                  style={{
                                                    alignContent: "center",
                                                  }}
                                                >
                                                  <Col span={14}>
                                                    {product.name}
                                                  </Col>

                                                  <Col
                                                    span={10}
                                                    style={{ textAlign: "end" }}
                                                  >
                                                    <Row>
                                                      <Col
                                                        span={10}
                                                        style={{
                                                          alignItems:
                                                            "flex-end",
                                                        }}
                                                      >
                                                        <TagOutlined />
                                                      </Col>
                                                      <Col span={14}>
                                                        <Title level={5}>
                                                          &#8377;{" "}
                                                          {product.price}
                                                        </Title>
                                                      </Col>
                                                    </Row>
                                                  </Col>
                                                </Row>
                                              }
                                              description={product.description}
                                            />

                                            <br />

                                            <Row
                                              style={{
                                                alignItems: "center",
                                              }}
                                            >
                                              <Col span={8}>
                                                <Typography
                                                  level={5}
                                                  type="secondary"
                                                >
                                                  Quantity
                                                </Typography>
                                              </Col>
                                              <Col span={8}>
                                                <Row>
                                                  <Col span={8}>
                                                    <Button
                                                      disabled={
                                                        product.quantity === 1
                                                      }
                                                      icon={
                                                        <MinusOutlined key="decrease" />
                                                      }
                                                      onClick={() =>
                                                        decreaseQuantity(
                                                          product
                                                        )
                                                      }
                                                      size="middle"
                                                    />
                                                  </Col>
                                                  <Col
                                                    span={8}
                                                    style={{
                                                      textAlign: "center",
                                                      marginTop: 5,
                                                    }}
                                                  >
                                                    <Typography>
                                                      {product.quantity}
                                                    </Typography>
                                                  </Col>
                                                  <Col
                                                    span={8}
                                                    style={{ textAlign: "end" }}
                                                  >
                                                    <Button
                                                      icon={
                                                        <PlusOutlined key="increase" />
                                                      }
                                                      onClick={() =>
                                                        increaseQuantity(
                                                          product
                                                        )
                                                      }
                                                    ></Button>
                                                  </Col>
                                                </Row>
                                              </Col>
                                              <Col span={8}>
                                                <Title
                                                  level={5}
                                                  style={{ textAlign: "right" }}
                                                >
                                                  &#8377;{" "}
                                                  {`${
                                                    parseInt(product.price) *
                                                    parseInt(product.quantity)
                                                  }`}
                                                </Title>
                                              </Col>
                                            </Row>
                                          </Card>

                                          <Card>
                                            <Row
                                              style={{
                                                justifyContent: "flex-end",
                                              }}
                                            >
                                              <Button
                                                danger
                                                type="primary"
                                                onClick={() =>
                                                  removeItemFromCart(
                                                    product._id
                                                  )
                                                }
                                              >
                                                Remove from Cart
                                              </Button>
                                            </Row>
                                          </Card>
                                        </Col>
                                      </Row>
                                    </Card>
                                  ))
                              ) : (
                                <Col span={12} className="spin">
                                  <Spin tip="Loading..." size="large" />
                                </Col>
                              )}
                            </div>
                          </Col>

                          <Col span={12} style={{ marginTop: 20 }}>
                            <Card>
                              <Row>
                                <Col span={24}>
                                  <Card>
                                    <Meta title="Breakdowns"></Meta>
                                    <Divider />
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Col>
                                        <Typography>Sub-Total</Typography>
                                      </Col>
                                      <Col>
                                        <Title level={5}>
                                          &#8377; {cartTotalPrice}
                                        </Title>
                                      </Col>
                                    </Row>

                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 10,
                                      }}
                                    >
                                      <Col>
                                        <Typography>GST (%)</Typography>
                                      </Col>
                                      <Col>
                                        <Typography>&#8377; 0</Typography>
                                      </Col>
                                    </Row>
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 20,
                                      }}
                                    >
                                      <Col>
                                        <Typography>Service Charges</Typography>
                                      </Col>
                                      <Col>
                                        <Typography>&#8377; 0</Typography>
                                      </Col>
                                    </Row>
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 20,
                                      }}
                                    >
                                      <Col>
                                        <Typography>
                                          Delivery Charges
                                        </Typography>
                                      </Col>
                                      <Col>
                                        <Typography>&#8377; 10</Typography>
                                      </Col>
                                    </Row>
                                    <Divider />
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 20,
                                      }}
                                    >
                                      <Col>
                                        <Title level={5}>Grand Total</Title>
                                      </Col>
                                      <Col>
                                        <Title level={4}>
                                          {" "}
                                          &#8377;{" "}
                                          {parseInt(cartTotalPrice) + 10}
                                        </Title>
                                      </Col>
                                    </Row>
                                  </Card>

                                  <div
                                    className="steps-action"
                                    style={{ marginTop: 16 }}
                                  >
                                    <Button
                                      type="primary"
                                      onClick={goToCheckout}
                                      block
                                    >
                                      Checkout
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </>
                      )}
                    </Row>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    {isOrderSuccessful ? (
                      <div style={{ marginTop: 60 }}>
                        <Result
                          status="success"
                          title={
                            <Typography style={{ fontSize: 18 }}>
                              Your order was placed successfully..
                            </Typography>
                          }
                          subTitle={`Order ID: ${
                            newOrderId._id
                              ? newOrderId._id
                              : "2017182818828182881"
                          }`}
                          extra={[
                            <Button
                              type="primary"
                              key="console"
                              onClick={() => {
                                changeSectionPage("Orders");
                                getSingleOrder(newOrderId);
                              }}
                            >
                              View Details
                            </Button>,
                            <Button
                              key="buy"
                              onClick={() => changeSectionPage("Home")}
                            >
                              Continue Shopping..
                            </Button>,
                          ]}
                        />
                      </div>
                    ) : (
                      <div style={{ marginTop: 10 }}>
                        <Result
                          status="403"
                          title={
                            <Typography style={{ fontSize: 18 }}>
                              Your cart is empty..
                            </Typography>
                          }
                          extra={
                            <Button
                              type="primary"
                              onClick={() => changeSectionPage("Home")}
                            >
                              Start Shopping..
                            </Button>
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </TabPane>
            </Tabs>
          </Content>
        </Hidden>
        <Hidden smUp>
          <Content
            className="site-layout"
            style={{
              padding: "16px 0",
              height: "91.2vh",
              overflowY: "scroll",
              borderWidth: 1,
              borderStyle: "inherit",
            }}
          >
            {/* <Tabs size="small">
              <TabPane tab={`My Cart (${cartBadge})`}>
                
              </TabPane>
            </Tabs> */}
            <div
              style={{
                margin: "0 20px",
                marginBottom: 16,
              }}
            >
              {/* <Radio.Group>
              <Radio.Button value="myOrders">My Orders</Radio.Button>
            </Radio.Group> */}
              <Typography>{`My Cart (${cartBadge})`}</Typography>
            </div>

            {currentUserDetails.cart.length > 0 ? (
              <div className="site-layout-background" style={{ padding: 24 }}>
                <Row
                  style={{ justifyContent: "center" }}
                  // gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                >
                  {isCheckoutPageActive ? (
                    <div style={{ display: "block" }}>
                      <Steps
                        style={{ width: 310, margin: "20px 0" }}
                        current={current}
                        size="small"
                        progressDot
                      >
                        {steps.map((item) => (
                          <Step key={item.title} title={item.title} />
                        ))}
                      </Steps>
                      <Row>
                        <Col span={24} xs={24}>
                          {current === 0 ? (
                            <Card style={{ marginBottom: 20 }}>
                              <Form
                                // onValuesChange={() => console.log("lol")}
                                layout="vertical"
                              >
                                <Form.Item
                                  label="Delivery Address"
                                  name="Delivery Address"
                                  initialValue={fullAddress.deliveryAddress}
                                >
                                  <Input
                                    placeholder="Delivery Address"
                                    onChange={(e) =>
                                      setDeliveryAddress(e.target.value)
                                    }
                                  />
                                </Form.Item>

                                <Col>
                                  <Form.Item
                                    label="Country"
                                    name="Country"
                                    initialValue={fullAddress.country}
                                  >
                                    <Input.Group compact>
                                      <Select
                                        onChange={(e) => changeCountry(e)}
                                        defaultValue={
                                          fullAddress.country
                                            ? fullAddress.country
                                            : "Select"
                                        }
                                        style={{ width: "100%" }}
                                      >
                                        {countryList
                                          // .filter(
                                          //   (filteredCountry) =>
                                          //     filteredCountry.isoCode === "IN"
                                          // )
                                          .map((country, i) => (
                                            <Option
                                              key={`${country.isoCode},${country.name},${i}`}
                                            >
                                              {country.name}
                                            </Option>
                                          ))}
                                      </Select>
                                    </Input.Group>
                                  </Form.Item>
                                </Col>
                                <Col>
                                  <Form.Item
                                    label="State"
                                    name="State"
                                    initialValue={fullAddress.deliveryState}
                                  >
                                    <Input.Group compact>
                                      <Select
                                        onChange={(e) => changeState(e)}
                                        defaultValue={
                                          fullAddress.deliveryState
                                            ? fullAddress.deliveryState
                                            : "Select"
                                        }
                                        style={{ width: "100%" }}
                                      >
                                        {stateList.map((state1) => (
                                          <Option
                                            key={`${state1.isoCode},${state1.name}`}
                                          >
                                            {state1.name}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Input.Group>
                                  </Form.Item>
                                </Col>

                                <Col>
                                  <Form.Item
                                    label="City / Town"
                                    name="City / Town"
                                    initialValue={fullAddress.city}
                                  >
                                    <Input.Group compact>
                                      <Select
                                        onChange={(e) => setCity(e)}
                                        defaultValue={
                                          fullAddress.city
                                            ? fullAddress.city
                                            : "Select"
                                        }
                                        style={{ width: "100%" }}
                                      >
                                        {cityList.map((city1) => (
                                          <Option
                                            value={city1.name}
                                            key={city1.name}
                                          >
                                            {city1.name}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Input.Group>
                                  </Form.Item>
                                </Col>
                                <Col>
                                  <Form.Item
                                    label="Pin / Zip Code"
                                    name="Pin / Zip Code"
                                    initialValue={fullAddress.pin}
                                  >
                                    <Input
                                      placeholder="Pincode / Zipcode"
                                      defaultValue={fullAddress.pin}
                                      type="text"
                                      onChange={(e) => setPin(e.target.value)}
                                    />
                                  </Form.Item>
                                </Col>
                                <Form.Item
                                  label="Mobile No"
                                  name="Mobile No"
                                  initialValue={fullAddress.mobileNumber}
                                  style={{ marginBottom: "0px" }}
                                >
                                  <Input
                                    placeholder="Mobile No"
                                    type="text"
                                    addonBefore={selectBefore}
                                    onChange={(e) =>
                                      setMobileNumber(e.target.value)
                                    }
                                  />
                                </Form.Item>
                              </Form>
                            </Card>
                          ) : (
                            <div>
                              {currentUserDetails.cart.map((product) => (
                                <Card key={product._id}>
                                  <Row>
                                    <Col span={11}>
                                      <Card
                                        style={{ height: 120, width: 90 }}
                                        cover={
                                          <img
                                            alt="example"
                                            // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            src={`${imgUrl}/${product.productImage}`}
                                          />
                                        }
                                      ></Card>
                                    </Col>
                                    <Col span={13}>
                                      <Meta
                                        // style={{ paddingLeft: 20 }}
                                        title={
                                          <Row
                                            style={{
                                              alignContent: "center",
                                            }}
                                          >
                                            <Col>{product.name}</Col>
                                          </Row>
                                        }
                                        description={product.description}
                                      />
                                      <Row
                                        style={{
                                          marginTop: 30,
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <Col>
                                          <Typography>
                                            Qty:{" "}
                                            <span style={{ fontWeight: 600 }}>
                                              {product.quantity}
                                            </span>
                                          </Typography>
                                        </Col>
                                        <Col style={{ textAlign: "end" }}>
                                          <Col>
                                            <Title level={5}>
                                              &#8377;{" "}
                                              {`${
                                                parseInt(product.price) *
                                                parseInt(product.quantity)
                                              }`}
                                            </Title>
                                          </Col>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Card>
                              ))}
                              <Card style={{ marginTop: 20 }}>
                                <Row
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Col>
                                    <Typography style={{ fontWeight: 600 }}>
                                      Sub-Total
                                    </Typography>
                                  </Col>
                                  <Col>
                                    <Title level={5}>
                                      &#8377; {cartTotalPrice}
                                    </Title>
                                  </Col>
                                </Row>
                                <Row
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: 16,
                                  }}
                                >
                                  <Col>
                                    <Typography>GST (%)</Typography>
                                  </Col>
                                  <Col>
                                    <Typography>&#8377; 0</Typography>
                                  </Col>
                                </Row>
                                <Row
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                  }}
                                >
                                  <Col>
                                    <Typography>Service Charges</Typography>
                                  </Col>
                                  <Col>
                                    <Typography>&#8377; 0</Typography>
                                  </Col>
                                </Row>
                                <Row
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                  }}
                                >
                                  <Col>
                                    <Typography>Delivery Charges</Typography>
                                  </Col>
                                  <Col>
                                    <Typography>&#8377; 10</Typography>
                                  </Col>
                                </Row>
                                <Divider />
                                <Row
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Col>
                                    <Title level={5}>Grand Total</Title>
                                  </Col>
                                  <Col>
                                    <Title level={4}>
                                      {" "}
                                      &#8377; {parseInt(cartTotalPrice) + 10}
                                    </Title>
                                  </Col>
                                </Row>
                              </Card>
                              <br />
                              <Card>
                                <Typography
                                  style={{
                                    fontStyle: "italic",
                                    marginBottom: 10,
                                  }}
                                >
                                  Delivery Address:
                                </Typography>
                                <div>
                                  {console.log(fullAddress)}

                                  <Typography
                                    style={{
                                      margin: "8px 0",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {/* Asomi Path, Chandan Nagar */}
                                    {fullAddress.deliveryAddress}
                                  </Typography>

                                  <Typography style={{ margin: "8px 0" }}>
                                    {/* Guwahati, Assam */}
                                    {fullAddress.city},{" "}
                                    {fullAddress.deliveryState}
                                  </Typography>
                                  <Typography style={{ margin: "8px 0" }}>
                                    {/* Pin: 781028 */}
                                    Pin: {fullAddress.pin}
                                  </Typography>
                                  <Typography
                                    style={{
                                      margin: "8px 0",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    <span style={{ fontWeight: "bold" }}>
                                      Contact No:
                                    </span>{" "}
                                    (+{fullAddress.phoneCode}){" "}
                                    {fullAddress.mobileNumber}
                                  </Typography>
                                </div>
                              </Card>
                            </div>
                          )}
                          {error ? (
                            <Form.Item>
                              <Alert message={error} type="error" />
                            </Form.Item>
                          ) : null}
                          <div
                            className="steps-action"
                            style={{ marginTop: 16 }}
                          >
                            <Row>
                              {current === 0 && (
                                <>
                                  <Col span={11}>
                                    <Button
                                      type="default"
                                      onClick={goBackToCart}
                                      block
                                    >
                                      Back to Cart
                                    </Button>
                                  </Col>
                                  <Col span={11} offset={2}>
                                    <Button
                                      type="primary"
                                      onClick={() => next()}
                                      block
                                    >
                                      Review
                                    </Button>
                                  </Col>
                                </>
                              )}
                              <Col span={11}>
                                {current > 0 && (
                                  <Button onClick={() => prev()} block>
                                    Delivery Address
                                  </Button>
                                )}
                              </Col>
                              <Col span={12} offset={1}>
                                {current === steps.length - 1 && (
                                  <Button
                                    block
                                    type="primary"
                                    onClick={() => submitOrder(fullAddress)}
                                  >
                                    Make Payment
                                  </Button>
                                )}
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <>
                      <Col>
                        <div>
                          {!isPageLoading ? (
                            currentUserDetails.cart
                              // .sort((a, b) => b.createdAt - a.createdAt)
                              .map((product) => (
                                <Row
                                  key={product._id}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                  }}
                                >
                                  <Card
                                    style={{ marginBottom: 20 }}
                                    cover={
                                      <img
                                        alt="example"
                                        // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                        src={`${imgUrl}/${product.productImage}`}
                                      />
                                    }
                                  >
                                    <Meta
                                      title={
                                        <Row
                                          style={{
                                            alignContent: "center",
                                          }}
                                        >
                                          <Col span={14}>{product.name}</Col>

                                          <Col
                                            span={10}
                                            style={{ textAlign: "end" }}
                                          >
                                            <Row>
                                              <Col
                                                span={10}
                                                style={{
                                                  alignItems: "flex-end",
                                                }}
                                              >
                                                <TagOutlined />
                                              </Col>
                                              <Col span={14}>
                                                <Title level={5}>
                                                  &#8377; {product.price}
                                                </Title>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                      }
                                      description={product.description}
                                    />
                                    <Row
                                      style={{
                                        marginTop: 30,
                                        alignItems: "center",
                                      }}
                                    >
                                      <Col span={5}>
                                        <Typography level={5} type="secondary">
                                          Qty:
                                        </Typography>
                                      </Col>
                                      <Col span={12}>
                                        <Row>
                                          <Col span={8}>
                                            <Button
                                              disabled={product.quantity === 1}
                                              icon={
                                                <MinusOutlined key="decrease" />
                                              }
                                              onClick={() =>
                                                decreaseQuantity(product)
                                              }
                                              size="middle"
                                            />
                                          </Col>
                                          <Col
                                            span={8}
                                            style={{
                                              textAlign: "center",
                                              marginTop: 5,
                                            }}
                                          >
                                            <Typography>
                                              {product.quantity}
                                            </Typography>
                                          </Col>
                                          <Col
                                            span={8}
                                            style={{ textAlign: "end" }}
                                          >
                                            <Button
                                              icon={
                                                <PlusOutlined key="increase" />
                                              }
                                              onClick={() =>
                                                increaseQuantity(product)
                                              }
                                            ></Button>
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col span={7}>
                                        <Title
                                          level={5}
                                          style={{ textAlign: "right" }}
                                        >
                                          &#8377;{" "}
                                          {`${
                                            parseInt(product.price) *
                                            parseInt(product.quantity)
                                          }`}
                                        </Title>
                                      </Col>
                                    </Row>
                                    <Button
                                      style={{ marginTop: 20 }}
                                      block
                                      danger
                                      type="primary"
                                      onClick={() =>
                                        removeItemFromCart(product._id)
                                      }
                                    >
                                      Remove from Cart
                                    </Button>
                                  </Card>
                                </Row>
                              ))
                          ) : (
                            <Col span={12} className="spin">
                              <Spin tip="Loading..." size="large" />
                            </Col>
                          )}
                        </div>
                      </Col>
                      <Col span={8} xs={24}>
                        <Row>
                          <Col span={24}>
                            <Card>
                              <Meta title="Breakdowns"></Meta>
                              <Divider />
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Col>
                                  <Typography>Sub-Total</Typography>
                                </Col>
                                <Col>
                                  <Title level={5}>
                                    &#8377; {cartTotalPrice}
                                  </Title>
                                </Col>
                              </Row>

                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginTop: 10,
                                }}
                              >
                                <Col>
                                  <Typography>GST (%)</Typography>
                                </Col>
                                <Col>
                                  <Typography>&#8377; 0</Typography>
                                </Col>
                              </Row>
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginTop: 20,
                                }}
                              >
                                <Col>
                                  <Typography>Service Charges</Typography>
                                </Col>
                                <Col>
                                  <Typography>&#8377; 0</Typography>
                                </Col>
                              </Row>
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginTop: 20,
                                }}
                              >
                                <Col>
                                  <Typography>Delivery Charges</Typography>
                                </Col>
                                <Col>
                                  <Typography>&#8377; 10</Typography>
                                </Col>
                              </Row>
                              <Divider />
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginTop: 20,
                                }}
                              >
                                <Col>
                                  <Title level={5}>Grand Total</Title>
                                </Col>
                                <Col>
                                  <Title level={4}>
                                    {" "}
                                    &#8377; {parseInt(cartTotalPrice) + 10}
                                  </Title>
                                </Col>
                              </Row>
                            </Card>

                            <div
                              className="steps-action"
                              style={{ marginTop: 16 }}
                            >
                              <Button
                                type="primary"
                                onClick={goToCheckout}
                                block
                              >
                                Checkout
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </>
                  )}
                </Row>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                {isOrderSuccessful ? (
                  <div style={{ marginTop: 60 }}>
                    <Result
                      status="success"
                      title={
                        <Typography style={{ fontSize: 16 }}>
                          Your order was placed successfully..
                        </Typography>
                      }
                      subTitle={`Order ID: ${
                        newOrderId._id ? newOrderId._id : "2017182818828182881"
                      }`}
                      extra={[
                        <Button
                          type="primary"
                          key="console"
                          onClick={() => {
                            changeSectionPage("Orders");
                            getSingleOrder(newOrderId);
                          }}
                        >
                          View Details
                        </Button>,
                        <Button
                          key="buy"
                          onClick={() => changeSectionPage("Home")}
                        >
                          Continue Shopping..
                        </Button>,
                      ]}
                    />
                  </div>
                ) : (
                  <div style={{ marginTop: 10 }}>
                    <Result
                      status="403"
                      title={
                        <Typography style={{ fontSize: 16 }}>
                          Your cart is empty..
                        </Typography>
                      }
                      extra={
                        <Button
                          type="primary"
                          onClick={() => changeSectionPage("Home")}
                        >
                          Start Shopping..
                        </Button>
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </Content>
        </Hidden>
      </Layout>
    ) : (
      <Col span={24} className="spin">
        <Spin tip="Loading..." size="large" />
      </Col>
    )
  ) : null;
};

export default MyCartPage;
