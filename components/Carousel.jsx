import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledBannerImage = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 370px;
`;

const PromoDiv = styled.div`
    background-color: black;
    color: white;
    font-size: 1.2rem;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 768px) {
    font-size: .7rem;
  }
`

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, marginLeft: '50px', zIndex: 10 }}
            onClick={onClick}
        >
            {/* <img src="/arrow-left.png" alt="Prev" /> */}
        </div>
    );
};

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, marginRight: '50px', }}
            onClick={onClick}
        >
            {/* <img src="/arrow-left.png" alt="Next" /> */}
        </div>
    );
};
const Carousel = () => {


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <>
            <PromoDiv>ENTREGA EXPRESSA - RECEBA NO MESMO DIA </PromoDiv>
            <Slider {...settings}>
                <div>
                    <StyledBannerImage src="/img1.webp" alt="Image 1" />
                </div>
                <div>
                    <StyledBannerImage src="/img2.webp" alt="Image 2" />
                </div>
                <div>
                    <StyledBannerImage src="/img3.webp" alt="Image 3" />
                </div>
                <div>
                    <StyledBannerImage src="/img4.webp" alt="Image 4" />
                </div>
                <div>
                    <StyledBannerImage src="/img5.webp" alt="Image 5" />
                </div>
            </Slider>
        </>
    );
};

export default Carousel;
