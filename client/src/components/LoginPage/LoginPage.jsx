import React, { useState } from "react";
import {
  Tabs,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Row,
  Col,
  Alert,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Hidden } from "@material-ui/core";
import noUser from "../../assets/noUser.jpg";

const { TabPane } = Tabs;

const LoginPage = ({
  changeCategory,
  signup,
  login,
  errorMessage,
  loginBtnLoading,
  successMessage,
  changeLoginSignup,
  authenticationPage,
  goToForgotPasswordPage,
  forgotPasswordPageActive,
  sendForgotPasswordLink,
  isSendingLink,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [displayImage, setDisplayImage] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const onImageSelect = (e) => {
    console.log(e.target.files[0]);
    setUserProfileImage(e.target.files[0]);
    if (e.target.files[0]) {
      setDisplayImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <Tabs
        centered
        activeKey={authenticationPage}
        onChange={(e) => changeLoginSignup(e)}
        size="small"
      >
        <TabPane key="Login" tab="Login">
          <Hidden xsDown>
            {forgotPasswordPageActive ? (
              <div
                style={{
                  marginTop: 60,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    onClick={goToForgotPasswordPage}
                    icon={<ArrowLeftOutlined />}
                  />
                  <Typography style={{ marginLeft: 20 }}>
                    Forgot Password?
                  </Typography>
                </div>
                <Form
                  style={{ marginTop: 40 }}
                  layout="vertical"
                  name="basic"
                  initialValues={{ remember: true }}
                >
                  <Form.Item label="Email Address" name="email">
                    <Input
                      placeholder="Email address.."
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    />
                  </Form.Item>
                </Form>
                <Typography
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    fontSize: 13.5,
                    marginBottom: 100,
                  }}
                >
                  A password reset link will be sent to this email address.
                  Please proceed and follow the steps..
                </Typography>
                {errorMessage ? (
                  <Form.Item>
                    <Alert message={errorMessage} type="error" />
                  </Form.Item>
                ) : null}
                <Form.Item>
                  {isSendingLink ? (
                    <Button type="primary" loading block>
                      Sending..
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      block
                      onClick={() =>
                        sendForgotPasswordLink(forgotPasswordEmail)
                      }
                    >
                      Send Link
                    </Button>
                  )}
                </Form.Item>
              </div>
            ) : (
              <Form
                style={{
                  marginTop: 60,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
              >
                {successMessage ? (
                  <Form.Item style={{ marginBottom: 60 }}>
                    <Alert
                      style={{ textAlign: "center" }}
                      message={successMessage}
                      // message={
                      //   <>
                      //     <span>Account created successfully..</span>
                      //     <br />{" "}
                      //     <span style={{ fontStyle: "italic" }}>
                      //       Please login to continue
                      //     </span>
                      //   </>
                      // }
                      type="success"
                    />
                  </Form.Item>
                ) : null}
                <Form.Item label="Email" name="email">
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: 4 }}
                  label="Password"
                  name="password"
                >
                  <Input.Password
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  style={{ marginBottom: 120 }}
                >
                  <Row
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Col>
                      <Checkbox>Remember me</Checkbox>
                    </Col>
                    <Col>
                      <Typography
                        className="forgotPassword"
                        onClick={goToForgotPasswordPage}
                      >
                        Forgot Password?
                      </Typography>
                    </Col>
                  </Row>
                </Form.Item>
                {errorMessage ? (
                  <Form.Item>
                    <Alert message={errorMessage} type="error" />
                  </Form.Item>
                ) : null}

                <Form.Item style={{ marginBottom: 10 }}>
                  {loginBtnLoading ? (
                    <Button type="primary" loading block>
                      Logging in..
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => login(email, password)}
                      block
                    >
                      Login
                    </Button>
                  )}
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  Don't have an account?{" "}
                  <Button
                    type="link"
                    htmlType="reset"
                    className="forgotPassword"
                    onClick={() => {
                      changeLoginSignup("SignUp");
                    }}
                  >
                    SignUp
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Hidden>
          <Hidden smUp>
            {forgotPasswordPageActive ? (
              <div
                style={{
                  marginTop: 30,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    onClick={goToForgotPasswordPage}
                    icon={<ArrowLeftOutlined />}
                  />
                  <Typography style={{ marginLeft: 20 }}>
                    Forgot Password?
                  </Typography>
                </div>
                <Form
                  style={{ marginTop: 40 }}
                  layout="vertical"
                  name="basic"
                  initialValues={{ remember: true }}
                >
                  <Form.Item label="Email Address" name="email">
                    <Input
                      placeholder="Email address.."
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    />
                  </Form.Item>
                </Form>
                <Typography
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    fontSize: 13.5,
                    marginBottom: 100,
                  }}
                >
                  A password reset link will be sent to this email address.
                  Please proceed and follow the steps..
                </Typography>
                {errorMessage ? (
                  <Form.Item>
                    <Alert message={errorMessage} type="error" />
                  </Form.Item>
                ) : null}
                <Form.Item>
                  {isSendingLink ? (
                    <Button type="primary" loading block>
                      Sending..
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      block
                      onClick={() =>
                        sendForgotPasswordLink(forgotPasswordEmail)
                      }
                    >
                      Send Link
                    </Button>
                  )}
                </Form.Item>
              </div>
            ) : (
              <Form
                style={{
                  marginTop: 30,
                }}
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
              >
                {successMessage ? (
                  <Form.Item style={{ marginBottom: 60 }}>
                    <Alert
                      style={{ textAlign: "center" }}
                      message={successMessage}
                      // message={
                      //   <>
                      //     <span>Account created successfully..</span>
                      //     <br />{" "}
                      //     <span style={{ fontStyle: "italic" }}>
                      //       Please login to continue
                      //     </span>
                      //   </>
                      // }
                      type="success"
                    />
                  </Form.Item>
                ) : null}
                <Form.Item label="Email" name="email">
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: 4 }}
                  label="Password"
                  name="password"
                >
                  <Input.Password
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  style={{ marginBottom: 120 }}
                >
                  <Row
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Col>
                      <Checkbox>Remember me</Checkbox>
                    </Col>
                    <Col>
                      <Typography
                        className="forgotPassword"
                        onClick={goToForgotPasswordPage}
                      >
                        Forgot Password?
                      </Typography>
                    </Col>
                  </Row>
                </Form.Item>
                {errorMessage ? (
                  <Form.Item>
                    <Alert message={errorMessage} type="error" />
                  </Form.Item>
                ) : null}

                <Form.Item style={{ marginBottom: 10 }}>
                  {loginBtnLoading ? (
                    <Button type="primary" loading block>
                      Logging in..
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => login(email, password)}
                      block
                    >
                      Login
                    </Button>
                  )}
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  Don't have an account?{" "}
                  <Button
                    type="link"
                    htmlType="reset"
                    className="forgotPassword"
                    onClick={() => {
                      changeLoginSignup("SignUp");
                    }}
                  >
                    SignUp
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Hidden>
        </TabPane>
        <TabPane key="SignUp" tab="SignUp">
          <Hidden xsDown>
            <div>
              <Form
                style={{
                  marginTop: 60,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
              >
                <Row>
                  <Col span={11}>
                    <Form.Item label="First Name" name="firstName">
                      <Input
                        placeholder="First Name"
                        onChange={(e) => setSignUpFirstName(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} offset={1}>
                    <Form.Item label="Last Name" name="lastName">
                      <Input
                        placeholder="Last Name"
                        onChange={(e) => setSignUpLastName(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Email" name="email">
                  <Input
                    placeholder="Email"
                    onChange={(e) => setSignUpEmail(e.target.value)}
                  />
                </Form.Item>
                <Row>
                  <Col span={11}>
                    <Form.Item label="Password" name="password">
                      <Input.Password
                        placeholder="Password"
                        onChange={(e) => setSignUpPassword(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} offset={1}>
                    <Form.Item label="Confirm Password" name="confirmPassword">
                      <Input.Password
                        placeholder="Confirm Password"
                        onChange={(e) =>
                          setSignUpConfirmPassword(e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "30px 0",
                  }}
                >
                  <label htmlFor="myImage">
                    <img
                      className="profile-image"
                      src={displayImage ? displayImage : noUser}
                      alt=""
                    />
                  </label>

                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="myImage"
                    name="myImage"
                    onChange={onImageSelect}
                  />
                </div>
                {errorMessage ? (
                  <Form.Item>
                    <Alert message={errorMessage} type="error" />
                  </Form.Item>
                ) : null}
                <Form.Item style={{ marginTop: 10, marginBottom: 10 }}>
                  {loginBtnLoading ? (
                    <Button type="primary" loading block>
                      Creating Account..
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      onClick={() =>
                        signup(
                          signUpFirstName,
                          signUpLastName,
                          signUpEmail,
                          signUpPassword,
                          signUpConfirmPassword,
                          userProfileImage
                        )
                      }
                    >
                      Sign Up
                    </Button>
                  )}
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                  Already have an account?{" "}
                  <Button
                    type="link"
                    htmlType="reset"
                    className="forgotPassword"
                    onClick={() => {
                      changeLoginSignup("Login");
                    }}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Hidden>
          <Hidden smUp>
            <div>
              <Form
                style={{
                  marginTop: 30,
                }}
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
              >
                <Row>
                  <Col span={11}>
                    <Form.Item label="First Name" name="firstName">
                      <Input
                        placeholder="First Name"
                        onChange={(e) => setSignUpFirstName(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} offset={1}>
                    <Form.Item label="Last Name" name="lastName">
                      <Input
                        placeholder="Last Name"
                        onChange={(e) => setSignUpLastName(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Email" name="email">
                  <Input
                    placeholder="Email"
                    onChange={(e) => setSignUpEmail(e.target.value)}
                  />
                </Form.Item>
                <Row>
                  <Col span={11}>
                    <Form.Item label="Password" name="password">
                      <Input.Password
                        placeholder="Password"
                        onChange={(e) => setSignUpPassword(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} offset={1}>
                    <Form.Item
                      style={{ marginBottom: 30 }}
                      label="Confirm Password"
                      name="confirmPassword"
                    >
                      <Input.Password
                        placeholder="Confirm Password"
                        onChange={(e) =>
                          setSignUpConfirmPassword(e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 30,
                  }}
                >
                  <label htmlFor="myImage">
                    <img
                      className="profile-image"
                      src={displayImage ? displayImage : noUser}
                      alt=""
                    />
                  </label>

                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="myImage"
                    name="myImage"
                    onChange={onImageSelect}
                  />
                </div>
                {errorMessage ? (
                  <Form.Item>
                    <Alert message={errorMessage} type="error" />
                  </Form.Item>
                ) : null}
                <Form.Item style={{ marginTop: 10, marginBottom: 10 }}>
                  {loginBtnLoading ? (
                    <Button type="primary" loading block>
                      Creating Account..
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      onClick={() =>
                        signup(
                          signUpFirstName,
                          signUpLastName,
                          signUpEmail,
                          signUpPassword,
                          signUpConfirmPassword,
                          userProfileImage
                        )
                      }
                    >
                      Sign Up
                    </Button>
                  )}
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                  Already have an account?{" "}
                  <Button
                    type="link"
                    htmlType="reset"
                    className="forgotPassword"
                    onClick={() => {
                      changeLoginSignup("Login");
                    }}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Hidden>
        </TabPane>
      </Tabs>
    </>
  );
};

export default LoginPage;
