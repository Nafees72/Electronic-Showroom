import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    baskets: localStorage.getItem('products')?JSON.parse(localStorage.getItem('products')):[]
};

const Storage = (products)=>{
    localStorage.setItem('products' , JSON.stringify(products.length>0 ? products:[]));
}
 
export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addInBasket: (state, action) => {
            // Correctly updating state without mutation
            let check = true;
            state.baskets.forEach((e)=>{
                if(e.product.cid===action.payload.cid){
                    check = false;
                }
            })
            if(check){
                state.baskets.push({ product: action.payload });
            Storage(state.baskets);
            }
           
        },
        removeInBasket: (state, action) => {
            state.baskets = state.baskets.filter(
                (p) => p.product.id !== action.payload
            );
            Storage(state.baskets);
        },
    },
});

export const { addInBasket, removeInBasket } = basketSlice.actions;
export default basketSlice.reducer;
