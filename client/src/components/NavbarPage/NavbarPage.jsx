import React from "react";
import { Col, Row, Tabs, Badge, Button, Tooltip } from "antd";
import { Hidden } from "@material-ui/core";

import {
  HomeOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  BellOutlined,
  SettingOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

// const defaultNavigationTab = window.location.href.split("/")[3];

const NavbarPage = ({
  changeSectionPage,
  currentUserDetails,
  cartBadge,
  openDrawer,
  openNotificationsDrawer,
  customerNotificationsLength,
  adminNotificationsLength,
  pendingAdminOrdersList,
  openMenuDrawer,
}) => {
  return (
    <>
      <Hidden xsDown>
        <Row
          style={{
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Col style={{ justifyContent: "start" }}>
            <Button type="link">E-Cart</Button>
          </Col>
          <Col>
            <Tabs
              // tabBarStyle={{ marginBottom: 0 }}
              // activeKey={
              //   defaultNavigationTab === ""
              //     ? "Home"
              //     : defaultNavigationTab.charAt(0).toUpperCase() +
              //       defaultNavigationTab.slice(1)
              // }
              style={{ alignItems: "center" }}
              className="appBar"
              size="middle"
              onChange={changeSectionPage}
            >
              <TabPane
                tab={
                  <span>
                    <HomeOutlined />
                    Home
                  </span>
                }
                key="Home"
              ></TabPane>
              {currentUserDetails.role === "General" ? (
                <TabPane
                  tab={
                    <span>
                      <ShoppingCartOutlined />
                      Cart
                      {currentUserDetails._id ? (
                        <Badge
                          count={cartBadge}
                          style={{ marginLeft: 5, marginTop: -4 }}
                        ></Badge>
                      ) : null}
                    </span>
                  }
                  key="Cart"
                ></TabPane>
              ) : null}
              {currentUserDetails._id ? (
                <TabPane
                  tab={
                    <span>
                      <UnorderedListOutlined />
                      Orders
                      {currentUserDetails.role === "Admin" ? (
                        <Badge
                          count={pendingAdminOrdersList}
                          style={{ marginLeft: 5, marginTop: -4 }}
                        ></Badge>
                      ) : null}
                    </span>
                  }
                  key="Orders"
                ></TabPane>
              ) : null}
            </Tabs>
          </Col>
          <Col>
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Col>
                <div>
                  {localStorage.getItem("access-token") ? (
                    <>
                      <Tooltip title="notifications">
                        <Button
                          onClick={openNotificationsDrawer}
                          shape="circle"
                          style={{ marginRight: 14 }}
                          icon={
                            <Badge
                              count={
                                currentUserDetails.role === "Admin"
                                  ? adminNotificationsLength
                                  : customerNotificationsLength
                              }
                              // count={unseenNotificationsLength}
                            >
                              <BellOutlined />
                            </Badge>
                          }
                        />
                      </Tooltip>

                      <Tooltip title="Settings">
                        <Button
                          shape="circle"
                          icon={<SettingOutlined />}
                          onClick={openDrawer}
                        >
                          {/* Logout */}
                        </Button>
                      </Tooltip>
                    </>
                  ) : (
                    <Button type="primary" shape="round" onClick={openDrawer}>
                      Login / SignUp
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Hidden>
      <Hidden smUp>
        <Row
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0 24px",
          }}
        >
          <Col
            style={{
              justifyContent: "start",
              display: "flex",
              margin: "10px 0",
            }}
          >
            <Tooltip>
              <Button icon={<MenuOutlined />} onClick={openMenuDrawer}>
                {/* Logout */}
              </Button>
            </Tooltip>
            <Button type="link">E-Cart</Button>
          </Col>

          <Col>
            <div>
              {localStorage.getItem("access-token") ? (
                <>
                  <Tooltip>
                    <Button
                      onClick={openNotificationsDrawer}
                      shape="circle"
                      style={{ marginRight: 14 }}
                      icon={
                        <Badge
                          count={
                            currentUserDetails.role === "Admin"
                              ? adminNotificationsLength
                              : customerNotificationsLength
                          }
                          // count={unseenNotificationsLength}
                        >
                          <BellOutlined />
                        </Badge>
                      }
                    />
                  </Tooltip>

                  <Tooltip>
                    <Button
                      shape="circle"
                      icon={<SettingOutlined />}
                      onClick={openDrawer}
                    >
                      {/* Logout */}
                    </Button>
                  </Tooltip>
                </>
              ) : (
                <Button type="primary" shape="round" onClick={openDrawer}>
                  Login / SignUp
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Hidden>
    </>
  );
};

export default NavbarPage;
