import {useState} from 'react';
import { signInAuthUserWithEmailAndPassword,createUserDocumentFromAuth,signInWithGooglePopup } from '../../utils/firebase/firebaste.utils';
import FormInput from '../from-input/form-input.component';
import Button from '../button/button.component.jsx';
import './sign-in-form.styles.scss'


const defaultFormFields = {
   email:'',
   password:'',
}

// each type of verification has to be added in firebase also (here email and password)
const SignInForm = () => {
  
   //[value, setValue]
   //the parameter inside useState is the default inside setFormFields, the object
   const [formFields, setFormFields] = useState(defaultFormFields);
   const {email,password} = formFields;
   
   const resetFormFields = ()=>{
      setFormFields(defaultFormFields)
   }

   const signInWithGoogle = async () => {
      const {user} = await signInWithGooglePopup();
     createUserDocumentFromAuth(user);
   }

   const handleSubmite = async (event) => {
      event.preventDefault();
         //verification
     
      try{
       const response = await signInAuthUserWithEmailAndPassword(email,password);
       console.log(response);
      }catch(error){
         switch(error.code){
            case 'auth/user-not-found':
               alert("User doesn't exist");
               break;
            case 'auth/wrong-password':
               alert("Wrong password");
               break;
            default:
               console.log(error)   
         } 
      }
   }
   //updates the vaule of the object, each time is modify
   const handleChange = (event) => {
      const {name,value} = event.target;
      console.log(formFields)
      //the tre dots, necesary to only modify the parammeter passed instead of the whole object
      setFormFields({ ...formFields, [name]:value})
   }
   return(
      <div className='sign-up-container'>
         <h2>Already have an account?</h2>
         <span>Sign in with your email and password</span>
         <form onSubmit={handleSubmite}>
                      
            {/* value={displayName} -- The changes are circular, this means the value from the state is the shown in the input, but when the user type those values the handleChange push in in our formFields and then our state will aslo update the visual*/}
            
            <FormInput label="Email"type="email" required onChange={handleChange} name="email" value={email}/>

            <FormInput label="Password"type="password" required onChange={handleChange} name="password" value={password}/>

         <div className='buttons-container'>
            <Button  type="submit">Sign In</Button>
            {/* added type button, if not the error we do with the switch will appear, because by default all buttons are type="submit" */}
            <Button onClick={signInWithGoogle} buttonType="google" type="button">Sign In With Google</Button>
         </div>
       
            

         </form>
      </div>
   )
}

export default SignInForm;