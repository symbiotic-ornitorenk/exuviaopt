import { createSlice } from '@reduxjs/toolkit';

const digimonSlice = createSlice({
    name: 'digimons',
    initialState: {
        searchTerm: '',
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
});

export const { setSearchTerm } = digimonSlice.actions;
export default digimonSlice.reducer;