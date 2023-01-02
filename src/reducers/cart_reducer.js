import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT
} from '../actions'

const cart_reducer = (state, action) => {

  // ADD TO CART

  if (action.type === ADD_TO_CART) {
    const {
      id,
      color,
      amount,
      stock,
      product
    } = action.payload

    const tempItem = state
      .cart
      .find((i) => i.id === id + color)

    if (tempItem) {
      const tempCart = state
        .cart
        .map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max
            }
            return {
              ...cartItem,
              amount: newAmount
            }
          } else {
            return cartItem
          }
        })
      return {
        ...state,
        cart: tempCart
      }
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        stock
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          newItem
        ]
      }
    }
  }

  // REMOVE CARD ITEM

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state
      .cart
      .filter((item) => item.id !== action.payload)
    return {
      ...state,
      cart: tempCart
    }
  }

  // CLEAR CARD

  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: []
    }
  }

  // TOGGLE AMOUNT

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const {
      id,
      value
    } = action.payload;
    const tempCart = state
      .cart
      .map((item) => {
        if (item.id === id) {
          if (value === 'inc') {
            let newAmount = item.amount + 1;
            if (newAmount > item.stock) {
              newAmount = item.stock
            }
            return {
              ...item,
              amount: newAmount
            }
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1
            }
            return {
              ...item,
              amount: newAmount
            }
          }
        }
        return item
      })
    return {
      ...state,
      cart: tempCart
    }
  }

  if (action.type === COUNT_CART_TOTALS) {
    const {
      total_items,
      total_amount
    } = state
      .cart
      .reduce((total, cart_item) => {
        const {
          price,
          amount
        } = cart_item

        total.total_items += amount;
        total.total_amount += price * amount;

        return total
      }, {
        total_items: 0,
        total_amount: 0
      })

    return {
      ...state,
      total_items,
      total_amount
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer