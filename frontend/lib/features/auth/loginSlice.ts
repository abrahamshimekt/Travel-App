import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
interface loginData {
    username: string;
    password: string;
    onSuccess?:()=>void
}

export const login = createAsyncThunk(
  "auth/login",
  async (data: loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/users/login", {username:data.username,password: data.password});
      toast.success("በትክክል ገብተዋል።")
      data.onSuccess&&data.onSuccess();
      return response.data;
    } catch (error) {
      let errorMessage: string;
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = (error as Error).message || String(error);
      }
        toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState={
    user:null,
    loading:false,
    error: null as string | null
}
const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
      builder.addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    },

})

export default loginSlice.reducer;
