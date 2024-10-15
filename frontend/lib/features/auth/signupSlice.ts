import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
 interface SignupData {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone_number: string;
    password: string;
}

export const signup = createAsyncThunk("auth/signup", async (data:SignupData, { rejectWithValue }) => {
    try {   
        const response = await axios.post("http://localhost:8000/users/signup", data);
        toast.success("በትክክል ተመዝግበዋል።");
        return response.data;
    }   
    catch (error) {
        let errorMessage: string;
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data.message;
        }   
        else {
            errorMessage = (error as Error).message || String(error);
        }   
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
    }
});

const initialState = {
    user: null,
    loading: false,
    error: null as string | null
};

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});


export default signupSlice.reducer;