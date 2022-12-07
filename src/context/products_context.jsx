import React, {useContext, useEffect, useReducer} from 'react'
import axios from 'axios'
import products_reducer from '../reducers/products_reducer'
import {products_url as url} from '../utils/constants'
import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR
} from '../actions'

const initialState = {
    isSidebarOpen: false,
    products_loading: false,
    products_error: false,
    products: [],
    featured_products: [],
    // Single Product
    single_product_loading: false,
    single_product_error: false,
    single_product: []
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({children}) => {
    const [state, dispatch] = useReducer(products_reducer, initialState)

    // The sidebar logic is here to not create another context
    const openSidebar = () => {
        dispatch({type: SIDEBAR_OPEN})
    }
    const closeSidebar = () => {
        dispatch({type: SIDEBAR_CLOSE})
    }

    // Products
    const fetchProducts = async(url) => {
        dispatch({type: GET_PRODUCTS_BEGIN})
        try {
            const resposne = await axios.get(url)
            const products = resposne.data
            dispatch({type: GET_PRODUCTS_SUCCESS, payload: products})
        } catch (err) {
            dispatch({type: GET_PRODUCTS_ERROR})
            console.log(err);
        }
    }

    // Single Product
    const fetchSingleProduct = async(url) => {
        dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
        try {
            const resposne = await axios.get(url)
            const singleProducts = resposne.data
            dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProducts})
        } catch (err) {
            dispatch({type: GET_SINGLE_PRODUCT_ERROR})

            console.log(err);
        }
    }

    useEffect(() => {
        fetchProducts(url)
    }, [])

    return (
        <ProductsContext.Provider
            value={{
            ...state,
            openSidebar,
            closeSidebar,
            fetchSingleProduct
        }}>
            {children}
        </ProductsContext.Provider>
    )
}
// make sure use
export const useProductsContext = () => {
    return useContext(ProductsContext)
}
