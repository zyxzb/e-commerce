import React from 'react';
import styled from 'styled-components';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Navbar, Sidebar, Footer} from './components';
import {
    HomePage,
    AboutPage,
    CartPage,
    CheckoutPage,
    ErrorPage,
    ProductsPage,
    SingleProductPage,
    // AuthWrapper, PrivateRoute,
} from './pages/index';

const Wrapper = styled.div `
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

function App() {
    return (
        <Wrapper>
            <BrowserRouter>
                <Navbar/>
                <Sidebar/>
                <Routes>
                    <Route path='/' element={< HomePage />}/>
                    <Route path='/about' element={< AboutPage />}/>
                    <Route path='/cart' element={< CartPage />}/>
                    <Route path='/products' element={< ProductsPage />}/>
                    <Route path='/products/:id' element={< SingleProductPage />}/>
                    <Route path='/checkout' element={< CheckoutPage />}/>
                    <Route path='*' element={< ErrorPage />}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </Wrapper>
    )
}

export default App