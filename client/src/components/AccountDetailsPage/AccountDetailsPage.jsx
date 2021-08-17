import React, { useState } from "react";
import { Layout, Typography, Button, Modal, Avatar } from "antd";

// const { TabPane } = Tabs;
// const { Content } = Layout;
const { Title } = Typography;

const AccountDetailsPage = ({
  logout,
  closeDrawer,
  currentUserDetails,
  imgUrl,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    closeDrawer();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const logoutNow = () => {
    setIsModalVisible(false);
    logout();
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Typography>Account Details</Typography>
      <div
        style={{
          marginTop: 100,
          textAlign: "center",
        }}
      >
        <div>
          <Avatar
            src={`${imgUrl}/${currentUserDetails.userProfileImage}`}
            style={{ height: 100, width: 100 }}
          />
        </div>
        <br />
        <div>
          <Title level={5}>
            {currentUserDetails.firstName} {currentUserDetails.lastName}
          </Title>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button shape="round">{currentUserDetails.email}</Button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 100,
          }}
        >
          <Button block type="default" danger onClick={showModal}>
            Logout
          </Button>

          <Button block type="ghost">
            Edit Details
          </Button>
        </div>
      </div>

      <Modal
        style={{ top: 220 }}
        title="Logout"
        visible={isModalVisible}
        okText="Logout"
        onOk={logoutNow}
        onCancel={handleCancel}
      >
        <Typography>Are you sure to logout?</Typography>
      </Modal>
    </Layout>
  );
};

export default AccountDetailsPage;
