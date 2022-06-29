import {useState} from 'react';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebaste.utils';

const defaultFormFields = {
   displayName:'',
   email:'',
   password:'',
   confirmPassword:'',
}

const SignUpForm = () => {
  
   //[value, setValue]
   //the parameter inside useState is the default inside setFormFields, the object
   const [formFields, setFormFields] = useState(defaultFormFields);
   const {displayName,email,password,confirmPassword} = formFields;
   
     console.log(formFields)

   const handleSubmite = async (event) => {
      event.preventDefault();
           
      if(password != confirmPassword){
         console.log(password,confirmPassword)
         alert('Passwords do not match');
         return;
      }try{
         const response = await createAuthUserWithEmailAndPassword(email,password);
         console.log(response);
      }catch{
         console.error('error');
      }

   }
   const handleChange = (event) => {
      const {name,value} = event.target;
      console.log(formFields)
      setFormFields({ ...formFields, [name]:value})
   }
   return(
      <div>

         <form onSubmit={handleSubmite}>
            <label>Display Name</label>
            
            {/* value={displayName} -- The changes are circular, this means the value from the state is the shown in the input, but when the user type those values the handleChange push in in our formFields and then our state will aslo update the visual*/}
            <input type="text" required onChange={handleChange} name="displayName" value={displayName}/>

            <label>Email</label>
            <input type="email" required onChange={handleChange} name="email" value={email}/>

            <label>Password</label>
            <input type="password" required onChange={handleChange} name="password" value={password}/>

            <label>Confirm Password</label>
            <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

            <button type="submit">Sign Up</button>

         </form>
      </div>
   )
}

export default SignUpForm;