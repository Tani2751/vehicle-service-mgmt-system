import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchRoles = createAsyncThunk(
    "roles/fetchRoles",
    async(accessToken, {rejectWithValue}) => {
        try {
            if (!accessToken) {
                console.log("no acces token");                
                return rejectWithValue("No access token");
            }

            const res = await fetch("http://localhost:3000/api/v1/info/getRoles", {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }

            })
             if(!res.ok) {
                throw new Error("Failed to fetch user");
            }
            const responseData  = await res.json()
            return responseData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const rolesSlice = createSlice({
    name: "roles",
    initialState: {
        data: null,
        status: "idle",
        error: null,
    },
    extraReducers: (builder) => {
            builder
                .addCase(fetchRoles.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                })
                .addCase(fetchRoles.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.data = action.payload;
                })
                .addCase(fetchRoles.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
                });
        },
});


export default rolesSlice.reducer;