import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import { useState } from "react";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 50px 0;
  gap: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({ products, handleFilterTagChange }) {
  const [filter, setFilter] = useState('');


  console.log('products', products)
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox key={product._id} {...product} handleFilterTagChange={handleFilterTagChange} />
        ))}
    </StyledProductsGrid>
  );
}
