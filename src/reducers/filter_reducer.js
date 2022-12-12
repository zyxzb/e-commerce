import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map(item => item.price);
    maxPrice = Math.max(...maxPrice)
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice
      }
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    }
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    }
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload
    }
  }
  if (action.type === SORT_PRODUCTS) {
    const {
      sort,
      filtered_products
    } = state;
    let tempProducts = [...filtered_products];

    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.price - b.price
      })
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.price - a.price
      })
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)

        // another way to sort values:

        // if(a.name < b.name){
        //   return -1
        // } 
        // if(a.name > b.name){
        //   return 1
        // } 
        // return 0

      })
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return {
      ...state,
      filtered_products: tempProducts,
    }
  }

  // start of the filter code

  if (action.type === UPDATE_FILTERS) {
    const {
      name,
      value
    } = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value
      }
    }
  }

  if (action.type === FILTER_PRODUCTS) {
    console.log('Filter works')
    return {
      ...state
    }
  }

  if (action.type === CLEAR_FILTERS) {
    console.log('Clear works')
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        category: 'all',
        company: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false
      }
    }
  }

  // end of the filter code

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer