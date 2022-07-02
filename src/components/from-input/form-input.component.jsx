import './form-input.styles.scss'
const FormInput = ({label, ...otherProps}) => {
   return(
      <div className='group'>
      <input className='form-input' {...otherProps} />
      {/* don't understand why put the label in () works fine with only the label tag */}
      {
         label && (
            <label 
            className={`${
               otherProps.value.length ? 'shrink' : ''

            } form-input-label`}
            >
               {label}
                </label>
         )
      }
     

      </div>
   )
}

export default FormInput;


// BEFORE was like this each Element, but label can be added as a property, so will be more organized
//this is what replace the form input
// <label>Email</label>
// <input type="email" required onChange={handleChange} name="email" value={email}/>