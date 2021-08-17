import React from "react";
import { Drawer, Typography, Card, Button, Tag, Result } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Hidden } from "@material-ui/core";

const NotificationsDrawerPage = ({
  currentUserDetails,
  notificationsDrawerVisible,
  closeNotificationsDrawer,
  getSingleOrder,
  changeSectionPage,
}) => {
  return (
    <>
      <Hidden xsDown>
        <Drawer
          width={540}
          onClose={closeNotificationsDrawer}
          visible={notificationsDrawerVisible}
        >
          <Typography>Notifications</Typography>
          <div>
            {currentUserDetails._id &&
            currentUserDetails.notifications.length > 0 ? (
              <div style={{ marginTop: 20, height: 620, overflowY: "scroll" }}>
                {currentUserDetails.notifications
                  .sort((a, b) =>
                    currentUserDetails.role === "Admin"
                      ? b.orderCreatedAt - a.orderCreatedAt
                      : b.deliveryDetailsCreatedAt - a.deliveryDetailsCreatedAt
                  )
                  .map((notification) => (
                    <Card
                      key={notification._id}
                      style={{ marginBottom: 20 }}
                      type="inner"
                      title={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ fontSize: 13 }}>
                            {notification.message}
                          </Typography>
                          {currentUserDetails.role === "Admin" ? (
                            <Typography
                              style={{ fontSize: 13, fontWeight: 600 }}
                            >
                              {notification._id}
                            </Typography>
                          ) : (
                            <></>
                          )}
                        </div>
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {currentUserDetails.role === "Admin" ? (
                          <Typography
                            style={{
                              fontSize: 13,
                              color: "rgb(100, 100, 100)",
                            }}
                          >
                            {
                              new Date(parseInt(notification.orderCreatedAt))
                                .toDateString()
                                .split(" ")[2]
                            }{" "}
                            {
                              new Date(parseInt(notification.orderCreatedAt))
                                .toDateString()
                                .split(" ")[1]
                            }
                            ,{" "}
                            {
                              new Date(parseInt(notification.orderCreatedAt))
                                .toDateString()
                                .split(" ")[3]
                            }
                          </Typography>
                        ) : (
                          <Typography
                            style={{
                              fontSize: 13,
                              color: "rgb(100, 100, 100)",
                            }}
                          >
                            {
                              new Date(
                                parseInt(notification.deliveryDetailsCreatedAt)
                              )
                                .toDateString()
                                .split(" ")[2]
                            }{" "}
                            {
                              new Date(
                                parseInt(notification.deliveryDetailsCreatedAt)
                              )
                                .toDateString()
                                .split(" ")[1]
                            }
                            ,{" "}
                            {
                              new Date(
                                parseInt(notification.deliveryDetailsCreatedAt)
                              )
                                .toDateString()
                                .split(" ")[3]
                            }
                          </Typography>
                        )}

                        {currentUserDetails.role === "Admin" ? (
                          <div>
                            {notification.isSeenByAdmin ? (
                              <Tag
                                style={{ borderRadius: 20 }}
                                icon={<CheckCircleOutlined />}
                                color="processing"
                              >
                                Seen
                              </Tag>
                            ) : (
                              <Tag
                                style={{ borderRadius: 20 }}
                                icon={<CloseCircleOutlined />}
                                color="error"
                              >
                                Not Seen
                              </Tag>
                            )}
                            <Button
                              size="small"
                              shape="round"
                              style={{ fontSize: 12 }}
                              onClick={() => {
                                changeSectionPage("Orders");
                                getSingleOrder(notification);
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        ) : (
                          <div>
                            {notification.orderDeliveryNotificationSeen ? (
                              <Tag
                                style={{ borderRadius: 20 }}
                                icon={<CheckCircleOutlined />}
                                color="processing"
                              >
                                Seen
                              </Tag>
                            ) : (
                              <Tag
                                style={{ borderRadius: 20 }}
                                icon={<CloseCircleOutlined />}
                                color="error"
                              >
                                Not Seen
                              </Tag>
                            )}
                            <Button
                              size="small"
                              shape="round"
                              style={{ fontSize: 12 }}
                              onClick={() => {
                                changeSectionPage("Orders");
                                getSingleOrder(notification);
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            ) : (
              <div style={{ marginTop: 60 }}>
                <Result
                  status="403"
                  title={
                    <Typography style={{ fontSize: 18 }}>
                      Your have no notifications..
                    </Typography>
                  }
                />
              </div>
            )}
          </div>
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <Drawer
          width={360}
          onClose={closeNotificationsDrawer}
          visible={notificationsDrawerVisible}
        >
          <Typography>Notifications</Typography>
          <div style={{ marginTop: 20, height: 542, overflowY: "scroll" }}>
            {currentUserDetails._id &&
            currentUserDetails.notifications.length > 0 ? (
              <div>
                {currentUserDetails.notifications
                  .sort((a, b) =>
                    currentUserDetails.role === "Admin"
                      ? b.orderCreatedAt - a.orderCreatedAt
                      : b.deliveryDetailsCreatedAt - a.deliveryDetailsCreatedAt
                  )
                  .map((notification) => (
                    <Card
                      key={notification._id}
                      style={{ marginBottom: 20 }}
                      type="inner"
                      title={
                        <div>
                          <Typography style={{ fontSize: 13 }}>
                            {notification.message}
                          </Typography>
                          {currentUserDetails.role === "Admin" ? (
                            <Typography
                              style={{ fontSize: 13, fontWeight: 600 }}
                            >
                              {notification._id}
                            </Typography>
                          ) : (
                            <></>
                          )}
                        </div>
                      }
                    >
                      <div>
                        {currentUserDetails.role === "Admin" ? (
                          <Typography
                            style={{
                              fontSize: 13,
                              color: "rgb(100, 100, 100)",
                            }}
                          >
                            {
                              new Date(parseInt(notification.orderCreatedAt))
                                .toDateString()
                                .split(" ")[2]
                            }{" "}
                            {
                              new Date(parseInt(notification.orderCreatedAt))
                                .toDateString()
                                .split(" ")[1]
                            }
                            ,{" "}
                            {
                              new Date(parseInt(notification.orderCreatedAt))
                                .toDateString()
                                .split(" ")[3]
                            }
                          </Typography>
                        ) : (
                          <Typography
                            style={{
                              fontSize: 13,
                              color: "rgb(100, 100, 100)",
                            }}
                          >
                            {
                              new Date(
                                parseInt(notification.deliveryDetailsCreatedAt)
                              )
                                .toDateString()
                                .split(" ")[2]
                            }{" "}
                            {
                              new Date(
                                parseInt(notification.deliveryDetailsCreatedAt)
                              )
                                .toDateString()
                                .split(" ")[1]
                            }
                            ,{" "}
                            {
                              new Date(
                                parseInt(notification.deliveryDetailsCreatedAt)
                              )
                                .toDateString()
                                .split(" ")[3]
                            }
                          </Typography>
                        )}
                      </div>
                      {currentUserDetails.role === "Admin" ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 10,
                          }}
                        >
                          <Button
                            size="small"
                            shape="round"
                            style={{ fontSize: 12 }}
                            onClick={() => {
                              changeSectionPage("Orders");
                              getSingleOrder(notification);
                            }}
                          >
                            View Details
                          </Button>
                          {notification.isSeenByAdmin ? (
                            <Tag
                              style={{ borderRadius: 20 }}
                              icon={<CheckCircleOutlined />}
                              color="processing"
                            >
                              Seen
                            </Tag>
                          ) : (
                            <Tag
                              style={{ borderRadius: 20 }}
                              icon={<CloseCircleOutlined />}
                              color="error"
                            >
                              Not Seen
                            </Tag>
                          )}
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 10,
                          }}
                        >
                          <Button
                            size="small"
                            shape="round"
                            style={{ fontSize: 12 }}
                            onClick={() => {
                              changeSectionPage("Orders");
                              getSingleOrder(notification);
                            }}
                          >
                            View Details
                          </Button>
                          {notification.orderDeliveryNotificationSeen ? (
                            <Tag
                              style={{ borderRadius: 20 }}
                              icon={<CheckCircleOutlined />}
                              color="processing"
                            >
                              Seen
                            </Tag>
                          ) : (
                            <Tag
                              style={{ borderRadius: 20 }}
                              icon={<CloseCircleOutlined />}
                              color="error"
                            >
                              Not Seen
                            </Tag>
                          )}
                        </div>
                      )}
                    </Card>
                  ))}
              </div>
            ) : (
              <div style={{ marginTop: 60 }}>
                <Result
                  status="403"
                  title={
                    <Typography style={{ fontSize: 16 }}>
                      Your have no notifications..
                    </Typography>
                  }
                />
              </div>
            )}
          </div>
        </Drawer>
      </Hidden>
    </>
  );
};

export default NotificationsDrawerPage;
