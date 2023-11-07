import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  totalItems:0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleAddToCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].cartQuantity += 1;
        toast.info(`increased ${state.cart[itemIndex].name} cart quantity`, {
          position: "bottom-right",
        });
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
          isAdded: true,
        };
        state.cart.push(tempProduct);
        toast.success(`${action.payload.name} added to Cart`, {
          position: "bottom-right",
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cart = nextCartItems;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-right",
      });
    },
    decreaseCart(state, action) {
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.cart[itemIndex].cartQuantity > 1) {
        state.cart[itemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${action.payload.name} cart quantity `, {
          position: "bottom-right",
        });
      } else if (state.cart[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cart.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cart = nextCartItems;
        toast.error(`${action.payload.name} removed from cart`, {
          position: "bottom-right",
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    increaseCart(state, action) {
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      state.cart[itemIndex].cartQuantity += 1;
      toast.info(`Increased ${action.payload.name} cart quantity `, {
        position: "bottom-right",
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart(state,action)
    {
      state.cart=[];
      toast.error(`Removed all items from cart`, {
        position: "bottom-right",
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    getTotals(state,action){
      let {total,quantity}=state.cart.reduce(
        (cartTotal,item)=>{
          const {priceInt,cartQuantity}=item;
          const itemTotal=priceInt*cartQuantity;
          cartTotal.total+=itemTotal;
          cartTotal.quantity+=cartQuantity;

          return cartTotal;
        },
        {
          total:0,
          quantity:0,
        }
      )
      state.cartTotalQuantity=quantity;
      state.cartTotalAmount=total;
    },
  },
});
export const { handleAddToCart, removeFromCart, decreaseCart, increaseCart ,getTotals,clearCart} =cartSlice.actions;
export default cartSlice.reducer;
