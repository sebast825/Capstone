import {useState, useContext} from 'react';
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../../utils/firebase/firebaste.utils';
import FormInput from '../from-input/form-input.component';
import Button from '../button/button.component.jsx';
import './sign-up-form.styles.scss'
import { UserContext } from '../../contexts/user.contexts';

const defaultFormFields = {
   displayName:'',
   email:'',
   password:'',
   confirmPassword:'',
}

// each type of verification has to be added in firebase also (here email and password)
const SignUpForm = () => {
  
   //[value, setValue]
   //the parameter inside useState is the default inside setFormFields, the object
   const [formFields, setFormFields] = useState(defaultFormFields);
   const {displayName,email,password,confirmPassword} = formFields;
   
     console.log(formFields)
     //to be available globaly
   const { setCurrentUser } = useContext(UserContext)
   
   const resetFormFields = ()=>{
      setFormFields(defaultFormFields)
   }

   const handleSubmite = async (event) => {
      console.log(event)
      event.preventDefault();
         //verification
      if(password !== confirmPassword){
         console.log(password,confirmPassword)
         alert('Passwords do not match');
         return;
      }

      try{
         //createAuthUser (Provider)
         const {user} = await createAuthUserWithEmailAndPassword(email,password);
         //the 2nd parameter in case the displayName at google is null will take what client has put in the input
         // saves is in the firestore database
         await createUserDocumentFromAuth(user, {displayName})
         resetFormFields()
         //is for the userContext
         //gives the variable to be available globaly
         setCurrentUser(user)
      }catch(error){
         if(error.code === 'auth/email-already-in-use'){
            alert('Cannot create user, email already in use')
         }else{
            console.error(error);

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
         <h2>Don't have an account?</h2>
         <span>Sign up with your email and password</span>
         <form onSubmit={handleSubmite}>
                      
            {/* value={displayName} -- The changes are circular, this means the value from the state is the shown in the input, but when the user type those values the handleChange push in in our formFields and then our state will aslo update the visual*/}
            <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
            
            <FormInput label="Email"type="email" required onChange={handleChange} name="email" value={email}/>

            <FormInput label="Password"type="password" required onChange={handleChange} name="password" value={password}/>

            <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

            <Button type="submit">Sign Up</Button>

         </form>
      </div>
   )
}

export default SignUpForm;