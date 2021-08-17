import React, { useState } from "react";
import { Card, Row, Col, Typography, Button } from "antd";
import {
  TagOutlined,
  PlusOutlined,
  MinusOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Title } = Typography;

const SingleProduct = ({ product, imgUrl, addToCart }) => {
  const [productQuantity, setProductQuantity] = useState(1);

  const increaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseQuantity = () => {
    setProductQuantity(productQuantity - 1);
  };
  return (
    <>
      <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Card
          style={{ height: 410, width: 320 }}
          cover={
            <img
              alt="example"
              // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              src={`${imgUrl}/${product.productImage}`}
            />
          }
        />
        <Col xs={24} lg={8}>
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
            <br />
            <Row>
              <Col span={10}>
                <AppstoreOutlined />
                <span style={{ marginLeft: 10 }}>Quantity</span>
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col span={8}>
                <Button
                  disabled={productQuantity === 1}
                  icon={<MinusOutlined key="decrease" />}
                  onClick={decreaseQuantity}
                  size="middle"
                />
              </Col>
              <Col
                span={8}
                style={{
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                <Typography>{productQuantity}</Typography>
              </Col>
              <Col span={8} style={{ textAlign: "end" }}>
                <Button
                  icon={<PlusOutlined key="increase" />}
                  onClick={increaseQuantity}
                ></Button>
              </Col>
            </Row>
          </Card>
          <Card>
            <Row style={{ alignItems: "center" }}>
              <Col span={12}>
                <Title style={{ fontSize: 16 }}>Total:</Title>
              </Col>
              <Col span={12} style={{ textAlign: "end" }}>
                <Title level={4}>
                  &#8377;{" "}
                  {`${parseInt(product.price) * parseInt(productQuantity)}`}
                </Title>
              </Col>

              <Button
                style={{ marginTop: 20 }}
                type="primary"
                block
                onClick={() => addToCart(product, productQuantity)}
              >
                Add To Cart
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
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

export default SingleProduct;
