import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const Bg = styled.div`
  background-color: #eee;
  color: #555;
  padding: 40px 0;
`;
const Title = styled.h1`
  margin: 0;
  color: #fafafa;
  font-weight: normal;
  font-size: 1.2rem;
  @media screen and (min-width: 768px) {
    font-size: 1.9rem;
  }
`;
const Desc = styled.p`
  max-width: 80%;
  color: #fafafa;
  font-size: 1.3rem;
  text-align:center;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SectionTitle = styled.h2`
font-size: 2rem;
margin: 30px 0;
font-weight: normal;
text-align: center;
`


const ColumnsWrapper = styled.div`
  background-color: #5b3434;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    
    padding: 40px 280px;
  }
  
  `;
const Column = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  img {
    margin: 0 auto;
    max-width: 90%;
    max-height: 90%;
  }
  @media screen and (min-width: 768px) {
    
    img {
      max-width: 100%;
    }
  }

`;

const ProductWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  
  @media screen and (max-width: 768px) {
    
    button {
      display: flex;
      flex-direction: column;
    }
  }
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      {/* <Center> */}
      <SectionTitle>Destaque da Semana</SectionTitle>
      <ColumnsWrapper>
        <Column>
          <ProductWrapper>
            <Title>{product.title}</Title>
            <Desc>{product.description}</Desc>
            <ButtonsWrapper>
              <ButtonLink
                href={"/product/" + product._id}
                outline={1}
                black={1}
              >
                Read more
              </ButtonLink>
              <Button black onClick={addFeaturedToCart}>
                <CartIcon />
                Add to cart
              </Button>
            </ButtonsWrapper>
          </ProductWrapper>
        </Column>
        <Column>
          <img src={product.images?.[0] ?? ""} alt="" />
        </Column>
      </ColumnsWrapper>
      {/* </Center> */}
    </Bg>
  );
}
