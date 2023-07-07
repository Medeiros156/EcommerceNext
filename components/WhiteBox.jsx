import styled from "styled-components";

const WhiteBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  transition: scale 0.3s, box-shadow 0.3s;
  &:hover {
    scale: 1.01;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
  }
`;

export default WhiteBox;