import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basket'; // Importing the basket slice reducer

// Creating and exporting the store
export const store = configureStore({
    reducer: {
        basket: basketReducer, // Registering the basket reducer
    },
});
