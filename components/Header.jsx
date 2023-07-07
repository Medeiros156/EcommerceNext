import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
  background-color: #5b3434;
`;
const Logo = styled(Link)`
  color: #fafafa;
  text-decoration: none;
  position: relative;
  font-size: 1.8rem;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
      background-color: #fafafa;
      border-radius: 0 0 0 10px;
      display: block;
      z-index: 2;
      `
      : `
      display: none;
  `}
  @media screen and (max-width: 768px) {
    &.active {
      transition: all 0.5s ease-in-out;
      opacity: 0;
      transform: translateY(-20px);
  
      &.visible {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  gap: 15px;
  margin: auto 0;
  position: fixed;
  top: 0;
  right: 0;
  padding: 70px 20px 20px;
  img {
    width: 20px;
    height: 20px;
  }
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;

  color: #020202;
  text-decoration: none;
  padding: 10px 0;
  
  @media screen and (min-width: 768px) {
    padding: 0;
    &:nth-last-child(-n+2) {
    margin-left: 30px;
  }
  }
`;
const NavButton = styled.button`
    background-color: #ccc;
  width: 30px;
  height: 30px;
  border: 0;
  color: black;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SearchBox = styled.div`
  @media screen and (max-width: 768px) {
    display:none
  }
  width: 30%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 8px;
  font-size: 1rem;
  background-color: #fff;
  input {
    flex: 1;
    border: none;
    outline: none;
  }
  img {
    width: 18px;
    margin-left: 8px;
    color: #999;
    cursor: pointer;
  }
  ::placeholder {
    color: #ccc;
  }
`;



export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(false);


  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();


  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setMobileNavActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleKeySearch = (e) => {
    if (searchTerm && e.key === 'Enter') {
      router.push(`/search/${encodeURIComponent(searchTerm)}`);
      setSearchTerm('')
    }
  };
  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/search/${encodeURIComponent(searchTerm)}`);
      setSearchTerm('')
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleMobileNav = () => {
    setMobileNavActive((prev) => !prev);
    setTimeout(() => {
      setMobileNavVisible((prev) => !prev);
    }, 10);
  };

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Livraria Qwerty</Logo>
          <SearchBox>
            <input type="text" placeholder="O que voce esta buscando?" value={searchTerm}
              onChange={handleInputChange} onKeyDown={handleKeySearch} />
            <img src="/search.png" alt='search' onClick={handleSearch} />
          </SearchBox>

          <StyledNav className={`active ${mobileNavVisible ? 'visible' : ''}`} mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            {/* <NavLink href={"/products"}>Categories</NavLink> */}
            {/* <NavLink href={"/account"}>Account</NavLink> */}
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
            <img src="/icons8-carrinho-de-compras-30.png" alt='cart' />
          </StyledNav>
          <NavButton onClick={toggleMobileNav}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
