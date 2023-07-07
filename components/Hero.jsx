import Center from "@/components/Center";
import styled from "styled-components";

const Bg = styled.div`
  background-image: url('/gettyimages-1061868580.webp');
  color: #fff;
  padding: 50px 0;
  height: 20vh;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.9rem;
  @media screen and (min-width: 768px) {
    font-size: 5rem;
  }
`;
const Desc = styled.p`
  color: #fafafa;
  font-size: 1.2rem;
`;
const HeroWrapper = styled.div`
  max-width: 70%;
  padding: 20px 0;
  border-radius: 20px;
  margin: 0 auto;
  text-align: center;
  background-color: rgba(250, 250, 250, 0.1); /* Red color with 50% opacity */
  backdrop-filter: blur(10px); /* Adjust the blur amount as needed */
`

export default function Hero() {
  return (
    <Bg>
      <Center>
        <HeroWrapper>
          <Title>Livraria Qwerty</Title>
          <Desc>Bem vindo!</Desc>
        </HeroWrapper>
      </Center>
    </Bg>
  );
}
