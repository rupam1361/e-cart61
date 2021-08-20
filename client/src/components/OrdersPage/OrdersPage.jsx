import React, { useState } from "react";
import {
  Layout,
  Tabs,
  Card,
  Typography,
  Row,
  Col,
  Button,
  Breadcrumb,
  Spin,
  Modal,
  DatePicker,
  Space,
  Form,
  Alert,
  Divider,
  Result,
} from "antd";
import { Hidden } from "@material-ui/core";
import { TagOutlined } from "@ant-design/icons";

import SingleOrder from "../SingleOrder/SingleOrder";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;
const { Title } = Typography;

const OrdersPage = ({
  currentUserDetails,
  imgUrl,
  ordersForUser,
  ordersForAdmin,
  getSingleOrder,
  breadcrumOrder,
  goBackToOrders,
  isSingleOrderPageActive,
  cartTotalPrice,
  isPageLoading,
  acceptOrder,
  errorMessage,
  showAcceptOrderModal,
  handleCancelOrderModal,
  isAcceptOrderModalVisible,
  changeSectionPage,
}) => {
  const [deliveryDate, setDeliveryDate] = useState("");

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDeliveryDate(dateString);
  };

  const orders =
    currentUserDetails.role === "Admin" ? ordersForAdmin : ordersForUser;
  return currentUserDetails._id ? (
    <Layout>
      <Hidden xsDown>
        <Content
          className="site-layout"
          style={{
            padding: "16px 180px",
            height: "90vh",
            overflowY: "scroll",
            borderWidth: 1,
            borderStyle: "inherit",
          }}
        >
          <Tabs size="small">
            <TabPane tab="My Orders">
              {!isPageLoading ? (
                <div>
                  {orders && orders.length > 0 ? (
                    <div>
                      <Breadcrumb style={{ marginBottom: 16 }}>
                        <Breadcrumb.Item
                          className="breadCrum"
                          onClick={goBackToOrders}
                        >
                          All Orders
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="breadCrum">
                          {breadcrumOrder._id}
                        </Breadcrumb.Item>
                      </Breadcrumb>
                      {orders
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .map((order) => (
                          <div key={order._id}>
                            {!isSingleOrderPageActive ? (
                              <Card
                                style={{
                                  backgroundColor: "white",
                                  padding: "16px 140px",
                                  paddingTop: 6,

                                  borderWidth: 1,
                                  borderStyle: "inherit",
                                }}
                              >
                                <Card
                                  style={{
                                    backgroundColor: "rgb(240, 240, 240)",
                                  }}
                                >
                                  <Row
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography className="orderId">
                                      <span style={{ fontWeight: "normal" }}>
                                        Order ID:
                                      </span>{" "}
                                      <span>{order._id}</span>
                                    </Typography>
                                    <div>
                                      <Typography className="orderPlacedOn">
                                        Placed on{" "}
                                        {
                                          new Date(parseInt(order.createdAt))
                                            .toDateString()
                                            .split(" ")[2]
                                        }{" "}
                                        {
                                          new Date(parseInt(order.createdAt))
                                            .toDateString()
                                            .split(" ")[1]
                                        }
                                        ,{" "}
                                        {
                                          new Date(parseInt(order.createdAt))
                                            .toDateString()
                                            .split(" ")[3]
                                        }
                                      </Typography>
                                    </div>
                                  </Row>
                                  <Row
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginTop: 20,
                                    }}
                                  >
                                    <Col span={24}>
                                      {order.items.map((item) => (
                                        <Card key={item._id}>
                                          <Row
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-evenly",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Col>
                                              <Card
                                                style={{
                                                  height: 120,
                                                  width: 90,
                                                }}
                                                cover={
                                                  <img
                                                    alt="example"
                                                    // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                                    src={`${imgUrl}/${item.productImage}`}
                                                  />
                                                }
                                              ></Card>
                                            </Col>
                                            <Col style={{ width: 300 }}>
                                              <Meta
                                                style={{ paddingLeft: 20 }}
                                                title={
                                                  <Row
                                                    style={{
                                                      alignContent: "center",
                                                    }}
                                                  >
                                                    <Col>{item.name}</Col>
                                                  </Row>
                                                }
                                                description={item.description}
                                              />
                                              <Row
                                                style={{
                                                  marginTop: 30,
                                                  paddingLeft: 20,
                                                }}
                                              >
                                                <Col span={10}>
                                                  <Typography>
                                                    Qty:{" "}
                                                    <span
                                                      style={{
                                                        fontWeight: 600,
                                                      }}
                                                    >
                                                      {item.quantity}
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
                                                          parseInt(item.price) *
                                                          parseInt(
                                                            item.quantity
                                                          )
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
                                    </Col>
                                  </Row>
                                  <Card>
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Col
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Button
                                          type="default"
                                          onClick={() => getSingleOrder(order)}
                                        >
                                          View Details
                                        </Button>
                                      </Col>
                                      <Col
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Row
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Col style={{ fontWeight: 600 }}>
                                            <Typography>Total:</Typography>
                                          </Col>
                                          <Col
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              fontSize: 18,
                                              fontWeight: 600,
                                              marginLeft: 10,
                                            }}
                                          >
                                            &#8377;{" "}
                                            <Typography
                                              style={{ marginLeft: 5 }}
                                            >
                                              {order.cartTotalPrice}
                                            </Typography>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Card>
                                  <Card>
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Col
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Typography
                                          style={{
                                            color: "rgb(180, 180, 180)",
                                            marginRight: 10,
                                          }}
                                        >
                                          Status:
                                        </Typography>
                                        {order.deliveryDate ? (
                                          <Typography
                                            style={{
                                              color: " rgb(0, 187, 0)",
                                              fontSize: 14,
                                              fontWeight: 600,
                                            }}
                                          >
                                            In-transit
                                          </Typography>
                                        ) : (
                                          <Typography
                                            style={{
                                              color: "red",
                                              fontSize: 14,
                                              fontWeight: 600,
                                            }}
                                          >
                                            Pending
                                          </Typography>
                                        )}
                                      </Col>
                                      <Col
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Typography
                                          style={{
                                            color: "rgb(180, 180, 180)",
                                            marginRight: 10,
                                          }}
                                        >
                                          Expected Delivery Date:
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {order.deliveryDate ? (
                                            <>
                                              {
                                                new Date(
                                                  parseInt(order.deliveryDate)
                                                )
                                                  .toDateString()
                                                  .split(" ")[2]
                                              }{" "}
                                              {
                                                new Date(
                                                  parseInt(order.deliveryDate)
                                                )
                                                  .toDateString()
                                                  .split(" ")[1]
                                              }
                                              ,{" "}
                                              {
                                                new Date(
                                                  parseInt(order.deliveryDate)
                                                )
                                                  .toDateString()
                                                  .split(" ")[3]
                                              }
                                            </>
                                          ) : (
                                            "Pending"
                                          )}
                                        </Typography>
                                      </Col>
                                    </Row>
                                  </Card>
                                </Card>
                              </Card>
                            ) : (
                              <Card>
                                <SingleOrder
                                  order={order}
                                  imgUrl={imgUrl}
                                  cartTotalPrice={cartTotalPrice}
                                  currentUserDetails={currentUserDetails}
                                  showAcceptOrderModal={showAcceptOrderModal}
                                />
                              </Card>
                            )}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", marginTop: 10 }}>
                      <Result
                        status="403"
                        title={
                          <Typography style={{ fontSize: 18 }}>
                            You have no orders..
                          </Typography>
                        }
                        extra={
                          <Button
                            type="primary"
                            onClick={() => changeSectionPage("Home")}
                          >
                            Continue Shopping..
                          </Button>
                        }
                      />
                    </div>
                  )}
                </div>
              ) : (
                <Col span={24} className="spin">
                  <Spin tip="Loading..." size="large" />
                </Col>
              )}

              <Modal
                style={{ top: 220 }}
                title="Accept Order"
                visible={isAcceptOrderModalVisible}
                onOk={() => acceptOrder(deliveryDate)}
                okText="Accept Order"
                onCancel={handleCancelOrderModal}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>Select Delivery Date:</Typography>
                  <Space direction="vertical">
                    <DatePicker onChange={onChange} format="DD-MM-YYYY" />
                  </Space>
                </div>
                {errorMessage ? (
                  <Form.Item style={{ marginTop: 16 }}>
                    <Alert message={errorMessage} type="error" />
                  </Form.Item>
                ) : null}
              </Modal>
            </TabPane>
          </Tabs>
        </Content>
      </Hidden>

      <Hidden smUp>
        <Content
          className="site-layout"
          style={{
            padding: "16px 0",
            // marginTop: 64,
            height: "91.8vh",
            overflowY: "scroll",
            borderWidth: 1,
            borderStyle: "inherit",
          }}
        >
          <div
            style={{
              margin: "0 20px",
            }}
          >
            {/* <Radio.Group>
              <Radio.Button value="myOrders">My Orders</Radio.Button>
            </Radio.Group> */}
            <Breadcrumb style={{ marginBottom: 16 }}>
              <Breadcrumb.Item className="breadCrum" onClick={goBackToOrders}>
                My Orders
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadCrum">
                {breadcrumOrder._id}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {!isPageLoading ? (
            <div>
              {orders && orders.length > 0 ? (
                <div>
                  {orders
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .map((order) => (
                      <div key={order._id}>
                        {!isSingleOrderPageActive ? (
                          <Card>
                            <Card>
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Col
                                  span={24}
                                  style={{
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                  }}
                                >
                                  <Col>
                                    <Typography className="orderId">
                                      <span style={{ fontWeight: "normal" }}>
                                        Order ID:
                                      </span>{" "}
                                      <span>{order._id}</span>
                                    </Typography>
                                  </Col>
                                  <Col>
                                    <Typography className="orderPlacedOn">
                                      Placed on{" "}
                                      {
                                        new Date(parseInt(order.createdAt))
                                          .toDateString()
                                          .split(" ")[2]
                                      }{" "}
                                      {
                                        new Date(parseInt(order.createdAt))
                                          .toDateString()
                                          .split(" ")[1]
                                      }
                                      ,{" "}
                                      {
                                        new Date(parseInt(order.createdAt))
                                          .toDateString()
                                          .split(" ")[3]
                                      }
                                    </Typography>
                                  </Col>
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
                                <Col span={24}>
                                  {order.items.map((item) => (
                                    <div key={item._id}>
                                      <Row
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-evenly",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Row
                                          style={{
                                            width: 360,
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Col span={6}>
                                            <Card
                                              style={{ height: 120, width: 90 }}
                                              cover={
                                                <img
                                                  alt="example"
                                                  // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                                  src={`${imgUrl}/${item.productImage}`}
                                                />
                                              }
                                            ></Card>
                                          </Col>
                                          <Col
                                            span={15}
                                            style={{ paddingLeft: 20 }}
                                          >
                                            <Meta
                                              title={
                                                <Row
                                                  style={{
                                                    alignContent: "center",
                                                  }}
                                                >
                                                  {item.name}
                                                </Row>
                                              }
                                              description={item.description}
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
                                                  <span
                                                    style={{ fontWeight: 600 }}
                                                  >
                                                    {item.quantity}
                                                  </span>
                                                </Typography>
                                              </Col>
                                              <Col style={{ textAlign: "end" }}>
                                                <Row>
                                                  <Col>
                                                    <Title level={5}>
                                                      &#8377;{" "}
                                                      {`${
                                                        parseInt(item.price) *
                                                        parseInt(item.quantity)
                                                      }`}
                                                    </Title>
                                                  </Col>
                                                </Row>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>

                                        <Divider />
                                      </Row>
                                    </div>
                                  ))}
                                  <Col>
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Col span={8}>
                                        <Button
                                          type="default"
                                          onClick={() => getSingleOrder(order)}
                                        >
                                          View Details
                                        </Button>
                                      </Col>

                                      <Col
                                        span={9}
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Col style={{ fontWeight: 600 }}>
                                          <Typography>Total:</Typography>
                                        </Col>
                                        <Col
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: 18,
                                            fontWeight: 600,
                                          }}
                                        >
                                          &#8377;{" "}
                                          <Typography>
                                            {order.cartTotalPrice}
                                          </Typography>
                                        </Col>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Divider />

                                  <Col
                                    style={{
                                      width: 320,
                                    }}
                                  >
                                    <Row
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Col
                                        style={{
                                          width: 360,
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <Typography
                                          style={{
                                            color: "rgb(180, 180, 180)",
                                          }}
                                        >
                                          Status:
                                        </Typography>
                                        {order.deliveryDate ? (
                                          <Typography
                                            style={{
                                              color: " rgb(0, 187, 0)",
                                              fontSize: 14,
                                              fontWeight: 600,
                                            }}
                                          >
                                            In-transit
                                          </Typography>
                                        ) : (
                                          <Typography
                                            style={{
                                              color: "red",
                                              fontSize: 14,
                                              fontWeight: 600,
                                            }}
                                          >
                                            Pending
                                          </Typography>
                                        )}
                                      </Col>

                                      <Col
                                        style={{
                                          marginTop: 16,
                                          width: 360,

                                          fontSize: 14,
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography
                                          style={{
                                            color: "rgb(180, 180, 180)",
                                          }}
                                        >
                                          Expected delivery date:
                                        </Typography>
                                        <Typography
                                          style={{
                                            color: "rgb(100, 100, 100)",
                                            fontStyle: "italic",
                                          }}
                                        >
                                          {order.deliveryDate ? (
                                            <>
                                              {
                                                new Date(
                                                  parseInt(order.deliveryDate)
                                                )
                                                  .toDateString()
                                                  .split(" ")[2]
                                              }{" "}
                                              {
                                                new Date(
                                                  parseInt(order.deliveryDate)
                                                )
                                                  .toDateString()
                                                  .split(" ")[1]
                                              }
                                              ,{" "}
                                              {
                                                new Date(
                                                  parseInt(order.deliveryDate)
                                                )
                                                  .toDateString()
                                                  .split(" ")[3]
                                              }
                                            </>
                                          ) : (
                                            "Pending"
                                          )}
                                        </Typography>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Col>
                              </Row>
                            </Card>
                          </Card>
                        ) : (
                          <Card>
                            <SingleOrder
                              order={order}
                              imgUrl={imgUrl}
                              cartTotalPrice={cartTotalPrice}
                              currentUserDetails={currentUserDetails}
                              showAcceptOrderModal={showAcceptOrderModal}
                            />
                          </Card>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", marginTop: 10 }}>
                  <Result
                    status="403"
                    title={
                      <Typography style={{ fontSize: 16 }}>
                        You have no orders..
                      </Typography>
                    }
                    extra={
                      <Button
                        type="primary"
                        onClick={() => changeSectionPage("Home")}
                      >
                        Continue Shopping..
                      </Button>
                    }
                  />
                </div>
              )}
            </div>
          ) : (
            <Col span={24} className="spin">
              <Spin tip="Loading..." size="large" />
            </Col>
          )}

          <Modal
            style={{ top: 220 }}
            title="Accept Order"
            visible={isAcceptOrderModalVisible}
            onOk={() => acceptOrder(deliveryDate)}
            okText="Accept Order"
            onCancel={handleCancelOrderModal}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Select Delivery Date:</Typography>
              <Space direction="vertical">
                <DatePicker onChange={onChange} format="DD-MM-YYYY" />
              </Space>
            </div>
            {errorMessage ? (
              <Form.Item style={{ marginTop: 16 }}>
                <Alert message={errorMessage} type="error" />
              </Form.Item>
            ) : null}
          </Modal>
          {/* <Tabs size="small">
            <TabPane tab="My Orders">
              
            </TabPane>
          </Tabs> */}
        </Content>
      </Hidden>
    </Layout>
  ) : null;
};

export default OrdersPage;
