import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Layout, Row, Col, Spin, Breadcrumb, Radio } from "antd";
import { Hidden, Fab } from "@material-ui/core";
import { PlusOutlined } from "@ant-design/icons";

import CardPage from "../CardPage/CardPage";
import SingleProduct from "../SingleProduct/SingleProduct";
import SingleProductAdmin from "../SingleProductAdmin/SingleProductAdmin";
import AddProduct from "../AddProduct/AddProduct";

const { Content } = Layout;

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(6),
    right: theme.spacing(12),
  },
  fabMobile: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(2),
  },
}));

const BasePage = ({
  token,
  currentUserDetails,
  allProducts,
  imgUrl,
  changeCategory,
  productCategories,
  goToSingleProduct,
  secondBreadcrum,
  selectedProduct,
  isSingleProductPageActive,
  isPageLoading,
  addToCart,
  setEditMode,
  isEditModeActive,
  cancelEdit,
  categoryList,
  productSubCategory,
  saveChanges,
  updateChangeProductCategory,
  addProduct,
  errorMessage,
  addButtonLoading,
  editButtonLoading,
  deleteProduct,
}) => {
  const classes = useStyles();

  return (
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
          <Radio.Group
            defaultValue={secondBreadcrum}
            onChange={(e) => changeCategory(e.target.value)}
          >
            {productCategories.map((category) => (
              <Radio.Button key={category.id} value={category.title}>
                {category.title}
              </Radio.Button>
            ))}
          </Radio.Group>
          <br />
          <br />
          <Breadcrumb style={{ marginBottom: 16 }}>
            <Breadcrumb.Item
              onClick={(e) => changeCategory(e.target.outerText)}
              className="breadCrum"
            >
              Home
            </Breadcrumb.Item>
            {secondBreadcrum !== "Home" ? (
              <Breadcrumb.Item
                className="breadCrum"
                onClick={(e) => changeCategory(e.target.outerText)}
              >
                {secondBreadcrum}
              </Breadcrumb.Item>
            ) : null}
            <Breadcrumb.Item className="breadCrum">
              {selectedProduct}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 420 }}
          >
            <Row style={{ position: "relative" }} gutter={[24, 24]}>
              {!isPageLoading ? (
                secondBreadcrum === "Add Product" ? (
                  <AddProduct
                    categoryList={categoryList}
                    productSubCategory={productSubCategory}
                    updateChangeProductCategory={updateChangeProductCategory}
                    addProduct={addProduct}
                    errorMessage={errorMessage}
                    addButtonLoading={addButtonLoading}
                  />
                ) : (
                  allProducts
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .map((product) => (
                      <Fragment key={product._id}>
                        {!isSingleProductPageActive ? (
                          <Col className="gutter-row" span={6} xs={24} lg={6}>
                            <CardPage
                              product={product}
                              imgUrl={imgUrl}
                              goToSingleProduct={goToSingleProduct}
                            />
                          </Col>
                        ) : (
                          <Col className="gutter-row" span={24}>
                            {token ? (
                              currentUserDetails.role === "Admin" ? (
                                <SingleProductAdmin
                                  product={product}
                                  imgUrl={imgUrl}
                                  isEditModeActive={isEditModeActive}
                                  setEditMode={setEditMode}
                                  cancelEdit={cancelEdit}
                                  saveChanges={saveChanges}
                                  categoryList={categoryList}
                                  productSubCategory={productSubCategory}
                                  updateChangeProductCategory={
                                    updateChangeProductCategory
                                  }
                                  errorMessage={errorMessage}
                                  editButtonLoading={editButtonLoading}
                                  deleteProduct={deleteProduct}
                                />
                              ) : (
                                <SingleProduct
                                  product={product}
                                  imgUrl={imgUrl}
                                  addToCart={addToCart}
                                />
                              )
                            ) : (
                              <SingleProduct
                                product={product}
                                imgUrl={imgUrl}
                                addToCart={addToCart}
                              />
                            )}
                          </Col>
                        )}
                      </Fragment>
                    ))
                )
              ) : (
                <Col span={24} className="spin">
                  <Spin tip="Loading..." size="large" />
                </Col>
              )}
            </Row>
          </div>
          {/* <Tabs
            defaultActiveKey="1"
            size="small"
            style={{ marginBottom: 32 }}
            onChange={(e) => changeCategory(e)}
          >
            {productCategories.map((category) => (
              <TabPane tab={category.title} key={category.title}>
                <Breadcrumb style={{ marginBottom: 16 }}>
                  <Breadcrumb.Item className="breadCrum">Home</Breadcrumb.Item>
                  <Breadcrumb.Item
                    className="breadCrum"
                    onClick={(e) => changeCategory(e.target.outerText)}
                  >
                    {secondBreadcrum}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className="breadCrum">
                    {selectedProduct}
                  </Breadcrumb.Item>
                </Breadcrumb>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 420 }}
                >
                  <Row style={{ position: "relative" }} gutter={[24, 24]}>
                    {!isPageLoading ? (
                      allProducts
                        // .sort((a, b) => b.createdAt - a.createdAt)
                        .map((product) => (
                          <Fragment key={product._id}>
                            {!isSingleProductPageActive ? (
                              <Col
                                className="gutter-row"
                                span={6}
                                xs={24}
                                lg={6}
                              >
                                <CardPage
                                  product={product}
                                  imgUrl={imgUrl}
                                  goToSingleProduct={goToSingleProduct}
                                />
                              </Col>
                            ) : (
                              <Col className="gutter-row" span={24}>
                                {token ? (
                                  currentUserDetails.role === "Admin" ? (
                                    <SingleProductAdmin
                                      product={product}
                                      imgUrl={imgUrl}
                                      isEditModeActive={isEditModeActive}
                                      setEditMode={setEditMode}
                                      cancelEdit={cancelEdit}
                                      saveChanges={saveChanges}
                                      categoryList={categoryList}
                                      productSubCategory={productSubCategory}
                                      updateChangeProductCategory={
                                        updateChangeProductCategory
                                      }
                                    />
                                  ) : (
                                    <SingleProduct
                                      product={product}
                                      imgUrl={imgUrl}
                                      addToCart={addToCart}
                                    />
                                  )
                                ) : (
                                  <SingleProduct
                                    product={product}
                                    imgUrl={imgUrl}
                                    addToCart={addToCart}
                                  />
                                )}
                              </Col>
                            )}
                          </Fragment>
                        ))
                    ) : (
                      <Col span={24} className="spin">
                        <Spin tip="Loading..." size="large" />
                      </Col>
                    )}
                  </Row>
                </div>
              </TabPane>
            ))}
          </Tabs> */}
          {currentUserDetails.role === "Admin" ? (
            secondBreadcrum !== "Add Product" ? (
              <Fab
                color="primary"
                className={classes.fab}
                aria-label="add"
                size="medium"
                onClick={() => changeCategory("Add Product")}
              >
                <PlusOutlined />
              </Fab>
            ) : null
          ) : null}
        </Content>
      </Hidden>
      <Hidden smUp>
        <Content
          className="site-layout"
          style={{
            padding: "16px 0",
            height: "91.8vh",
            overflowY: "scroll",
            borderWidth: 1,
            borderStyle: "inherit",
          }}
        >
          <div
            style={{
              margin: "0 24px",
            }}
          >
            <Radio.Group onChange={(e) => changeCategory(e.target.value)}>
              {productCategories.map((category) => (
                <Radio.Button key={category.id} value={category.title}>
                  {category.title}
                </Radio.Button>
              ))}
            </Radio.Group>
            <br />
            <br />
            <Breadcrumb style={{ marginBottom: 16 }}>
              <Breadcrumb.Item
                onClick={(e) => changeCategory(e.target.outerText)}
                className="breadCrum"
              >
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadCrum"
                onClick={(e) => changeCategory(e.target.outerText)}
              >
                {secondBreadcrum}
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadCrum">
                {selectedProduct}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 420 }}
          >
            <Row style={{ position: "relative" }} gutter={[24, 24]}>
              {!isPageLoading ? (
                secondBreadcrum === "Add Product" ? (
                  <AddProduct
                    categoryList={categoryList}
                    productSubCategory={productSubCategory}
                    updateChangeProductCategory={updateChangeProductCategory}
                    addProduct={addProduct}
                    errorMessage={errorMessage}
                    addButtonLoading={addButtonLoading}
                  />
                ) : (
                  allProducts
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .map((product) => (
                      <Fragment key={product._id}>
                        {!isSingleProductPageActive ? (
                          <Col className="gutter-row" span={6} xs={24} lg={6}>
                            <CardPage
                              product={product}
                              imgUrl={imgUrl}
                              goToSingleProduct={goToSingleProduct}
                            />
                          </Col>
                        ) : (
                          <Col className="gutter-row" span={24}>
                            {token ? (
                              currentUserDetails.role === "Admin" ? (
                                <SingleProductAdmin
                                  product={product}
                                  imgUrl={imgUrl}
                                  isEditModeActive={isEditModeActive}
                                  setEditMode={setEditMode}
                                  cancelEdit={cancelEdit}
                                  saveChanges={saveChanges}
                                  categoryList={categoryList}
                                  productSubCategory={productSubCategory}
                                  updateChangeProductCategory={
                                    updateChangeProductCategory
                                  }
                                  errorMessage={errorMessage}
                                  editButtonLoading={editButtonLoading}
                                  deleteProduct={deleteProduct}
                                />
                              ) : (
                                <SingleProduct
                                  product={product}
                                  imgUrl={imgUrl}
                                  addToCart={addToCart}
                                />
                              )
                            ) : (
                              <SingleProduct
                                product={product}
                                imgUrl={imgUrl}
                                addToCart={addToCart}
                              />
                            )}
                          </Col>
                        )}
                      </Fragment>
                    ))
                )
              ) : (
                <Col span={24} className="spin">
                  <Spin tip="Loading..." size="large" />
                </Col>
              )}
            </Row>
          </div>
          {/* <Tabs
            defaultActiveKey="1"
            size="small"
            style={{ marginBottom: 32 }}
            onChange={(e) => changeCategory(e)}
          >
            {productCategories.map((category) => (
              <TabPane tab={category.title} key={category.title}>
                <Breadcrumb style={{ marginBottom: 16 }}>
                  <Breadcrumb.Item className="breadCrum">Home</Breadcrumb.Item>
                  <Breadcrumb.Item
                    className="breadCrum"
                    onClick={(e) => changeCategory(e.target.outerText)}
                  >
                    {secondBreadcrum}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className="breadCrum">
                    {selectedProduct}
                  </Breadcrumb.Item>
                </Breadcrumb>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 420 }}
                >
                  <Row style={{ position: "relative" }} gutter={[24, 24]}>
                    {!isPageLoading ? (
                      allProducts
                        // .sort((a, b) => b.createdAt - a.createdAt)
                        .map((product) => (
                          <Fragment key={product._id}>
                            {!isSingleProductPageActive ? (
                              <Col
                                className="gutter-row"
                                span={6}
                                xs={24}
                                lg={6}
                              >
                                <CardPage
                                  product={product}
                                  imgUrl={imgUrl}
                                  goToSingleProduct={goToSingleProduct}
                                />
                              </Col>
                            ) : (
                              <Col className="gutter-row" span={24}>
                                {token ? (
                                  currentUserDetails.role === "Admin" ? (
                                    <SingleProductAdmin
                                      product={product}
                                      imgUrl={imgUrl}
                                      isEditModeActive={isEditModeActive}
                                      setEditMode={setEditMode}
                                      cancelEdit={cancelEdit}
                                      saveChanges={saveChanges}
                                      categoryList={categoryList}
                                      productSubCategory={productSubCategory}
                                      updateChangeProductCategory={
                                        updateChangeProductCategory
                                      }
                                    />
                                  ) : (
                                    <SingleProduct
                                      product={product}
                                      imgUrl={imgUrl}
                                      addToCart={addToCart}
                                    />
                                  )
                                ) : (
                                  <SingleProduct
                                    product={product}
                                    imgUrl={imgUrl}
                                    addToCart={addToCart}
                                  />
                                )}
                              </Col>
                            )}
                          </Fragment>
                        ))
                    ) : (
                      <Col span={24} className="spin">
                        <Spin tip="Loading..." size="large" />
                      </Col>
                    )}
                  </Row>
                </div>
              </TabPane>
            ))}
          </Tabs> */}
          {currentUserDetails.role === "Admin" ? (
            secondBreadcrum !== "Add Product" ? (
              <Fab
                color="primary"
                className={classes.fabMobile}
                aria-label="add"
                size="medium"
                onClick={() => changeCategory("Add Product")}
              >
                <PlusOutlined />
              </Fab>
            ) : null
          ) : null}
        </Content>
      </Hidden>

      {/* <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer> */}
    </Layout>
  );
};

export default BasePage;
