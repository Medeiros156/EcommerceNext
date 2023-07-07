import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #5b3434;
  padding: 20px;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #ddd;
`;

const Address = styled.p`
  font-size: 14px;
  color: #ddd;
  margin-top: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SectionContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SectionItem = styled.div`
  margin: 5px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <SectionTitle>Informações de contato</SectionTitle>
            <SectionContent>
                <SectionItem>
                    <FooterText>Funcionamento: seg - sex | 10h - 19h</FooterText>
                </SectionItem>
                <SectionItem>
                    <FooterText>Telephone: +1234567890</FooterText>
                </SectionItem>
                <SectionItem>
                    <FooterText>Email: livrariaqwerty@email.com</FooterText>
                </SectionItem>
            </SectionContent>

            <SectionTitle>Address</SectionTitle>
            <Address>Av Paulista 123, Sao Paulo, Brasuk</Address>

            <FooterText>&copy; 2023 Livaria Qwerty. All rights reserved.</FooterText>
        </FooterContainer>
    );
};

export default Footer;
