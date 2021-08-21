import React, { useState } from "react";
import {
  Typography,
  Layout,
  Card,
  Form,
  Input,
  Button,
  Alert,
  Result,
} from "antd";
import { Hidden } from "@material-ui/core";
import { SmileOutlined } from "@ant-design/icons";

const { Content } = Layout;

const ResetPassword = ({
  resetPassword,
  isPasswordResetSuccess,
  resettingPassword,
  errorMessage,
  openDrawer,
  changeSectionPage,
}) => {
  const resetToken = window.location.href.split("/")[4];
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(resetToken);

  return (
    <Layout>
      <Hidden xsDown>
        <Content
          className="site-layout"
          style={{
            padding: "16px 50px",
            height: "91.2vh",
            overflowY: "scroll",
            borderWidth: 1,
            borderStyle: "inherit",
          }}
        >
          <Typography style={{ marginBottom: 16 }}>Reset Password?</Typography>
          <div>
            {!isPasswordResetSuccess ? (
              <Card
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 40,
                }}
              >
                <Typography style={{ marginBottom: 40, textAlign: "center" }}>
                  Change your Password..
                </Typography>
                <Card style={{ width: 400, alignItems: "center" }}>
                  <Form layout="vertical">
                    <Form.Item label="New Password" name="password">
                      <Input.Password
                        placeholder="New Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword">
                      <Input.Password
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Item>
                  </Form>
                  {errorMessage ? (
                    <Form.Item>
                      <Alert message={errorMessage} type="error" />
                    </Form.Item>
                  ) : null}
                  {resettingPassword ? (
                    <Button type="primary" loading block>
                      Resetting..
                    </Button>
                  ) : (
                    <Button
                      block
                      type="primary"
                      onClick={() =>
                        resetPassword(password, confirmPassword, resetToken)
                      }
                    >
                      Reset
                    </Button>
                  )}
                </Card>
              </Card>
            ) : (
              <Card>
                <Typography style={{ fontSize: 18, textAlign: "center" }}>
                  Congratulations..
                </Typography>
                <Result
                  icon={<SmileOutlined />}
                  title={
                    <Typography style={{ fontSize: 18 }}>
                      We have successfull changed your password!!
                    </Typography>
                  }
                  extra={
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        type="default"
                        onClick={() => changeSectionPage("Home")}
                      >
                        Home
                      </Button>
                      <Button
                        type="primary"
                        onClick={openDrawer}
                        style={{ marginLeft: 40 }}
                      >
                        Login
                      </Button>
                    </div>
                  }
                />
              </Card>
            )}
          </div>
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
          <div
            style={{
              margin: "0 20px",
            }}
          >
            <Typography style={{ marginBottom: 16 }}>
              Reset Password?
            </Typography>
            {!isPasswordResetSuccess ? (
              <Card
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 0,
                }}
              >
                <Typography
                  style={{
                    marginBottom: 30,
                    textAlign: "center",
                  }}
                >
                  Change your Password..
                </Typography>
                <div
                  style={{
                    width: 280,
                    alignItems: "center",
                    marginBottom: 40,
                  }}
                >
                  <Form layout="vertical" style={{ marginBottom: 20 }}>
                    <Form.Item label="New Password" name="password">
                      <Input.Password
                        placeholder="New Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword">
                      <Input.Password
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Item>
                  </Form>
                  {errorMessage ? (
                    <Form.Item>
                      <Alert message={errorMessage} type="error" />
                    </Form.Item>
                  ) : null}
                  {resettingPassword ? (
                    <Button type="primary" loading block>
                      Resetting..
                    </Button>
                  ) : (
                    <Button
                      block
                      type="primary"
                      onClick={() =>
                        resetPassword(password, confirmPassword, resetToken)
                      }
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </Card>
            ) : (
              <Card>
                <Typography style={{ fontSize: 18, textAlign: "center" }}>
                  Congratulations..
                </Typography>
                <Result
                  icon={<SmileOutlined />}
                  title={
                    <Typography style={{ fontSize: 16 }}>
                      We have successfull changed your password!!
                    </Typography>
                  }
                  extra={
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        type="default"
                        onClick={() => changeSectionPage("Home")}
                      >
                        Home
                      </Button>
                      <Button
                        type="primary"
                        onClick={openDrawer}
                        style={{ marginLeft: 40 }}
                      >
                        Login
                      </Button>
                    </div>
                  }
                />
              </Card>
            )}
          </div>
        </Content>
      </Hidden>
    </Layout>
  );
};

export default ResetPassword;
