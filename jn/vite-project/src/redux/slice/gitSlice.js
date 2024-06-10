import { createSlice } from '@reduxjs/toolkit'

export const gitSlice = createSlice({
  name: 'git',
  initialState: {
    value: null

  },
  reducers: {
    loginGit: (state, action) => {
      state.value = action.payload
      },
      logoutGit: (state, action) => {
        state.value = null;
        localStorage.removeItem("git")

      },
}
})

export const { loginGit,logoutGit} = gitSlice.actions

export default gitSlice.reducer