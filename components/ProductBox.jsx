import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { Category } from "@/models/Category";

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ProductCard = styled(Link)`
  height: 15rem;
  background-color: #fff;
  padding: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  transition: scale 0.2s, box-shadow 0.3s;
  &:hover {
    scale: 1.05;
    box-shadow: 2px 5px 7px rgba(0, 0, 0, 0.5);
  }
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  @media screen and (max-width: 768px) {
    height: 10rem;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1.2rem;
  color: inherit;
  text-decoration: none;
  text-align: center;
  display: block;
  flex-grow: 1;
  `;
// display: -webkit-box;
// -webkit-box-orient: vertical;
// -webkit-line-clamp: 2;
// overflow: hidden;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15px;
  height: 100%;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 20px;
`;

const CategoryTag = styled.div`
  margin-top: 10px;
  font-size: .7rem;
  border: 1px solid;
  padding: 5px;
  cursor: pointer;
  border-radius: 10px;
  display: inline-block;
  width: fit-content;
  &:hover {
    background-color: #f0f0f0;
  }
`
const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;



export default function ProductBox({ _id, title, description, price, images, category, handleFilterTagChange }) {

  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;

  const handleCategoryTagClick = (e) => {
    // Implement your logic to handle the category tag click
    console.log(e.target.innerText)
    handleFilterTagChange(e.target.innerText)
    console.log('Category tag clicked:', category.name);
  };

  return (
    <ProductWrapper>
      <ProductCard href={url}>
        <img src={images?.[0]} alt="" />
      </ProductCard>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        {category.name && (
          <CategoryTag onClick={handleCategoryTagClick}>

            {category.name}
          </CategoryTag>
        )}
        <PriceRow>
          <Price>R$ {price}</Price>
          <Button block onClick={() => addProduct(_id)} primary outline>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
