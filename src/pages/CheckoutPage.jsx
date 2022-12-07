import React from 'react'
import styled from 'styled-components'
import {PageHero, StripeCheckout} from '../components'
// extra imports
import {useCartContext} from '../context/cart_context'
import {Link} from 'react-router-dom'

const CheckoutPage = () => {
    return (
        <main>
            <PageHero title='checkout'/>
            <Wrapper className='section section-center'>
                <h1>Checkout</h1>
            </Wrapper>
        </main>
    )
}
const Wrapper = styled.div ``
export default CheckoutPage
