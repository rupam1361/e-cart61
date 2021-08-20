import React from "react";
import { Layout, Typography, Row, Col, Card, Divider, Button } from "antd";
import { Hidden } from "@material-ui/core";
import { TagOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Meta } = Card;
const { Title } = Typography;

const SingleOrder = ({
  imgUrl,
  cartTotalPrice,
  order,
  currentUserDetails,
  showAcceptOrderModal,
}) => {
  return currentUserDetails._id ? (
    <Layout>
      <Hidden xsDown>
        <Content
          className="site-layout"
          style={{
            backgroundColor: "white",
            padding: "16px 140px",
            paddingTop: 6,

            borderWidth: 1,
            borderStyle: "inherit",
          }}
        >
          <Card style={{ backgroundColor: "rgb(240, 240, 240)" }}>
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography className="orderId">
                <span style={{ fontWeight: "normal" }}>Order ID:</span>{" "}
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
            {/* <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Col
                span={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Col>
                  <Typography className="orderId">
                    <span style={{ fontWeight: "normal" }}>Order ID:</span>{" "}
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
                </Col>
              </Col>
              <Col span={!order.isAcceptedByAdmin ? 8 : 4}>
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
                      alignItems: "center",
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    &#8377; <Typography>{order.cartTotalPrice}</Typography>
                  </Col>
                </Row>
              </Col>
            </Row> */}
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
                      <Col style={{ width: 300 }}>
                        <Meta
                          style={{ paddingLeft: 20 }}
                          title={
                            <Row style={{ alignContent: "center" }}>
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
                              <span style={{ fontWeight: 600 }}>
                                {item.quantity}
                              </span>
                            </Typography>
                          </Col>
                          <Col span={10} style={{ textAlign: "end" }}>
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
                                    parseInt(item.quantity)
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
                  {order.deliveryDate ? (
                    <div style={{ display: "flex" }}>
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
                        <>
                          {
                            new Date(parseInt(order.deliveryDate))
                              .toDateString()
                              .split(" ")[2]
                          }{" "}
                          {
                            new Date(parseInt(order.deliveryDate))
                              .toDateString()
                              .split(" ")[1]
                          }
                          ,{" "}
                          {
                            new Date(parseInt(order.deliveryDate))
                              .toDateString()
                              .split(" ")[3]
                          }
                        </>
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      {currentUserDetails.role === "Admin" ? (
                        !order.isAcceptedByAdmin ? (
                          <Col>
                            <Button
                              type="primary"
                              onClick={() => showAcceptOrderModal(order)}
                            >
                              Accept Order
                            </Button>
                          </Col>
                        ) : null
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
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
                  <Typography>Payment Method:</Typography>
                </Col>
                <Col>
                  <Typography style={{ textTransform: "uppercase" }}>
                    {order.paymentMethod}
                  </Typography>
                </Col>
              </Row>
            </Card>
            <Row
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: 20,
              }}
            >
              <Col span={24}>
                <Card>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      style={{
                        fontStyle: "italic",
                      }}
                    >
                      Delivery Address:
                    </Typography>
                    <div style={{ textAlign: "right" }}>
                      <Typography
                        style={{
                          margin: "0 0 12px 0",
                          fontWeight: 600,
                          fontSize: 14.5,
                        }}
                      >
                        {order.address}
                      </Typography>

                      <Typography style={{ margin: "12px 0", fontSize: 14.5 }}>
                        {order.city}, {order.state}
                      </Typography>
                      <Typography
                        style={{ margin: "12px 0 0 0", fontSize: 14.5 }}
                      >
                        Pin: {order.pincode}
                      </Typography>
                      <Typography
                        style={{ margin: "12px 0 0 0", fontSize: 14.5 }}
                      >
                        <span style={{ fontWeight: "bold" }}>Contact No:</span>{" "}
                        (+{order.phoneCode}) {order.mobileNumber}
                      </Typography>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Content>
      </Hidden>
      <Hidden smUp>
        <Content
          className="site-layout"
          style={{
            backgroundColor: "white",
            padding: "16px 0",
            paddingTop: 6,

            borderWidth: 1,
            borderStyle: "inherit",
          }}
        >
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
                  // display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Col>
                  <Typography className="orderId">
                    <span style={{ fontWeight: "normal" }}>Order ID:</span>{" "}
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
                      <Col
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
                        <Col span={15} style={{ paddingLeft: 20 }}>
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
                                <span style={{ fontWeight: 600 }}>
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
                      </Col>

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
                    <Col
                      style={{
                        width: 360,
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
                        &#8377; <Typography>{order.cartTotalPrice}</Typography>
                      </Col>
                    </Col>
                  </Row>
                </Col>
                <Divider />
                <Col>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Col
                      style={{
                        width: 360,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Col style={{ fontStyle: "italic" }}>
                        <Typography>Payment Method:</Typography>
                      </Col>
                      <Col>
                        <Typography style={{ textTransform: "uppercase" }}>
                          {order.paymentMethod}
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
                        marginTop: 20,
                        width: 360,
                        fontStyle: "italic",
                        fontSize: 14,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {order.deliveryDate ? (
                        <Col
                          style={{
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
                                  new Date(parseInt(order.deliveryDate))
                                    .toDateString()
                                    .split(" ")[2]
                                }{" "}
                                {
                                  new Date(parseInt(order.deliveryDate))
                                    .toDateString()
                                    .split(" ")[1]
                                }
                                ,{" "}
                                {
                                  new Date(parseInt(order.deliveryDate))
                                    .toDateString()
                                    .split(" ")[3]
                                }
                              </>
                            ) : (
                              "Pending"
                            )}
                          </Typography>
                        </Col>
                      ) : (
                        <div style={{ width: 360 }}>
                          {currentUserDetails.role === "Admin" ? (
                            !order.isAcceptedByAdmin ? (
                              <Button
                                block
                                type="primary"
                                onClick={() => showAcceptOrderModal(order)}
                              >
                                Accept Order
                              </Button>
                            ) : null
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Row>
            <Divider />
            <Row
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: 20,
              }}
            >
              <Col span={24}>
                <div>
                  <Typography
                    style={{
                      fontStyle: "italic",
                    }}
                  >
                    Delivery Address:
                  </Typography>
                  <div>
                    <Typography
                      style={{
                        margin: "16px 0 12px 0",
                        fontWeight: 600,
                        fontSize: 14.5,
                      }}
                    >
                      {order.address}
                    </Typography>

                    <Typography style={{ margin: "12px 0", fontSize: 14.5 }}>
                      {order.city}, {order.state}
                    </Typography>
                    <Typography
                      style={{ margin: "12px 0 0 0", fontSize: 14.5 }}
                    >
                      Pin: {order.pincode}
                    </Typography>
                    <Typography
                      style={{ margin: "12px 0 0 0", fontSize: 14.5 }}
                    >
                      <span style={{ fontWeight: "bold" }}>Contact No:</span> (+
                      {order.phoneCode}) {order.mobileNumber}
                    </Typography>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Content>
      </Hidden>
    </Layout>
  ) : null;
};

export default SingleOrder;
