import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchGarages = createAsyncThunk(
    "garages/fetchGarages",
    async(accessToken, {rejectWithValue}) => {
        try {
            if (!accessToken) {
                console.log("no acces token");                
                return rejectWithValue("No access token");
            }

            const res = await fetch("http://localhost:3000/api/v1/info/sideBarGarargeList", {
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


const gargesSlice = createSlice({
    name: "garages",
    initialState: {
        data: null,
        status: "idle",
        error: null,
    },
    extraReducers: (builder) => {
            builder
                .addCase(fetchGarages.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                })
                .addCase(fetchGarages.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.data = action.payload;
                })
                .addCase(fetchGarages.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
                });
        },
});


export default gargesSlice.reducer;