import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

const CartContext = createContext();
const LocalData = () => {
  let data = localStorage.getItem("cart");

  if (data == []) {
    return [];
  } else {
    return JSON.parse(data);
  }
};
const initialState = {
  cart: LocalData(),
  total_item: "",
  total_amount: "",
};
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product, amt, id) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, amt, id } });
  };
  const removeItem = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContex = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContex };
