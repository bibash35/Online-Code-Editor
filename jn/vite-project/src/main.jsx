import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/index.js";
import { Provider } from "react-redux";
// import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    {/* <AuthContextProvider> */}
      <App />
      {/* </AuthContextProvider> */}
    </Provider>
   </React.StrictMode>,
);
