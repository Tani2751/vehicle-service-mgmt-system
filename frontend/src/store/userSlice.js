import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
    
    "user/fetchUser",
    async (data, { rejectWithValue }) => {        
        try {            
            if (!data?.accessToken) {
                console.log("no acces token");                
                return rejectWithValue("No access token");
            }
            
            const res = await fetch(`http://localhost:3000/api/v1/info/me`, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                }
            });

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


const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        status: "idle",
        error: null,
    },
    reducers: {
        clearUser: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});


export const {clearUser} = userSlice.actions;
export default userSlice.reducer;