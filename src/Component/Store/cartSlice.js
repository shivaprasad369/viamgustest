import { createSlice } from '@reduxjs/toolkit';
const data=JSON.parse(localStorage.getItem('cart'))
// console.log(data.items)
const initialState = {
  items: data ? data?.items : [],
  total: data ? data?.total :0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
        console.log(action.payload)
        const existingItem=state.items.find(item=>item.id===action.payload.id)
        if(!existingItem){
            state.items.push(action.payload);
            
          console.log(action.payload.price)
          state.total += action.payload.price;
          localStorage.setItem('cart', JSON.stringify(state));
      }
      else{
        const data=state.items.filter((data)=>data.id===action.payload.id)
        const data1=state.items.filter((data)=>data.id!==action.payload.id)
        data[0].quantity++;
            data[0].price=data[0].price*data[0].quantity;
            // state.items.push(data[0]);
            data1.push(data[0]);
            state.items=data1;
        state.total += action.payload.price;
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => (item.id) !== (action.payload.id));
      state.total -= action.payload.price;
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex((item) => (item.id) !== (action.payload.id));
      if (index !== -1) {
        state.items[index] = action.payload;
        state.total = state.items.reduce((acc, item) => acc + item.price, 0);
      }
    },
    updateQuantity: (state, action) => {
        const index = state.items.findIndex((item) => (item.id) !== (action.payload.id));
        if (index !== -1) {
          state.items[index].quantity = action.payload.quantity;
          state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        }
      },
      increaseQuantity: (state, action) => {
        console.log(action.payload)
        const existingItem=state.items.find(item=>item.id===action.payload)
        if(existingItem){
            const data=state.items.filter((data)=>data.id===action.payload)
            const data1=state.items.filter((data)=>data.id!==action.payload)
            data[0].price=data[0].price+(data[0].price/data[0].quantity);
            data[0].quantity++;
                // state.items.push(data[0]);
                data1.push(data[0]);
                state.items=data1;
            state.total = state.total+(data[0].price/data[0].quantity);
            localStorage.setItem('cart', JSON.stringify(state));
      }
      
    },
      decreaseQuantity: (state, action) => {
      
            console.log(action.payload)
            const existingItem=state.items.find(item=>item.id===action.payload)
            if(existingItem){
                const data=state.items.filter((data)=>data.id===action.payload)
                const data1=state.items.filter((data)=>data.id!==action.payload)
                if(data[0].quantity<=1){
                    state.items = state.items.filter((item) => (item.id)!== (action.payload));
                    state.total = state.total-(data[0].price/data[0].quantity);
                    localStorage.setItem('cart', JSON.stringify(state));

                }else{
                    data[0].price=data[0].price-(data[0].price/data[0].quantity);
                    data[0].quantity--;
                    // state.items.push(data[0]);
                    data1.push(data[0]);
                    state.items=data1;
                    state.total = state.total-(data[0].price/data[0].quantity);
                    localStorage.setItem('cart', JSON.stringify(state)) ;
                }
               
          }
        }
    
  },
});

export const { addItem, removeItem, updateItem,updateQuantity, increaseQuantity,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;