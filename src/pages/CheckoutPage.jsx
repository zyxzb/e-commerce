import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';
// extra imports
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import { CardElement } from '@stripe/react-stripe-js';

const CheckoutPage = () => {
  const { cart } = useCartContext();
  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='section section-center'>
        {cart.length < 1 ? (
          <div className='empty'>
            <h2>Your Cart is Empty</h2>
            <Link to='/products' className='btn'>
              back to products
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
