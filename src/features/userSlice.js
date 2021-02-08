import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName: localStorage.getItem('username')
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            localStorage.setItem('username', action.payload)
        }
    }
});

export const { addUser } = userSlice.actions

export const selectUserName = state => state.user.userName;

export default userSlice.reducer;