import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import RootElement from "./components/RootElement";
import { useEffect} from "react";
import axios from "axios";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { loginRedux } from "./redux/slice/userSlice";
import { loginGit } from "./redux/slice/gitSlice";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Help from "./pages/Help";
import Blog from "./pages/Blog";
import AddLibrary from "./pages/AddLibrary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootElement />}>
      <Route index element={<Header />} />
      <Route path="login" element={<Login/>}/>
      <Route path="Register" element={<Signup/>}/>
      <Route path="help" element={<Help/>}/>
      <Route path="blog" element={<Blog/>}/>
      <Route path="library" element={<AddLibrary/>}/>
    </Route>
  )
);


const App = () => {
 
  const dispatch=useDispatch();

  useEffect(() => {
    let storedUser = localStorage.getItem("user");

    if (storedUser) {
      axios.get("http://localhost:8000/api/auth/getAllUsers")
        .then((res) => {
  dispatch(loginRedux(JSON.parse(storedUser)));
        })
        .catch((err) => {
        });
    } 
  }, []);

   
  useEffect(() => {
    const gitUser = localStorage.getItem("git");
    if (gitUser) {
      try {
        const parsedGitUser = JSON.parse(gitUser);
        dispatch(loginGit(parsedGitUser));
      } catch (error) {
        console.error("Error parsing git user data:", error);
      }
    }
  }, []);
  


  return (
    <>
      <RouterProvider router={router} />
      
    </>
  );
};

export default App
