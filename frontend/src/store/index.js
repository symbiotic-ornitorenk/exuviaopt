import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Slice dosyanın yolu doğru olmalı
import digimonReducer from "./DigimonSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        digimons: digimonReducer,
    },
});