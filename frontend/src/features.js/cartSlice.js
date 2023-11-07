import { createSlice} from "@reduxjs/toolkit";

const cartInitialState={
    cart:[],
  }

  const cartSlice=createSlice({
    name:"cart",
    cartInitialState,
    reducers:{
      handleAddToCart:(state,action)=>{
          const cart={
            items:action.payload,
          }
          state.items.push(cart)
      },
    }
  })
  export const {handleAddToCart} = cartSlice.actions
