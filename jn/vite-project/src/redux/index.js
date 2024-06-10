import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slice/userSlice";
import gitReducer from "./slice/gitSlice"
export default configureStore({
  reducer: {
    user: userReducer,
    git:gitReducer
  }
})