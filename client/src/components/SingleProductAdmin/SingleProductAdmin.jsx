import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Input,
  Form,
  Divider,
  Alert,
  InputNumber,
  Select,
  Modal,
} from "antd";
import {
  TagOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Title } = Typography;
const { Option } = Select;

const SingleProductAdmin = ({
  product,
  imgUrl,
  saveChanges,
  isEditModeActive,
  setEditMode,
  cancelEdit,
  categoryList,
  productSubCategory,
  updateChangeProductCategory,
  errorMessage,
  editButtonLoading,
  deleteProduct,
}) => {
  const [displayImage, setDisplayImage] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [isDeleteProductModalOpened, setIsDeleteProductModalOpened] = useState(
    false
  );

  useEffect(() => {
    setTitle(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setSubCategory(product.subCategory);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

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

  const openModal = () => {
    setIsDeleteProductModalOpened(true);
  };

  const handleCancel = () => {
    setIsDeleteProductModalOpened(false);
  };

  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {isEditModeActive ? (
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="myImage" className="fileInput">
              <img
                className="product-image"
                src={
                  displayImage
                    ? displayImage
                    : `${imgUrl}/${product.productImage}`
                }
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
          </div>
        ) : (
          <Card
            style={{ height: 410, width: 320, marginBottom: 30 }}
            cover={
              <img
                alt="example"
                // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                src={`${imgUrl}/${product.productImage}`}
              />
            }
          />
        )}
        <Col xs={24} lg={8}>
          {isEditModeActive ? (
            <div>
              <Form layout="vertical">
                <Form.Item label="Title">
                  <Input
                    defaultValue={product.name}
                    onChange={(e) => onChangeTitle(e)}
                  />
                </Form.Item>
              </Form>
              <Form layout="vertical">
                <Form.Item label="Description">
                  <Input
                    defaultValue={product.description}
                    onChange={(e) => onChangeDescription(e)}
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
                      defaultValue={parseInt(product.price)}
                      onChange={onChangePrice}
                      style={{
                        fontWeight: "inherit",
                        fontSize: 14,
                      }}
                    />
                  </Input.Group>
                </Col>
              </Row>
            </div>
          ) : (
            <Card>
              <Meta title={product.name} description={product.description} />
              <br />
              <br />
              <Row>
                <Col span={10}>
                  <TagOutlined />
                  <span style={{ marginLeft: 10 }}>Price</span>
                </Col>
                <Col span={14} style={{ textAlign: "right" }}>
                  <Title level={5}>&#8377; {product.price}</Title>
                </Col>
              </Row>
            </Card>
          )}

          {isEditModeActive ? (
            <>
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
                      defaultValue={product.category}
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
                      defaultValue={product.subCategory}
                      style={{ width: "100%" }}
                    >
                      {productSubCategory &&
                        productSubCategory.map((subCategory) => (
                          <Option value={subCategory.name} key={subCategory.id}>
                            {subCategory.name}
                          </Option>
                        ))}
                    </Select>
                  </Input.Group>
                </Col>
              </Row>
            </>
          ) : (
            <Card>
              <Row>
                <Col span={10}>
                  <AppstoreOutlined />
                  <span style={{ marginLeft: 10 }}>Category</span>
                </Col>
                <Col span={14} style={{ textAlign: "right" }}>
                  <Typography style={{ fontSize: 15 }}>
                    {product.category}
                  </Typography>
                </Col>
              </Row>
              <br />
              <Row style={{ marginTop: 8 }}>
                <Col span={16}>
                  <AppstoreOutlined />
                  <span style={{ marginLeft: 10 }}>Sub-Category</span>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <Typography style={{ fontSize: 15 }}>
                    {product.subCategory}
                  </Typography>
                </Col>
              </Row>
            </Card>
          )}
          <Divider />
          {isEditModeActive ? (
            <div>
              {errorMessage ? (
                <Form.Item>
                  <Alert message={errorMessage} type="error" />
                </Form.Item>
              ) : null}
              <Row
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Col span={11}>
                  <Button
                    type="ghost"
                    icon={<EditOutlined />}
                    block
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col span={11} offset={2}>
                  {editButtonLoading ? (
                    <Button type="primary" loading block>
                      Saving Changes..
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={() =>
                        saveChanges(
                          product,
                          product._id,
                          title,
                          description,
                          price,
                          productImage,
                          subCategory
                        )
                      }
                      block
                    >
                      Save
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          ) : (
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Col span={11}>
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  onClick={() => openModal()}
                  danger
                  block
                >
                  Delete
                </Button>
              </Col>
              <Col span={11} offset={2}>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  block
                  onClick={setEditMode}
                >
                  Edit
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Modal
        style={{ top: 220 }}
        title="Delete Product"
        visible={isDeleteProductModalOpened}
        okText="Delete"
        onOk={() => {
          deleteProduct(product, product._id);
          setIsDeleteProductModalOpened(false);
        }}
        onCancel={handleCancel}
      >
        <Typography>Are you sure to delete this product?</Typography>
      </Modal>
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
    </>
  );
};

export default SingleProductAdmin;
