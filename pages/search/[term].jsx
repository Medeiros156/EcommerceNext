/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Header from '@/components/Header';
import styled from 'styled-components';
import Center from '@/components/Center';
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import ProductsGrid from '@/components/ProductsGrid';
import Title from '@/components/Title';

const StyledSearchContainer = styled.div`
    position: relative;
    display: inline-block;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: left;
`;

const StyledSearchInput = styled.select`
    margin-bottom: 20px;
    border-radius: 10px;
`;

const ClearButton = styled.button`
    margin-bottom: 20px;
    background: none;
    padding: 4px;
    border-radius: 10px;
    border: solid 1px;
    cursor: pointer;
    font-size: 0.7rem;
`;

const NotFoundWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 600px;
    margin: 100px auto;
`
const NotFoundOops = styled.h1`
    flex: 1 1 0%;
    text-align: center;
    margin: 50px;
    font-size: 3rem;
    color: #aaa;
`

const NotFoundText = styled.div`
    flex: 1 1 0%;
    text-align: center;
`
const NotFoundTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
`

export default function SearchPage({ products, categories, term }) {
    console.log(products)
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');

    const filteredProducts = products?.filter((product) =>
        product.category.name.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedProducts = sortProducts(filteredProducts, sort);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };
    const handleFilterTagChange = (e) => {
        setFilter(e);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleClearFilter = () => {
        setSort('');
        setFilter('');
    };

    return (
        <>
            <Header />
            {!products &&
                <NotFoundWrapper>
                    <NotFoundOops>OOPS!</NotFoundOops>
                    <NotFoundTextWrapper>
                        <NotFoundText>Não encontramos resultado para "{term}"</NotFoundText>
                        <img src='/not-found.png'></img>
                        <NotFoundText>Verifique os termos digitados</NotFoundText>
                    </NotFoundTextWrapper>
                </NotFoundWrapper>
            }
            {products &&
                <Center>
                    <Title>Search</Title>
                    <StyledSearchContainer>
                        <StyledSearchInput value={filter} onChange={handleFilterChange}>
                            <option value="">All categories</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </StyledSearchInput>
                        <StyledSearchInput value={sort} onChange={handleSortChange}>
                            <option value="">Sort by</option>
                            <option value="price">Price</option>
                            <option value="category">Category</option>
                        </StyledSearchInput>
                        {(filter || sort) && (
                            <ClearButton onClick={handleClearFilter}>
                                <span>X clear</span>
                            </ClearButton>
                        )}
                    </StyledSearchContainer>
                    <ProductsGrid products={sortedProducts} handleFilterTagChange={handleFilterTagChange} />
                </Center>
            }
        </>
    );
}

function sortProducts(products, sort) {
    if (sort === 'price') {
        return [...products].sort((a, b) => a.price - b.price);
    } else if (sort === 'category') {
        return [...products].sort((a, b) => a.category.name.localeCompare(b.category.name));
    } else {
        return products;
    }
}


export async function getServerSideProps(context) {
    const { term } = context.query;
    console.log(term)

    try {
        await mongooseConnect();


        const products = await Product.find(
            { title: new RegExp(term, "i") },
            null,
            { sort: { _id: -1 } }
        );

        console.log(products)

        if (products.length > 0) {
            const categories = await Category.find({}, null, { sort: { _id: -1 } });
            const productsWithCategories = products.map((product) => {
                const category = categories.find(
                    (category) => category._id.toString() === product.category.toString()
                );
                return {
                    ...product.toObject(),
                    category: category.toObject(),
                };
            });

            return {
                props: {
                    products: JSON.parse(JSON.stringify(productsWithCategories)),
                    categories: JSON.parse(JSON.stringify(categories)),
                },
            };
        } else {
            return {
                props: {
                    term: term
                },
            };
        }
    } catch (error) {
        console.error(error);
        return {
            props: {
                error: 'Failed to fetch categories',
            },
        };
    }
}
