import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Input,
  Form,
  Divider,
  InputNumber,
  Select,
  Layout,
  Alert,
} from "antd";
import { TagOutlined, SaveOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Hidden } from "@material-ui/core";
import noImage from "../../assets/no-image.jpg";

const { Option } = Select;

const AddProduct = ({
  categoryList,
  productSubCategory,
  updateChangeProductCategory,
  addProduct,
  errorMessage,
  addButtonLoading,
}) => {
  const [displayImage, setDisplayImage] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productImage, setProductImage] = useState(null);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  console.log(errorMessage);

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangePrice = (e) => {
    setPrice(e);
  };

  const onChangeSubCategory = (e) => {
    console.log(e);
    setSubCategory(e);
  };

  const onImageSelect = (e) => {
    console.log(e.target.files[0]);
    setProductImage(e.target.files[0]);
    if (e.target.files[0]) {
      setDisplayImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Layout>
      <Hidden xsDown>
        <div className="site-layout-background">
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            <label htmlFor="myImage" className="fileInput">
              <img
                className="product-image"
                src={displayImage ? displayImage : noImage}
                alt=""
                style={{ height: 420, width: 310 }}
              />
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="myImage"
              name="myImage"
              onChange={onImageSelect}
            />
            {/* <Card> */}
            <Col lg={8}>
              <div>
                <Form layout="vertical">
                  <Form.Item label="Title">
                    <Input
                      defaultValue=""
                      onChange={(e) => onChangeTitle(e)}
                      placeholder="Product Title"
                    />
                  </Form.Item>
                </Form>
                <Form layout="vertical">
                  <Form.Item label="Description">
                    <Input
                      defaultValue=""
                      onChange={(e) => onChangeDescription(e)}
                      placeholder="Product Description"
                      style={{
                        fontWeight: "inherit",
                        fontSize: 14,
                      }}
                    />
                  </Form.Item>
                </Form>
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={16}>
                    <TagOutlined />
                    <span style={{ marginLeft: 10 }}>Price</span>
                  </Col>

                  <Col span={8}>
                    <Input.Group
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>&#8377; </Typography>
                      <InputNumber
                        defaultValue=""
                        placeholder="Amount"
                        onChange={onChangePrice}
                        style={{
                          fontWeight: "inherit",
                          fontSize: 14,
                        }}
                      />
                    </Input.Group>
                  </Col>
                </Row>
                <Divider />

                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={14}>
                    <AppstoreOutlined />
                    <span style={{ marginLeft: 10 }}>Category</span>
                  </Col>
                  <Col span={10}>
                    <Input.Group>
                      <Select
                        onChange={updateChangeProductCategory}
                        defaultValue=""
                        style={{ width: "100%" }}
                      >
                        {categoryList.map((category) => (
                          <Option value={category.name} key={category.id}>
                            {category.name}
                          </Option>
                        ))}
                      </Select>
                    </Input.Group>
                  </Col>
                </Row>
                <br />
                <Row
                  style={{
                    marginTop: 8,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Col span={14}>
                    <AppstoreOutlined />
                    <span style={{ marginLeft: 10 }}>Sub-Category</span>
                  </Col>
                  <Col span={10}>
                    <Input.Group compact>
                      <Select
                        onChange={(e) => onChangeSubCategory(e)}
                        defaultValue=""
                        style={{ width: "100%" }}
                      >
                        {productSubCategory.map((subCategory) => (
                          <Option value={subCategory.name} key={subCategory.id}>
                            {subCategory.name}
                          </Option>
                        ))}
                      </Select>
                    </Input.Group>
                  </Col>
                </Row>

                <Divider />
                {errorMessage ? (
                  <Form.Item>
                    <Alert message={errorMessage} type="error" />
                  </Form.Item>
                ) : null}

                {addButtonLoading ? (
                  <Button type="primary" loading block>
                    Adding Product..
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={() =>
                      addProduct(
                        title,
                        description,
                        price,
                        subCategory,
                        productImage
                      )
                    }
                    block
                  >
                    Add Product
                  </Button>
                )}
              </div>
            </Col>
            {/* </Card> */}
          </Row>
        </div>
      </Hidden>
      <Hidden smUp>
        <div className="site-layout-background">
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            <label htmlFor="myImage" className="fileInput">
              <img
                className="product-image"
                src={displayImage ? displayImage : noImage}
                alt=""
                style={{ height: 420, width: 310 }}
              />
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="myImage"
              name="myImage"
              onChange={onImageSelect}
            />
            <Card style={{ width: 310, marginTop: 20 }}>
              <Col xs={24} lg={8}>
                <Form layout="vertical">
                  <Form.Item label="Title">
                    <Input
                      defaultValue=""
                      onChange={(e) => onChangeTitle(e)}
                      placeholder="Product Title"
                    />
                  </Form.Item>
                </Form>
                <Form layout="vertical">
                  <Form.Item label="Description">
                    <Input
                      defaultValue=""
                      placeholder="Product Description"
                      onChange={(e) => onChangeDescription(e)}
                      style={{
                        fontWeight: "inherit",
                        fontSize: 14,
                      }}
                    />
                  </Form.Item>
                </Form>
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={14}>
                    <TagOutlined />
                    <span style={{ marginLeft: 10 }}>Price</span>
                  </Col>

                  <Col span={10}>
                    <Input.Group
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>&#8377; </Typography>
                      <InputNumber
                        defaultValue=""
                        placeholder="Amount"
                        onChange={onChangePrice}
                        style={{
                          fontWeight: "inherit",
                          fontSize: 14,
                        }}
                      />
                    </Input.Group>
                  </Col>
                </Row>
                <Divider />

                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={12}>
                    <AppstoreOutlined />
                    <span style={{ marginLeft: 10 }}>Category</span>
                  </Col>
                  <Col span={12}>
                    <Input.Group>
                      <Select
                        onChange={updateChangeProductCategory}
                        defaultValue=""
                        style={{ width: "100%" }}
                      >
                        {categoryList.map((category) => (
                          <Option value={category.name} key={category.id}>
                            {category.name}
                          </Option>
                        ))}
                      </Select>
                    </Input.Group>
                  </Col>
                </Row>
                <br />
                <Row
                  style={{
                    marginTop: 8,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Col span={12}>
                    <AppstoreOutlined />
                    <span style={{ marginLeft: 10 }}>Sub-Category</span>
                  </Col>
                  <Col span={12}>
                    <Input.Group compact>
                      <Select
                        onChange={(e) => onChangeSubCategory(e)}
                        defaultValue=""
                        style={{ width: "100%" }}
                      >
                        {productSubCategory.map((subCategory) => (
                          <Option value={subCategory.name} key={subCategory.id}>
                            {subCategory.name}
                          </Option>
                        ))}
                      </Select>
                    </Input.Group>
                  </Col>
                </Row>

                <Divider />
                {errorMessage ? (
                  <Form.Item>
                    <Alert message={errorMessage} type="error" />
                  </Form.Item>
                ) : null}
                {addButtonLoading ? (
                  <Button type="primary" loading block>
                    Adding Product..
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={() =>
                      addProduct(
                        title,
                        description,
                        price,
                        subCategory,
                        productImage
                      )
                    }
                    block
                  >
                    Add Product
                  </Button>
                )}
              </Col>
            </Card>
          </Row>
        </div>
      </Hidden>

      {/* <Card
        hoverable
        style={{ borderRadius: 10 }}
        cover={
          <img
            alt="example"
            style={{ borderRadius: 10 }}
            style={{ height: 400 }}
            // src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            src={`${imgUrl}/${product.productImage}`}
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card> */}
    </Layout>
  );
};

export default AddProduct;
