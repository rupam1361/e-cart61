import React from "react";
import { Drawer } from "antd";
import { Hidden } from "@material-ui/core";

import LoginPage from "../LoginPage/LoginPage";
import AccountDetailsPage from "../AccountDetailsPage/AccountDetailsPage";

const DrawerPage = ({
  changeCategory,
  currentUserDetails,
  signup,
  login,
  errorMessage,
  loginBtnLoading,
  drawerVisible,
  closeDrawer,
  successMessage,
  changeLoginSignup,
  authenticationPage,
  logout,
  imgUrl,
  goToForgotPassword,
  forgotPasswordPageActive,
  sendForgotPasswordLink,
  isSendingLink,
}) => {
  return (
    <>
      <Hidden xsDown>
        <Drawer width={500} onClose={closeDrawer} visible={drawerVisible}>
          {localStorage.getItem("access-token") ? (
            <AccountDetailsPage
              logout={logout}
              closeDrawer={closeDrawer}
              currentUserDetails={currentUserDetails}
              imgUrl={imgUrl}
            />
          ) : (
            <LoginPage
              changeCategory={changeCategory}
              signup={signup}
              login={login}
              errorMessage={errorMessage}
              loginBtnLoading={loginBtnLoading}
              successMessage={successMessage}
              changeLoginSignup={changeLoginSignup}
              authenticationPage={authenticationPage}
              goToForgotPasswordPage={goToForgotPassword}
              forgotPasswordPageActive={forgotPasswordPageActive}
              sendForgotPasswordLink={sendForgotPasswordLink}
              isSendingLink={isSendingLink}
            />
          )}
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <Drawer width={360} onClose={closeDrawer} visible={drawerVisible}>
          {localStorage.getItem("access-token") ? (
            <AccountDetailsPage
              logout={logout}
              closeDrawer={closeDrawer}
              currentUserDetails={currentUserDetails}
              imgUrl={imgUrl}
            />
          ) : (
            <LoginPage
              changeCategory={changeCategory}
              signup={signup}
              login={login}
              errorMessage={errorMessage}
              loginBtnLoading={loginBtnLoading}
              successMessage={successMessage}
              changeLoginSignup={changeLoginSignup}
              authenticationPage={authenticationPage}
              goToForgotPasswordPage={goToForgotPassword}
              forgotPasswordPageActive={forgotPasswordPageActive}
              sendForgotPasswordLink={sendForgotPasswordLink}
              isSendingLink={isSendingLink}
            />
          )}
        </Drawer>
      </Hidden>
    </>
  );
};

export default DrawerPage;
