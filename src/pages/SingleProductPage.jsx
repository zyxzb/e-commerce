import React, {useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useProductsContext} from '../context/products_context'
import {single_product_url as url} from '../utils/constants'
import {formatPrice} from '../utils/helpers'
import {
    Loading,
    Error,
    ProductImages,
    AddToCart,
    Stars,
    PageHero
} from '../components'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const SingleProductPage = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const {fetchSingleProduct, single_product, single_product_loading, single_product_error} = useProductsContext();
    const {
        name,
        price,
        description,
        stock,
        stars,
        reviews,
        id: sku,
        company,
        images
    } = single_product;

    useEffect(() => {
        fetchSingleProduct(`${url}${id}`);
        console.log(name)
    }, [id])

    useEffect(() => {
        if (single_product_error) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [single_product_error])

    if (single_product_loading) {
        return <Loading/>
    }

    if (single_product_error) {
        return <Error/>
    }

    return (
        <Wrapper>
            <PageHero title={name} product></PageHero>
        </Wrapper>
    )
}

const Wrapper = styled.main `
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage