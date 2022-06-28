import { signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/firebaste.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () =>{

   const logGoogleUser = async () => {
      const {user} = await signInWithGooglePopup();
      // console.log(response);
      createUserDocumentFromAuth(user)
   }

   return(
      <div>
         <h1>Sign In</h1>
         <SignUpForm/>
         <button onClick={logGoogleUser}>
            Sign in with Google Popup
         </button>
      </div>
   )

   }
   export default SignIn;