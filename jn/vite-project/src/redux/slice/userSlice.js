import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null

  },
  reducers: {
    loginRedux: (state, action) => {
      state.value = action.payload
      },
      logout: (state, action) => {
        state.value = null;
        localStorage.removeItem("user")

      },
}
})

export const { loginRedux,logout} = userSlice.actions

export default userSlice.reducer