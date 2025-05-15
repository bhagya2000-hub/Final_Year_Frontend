import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
}

export const userSlice = createSlice({
    initialState,
    name: "userSlice",
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
        setLoading(state, action) { // Add this method
            state.loading = action.payload; // Ensure this correctly updates loading state
        },
        setILoading(state, action) {
            state.loading = action.payload; // Ensure this correctly updates loading state
        },
    },
});

export default userSlice.reducer;
export const { setUser, setIsAuthenticated, setLoading, setILoading } = userSlice.actions; // Include setUser and setLoading
