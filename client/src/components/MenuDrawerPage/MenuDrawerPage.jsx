import React from "react";
import { Drawer, Typography, Menu, Badge } from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const MenuDrawerPage = ({
  closeMenuDrawer,
  menuDrawerVisible,
  changeSectionPage,
  currentUserDetails,
  pendingAdminOrdersList,
  cartBadge,
}) => {
  return (
    <Drawer
      height={currentUserDetails._id ? 234 : 138}
      placement="top"
      onClose={closeMenuDrawer}
      visible={menuDrawerVisible}
    >
      <Typography>Menu</Typography>
      <Menu style={{ marginTop: 20 }} onClick={(e) => changeSectionPage(e.key)}>
        <Menu.Item key="Home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        {currentUserDetails._id ? (
          <Menu.Item key="Cart" icon={<ShoppingCartOutlined />}>
            Cart
            {currentUserDetails._id ? (
              <Badge
                count={cartBadge}
                style={{ marginLeft: 5, marginTop: -4 }}
              ></Badge>
            ) : null}
          </Menu.Item>
        ) : null}
        {currentUserDetails._id ? (
          <Menu.Item key="Orders" icon={<UnorderedListOutlined />}>
            Orders
            {currentUserDetails.role === "Admin" ? (
              <Badge
                count={pendingAdminOrdersList}
                style={{ marginLeft: 5, marginTop: -4 }}
              ></Badge>
            ) : null}
          </Menu.Item>
        ) : null}
      </Menu>
    </Drawer>
  );
};

export default MenuDrawerPage;
