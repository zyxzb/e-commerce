import React, {useEffect, useContext, useReducer} from 'react'
import filter_reducer from '../reducers/filter_reducer'
import {
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS
} from '../actions'
import {useProductsContext} from './products_context'

const initialState = {
    // two arrays in case of reset filters
    all_products: [],
    filtered_products: [],
    grid_view: true,
    sort: 'price-lowest'
}

const FilterContext = React.createContext()

export const FilterProvider = ({children}) => {
    const {products} = useProductsContext();
    const [state, dispatch] = useReducer(filter_reducer, initialState)

    // set all_products and filtered_products to the same values

    useEffect(() => {
        dispatch({type: LOAD_PRODUCTS, payload: products})
    }, [products])

    // start of the sort code

    useEffect(() => {
        dispatch({type: SORT_PRODUCTS})
    }, [products, state.sort])

    const updateSort = (e) => {
        const value = e.target.value
        dispatch({type: UPDATE_SORT, payload: value})
    }

    // end of the sort code

    const setGridView = () => {
        dispatch({type: SET_GRIDVIEW})
    }
    const setListView = () => {
        dispatch({type: SET_LISTVIEW})
    }

    //end of context logic

    return (
        <FilterContext.Provider
            value={{
            ...state,
            setGridView,
            setListView,
            updateSort
        }}>
            {children}
        </FilterContext.Provider>
    )
}
// make sure use
export const useFilterContext = () => {
    return useContext(FilterContext)
}
