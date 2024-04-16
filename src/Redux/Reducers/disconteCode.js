import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const getValue = createAsyncThunk(
    "value/getValue",
    async (value, {rejectWithValue}) => {
        const res = await fetch(`https://moneyservices.store/back/public/api/check-copoun?code=${value}`)
        const data = res.json()
        return data
    }
)

const value = createSlice({
    name: "value",
    initialState: {code: null},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getValue.pending, (state) => {
            state.code = null
        }),
        builder.addCase(getValue.fulfilled, (state, action) => {
            state.code = action.payload
        }),
        builder.addCase(getValue.rejected, (state, action) => {
            state.code = action.payload
        })
    }
})

export default value.reducer