import {GithubAuthProvider,getAuth, signInWithPopup} from "firebase/auth"
import { app } from "../config/firebase.config.js";
import { loginGit } from "../redux/slice/gitSlice.js";
import { useDispatch} from "react-redux";


    const Githhublogin = () =>{
const dispatch=useDispatch();
    const signInWithGithub = async () => {
        const provider = new GithubAuthProvider();
        provider.addScope("user");
        const auth = getAuth(app);
    
        try {
          const result = await signInWithPopup(auth, provider);
          const _tokenResponse= result._tokenResponse;
          dispatch(loginGit(_tokenResponse));
          localStorage.setItem("git", JSON.stringify(_tokenResponse));
          console.log(result);
        } catch (error) {
          console.error("GitHub sign-in error:", error);
        }
      };
return{
    signInWithGithub
}
   
};
export default Githhublogin;