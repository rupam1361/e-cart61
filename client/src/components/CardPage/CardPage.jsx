import React from "react";
import { Card, Typography } from "antd";

const { Meta } = Card;

const CardPage = ({ product, imgUrl, goToSingleProduct }) => {
  return (
    <>
      <Card
        onClick={() => goToSingleProduct(product)}
        hoverable
        cover={
          <img
            alt="example"
            // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            src={`${imgUrl}/${product.productImage}`}
          />
        }
      >
        <Meta
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>{product.name}</Typography>
              <Typography
                style={{
                  fontWeight: 400,
                  color: "rgb(100, 100, 100)",
                }}
              >
                &#8377; {product.price}
              </Typography>
            </div>
          }
          description={product.description}
        />
      </Card>
    </>
  );
};

export default CardPage;
