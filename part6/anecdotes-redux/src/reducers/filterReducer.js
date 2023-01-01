import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: "filter",
    initialState: "",
    reducers: {
        filterChange(state, action) {
            const content = action.payload
            return content
        }
    },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer