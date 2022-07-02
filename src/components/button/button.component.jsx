import './button.styles.scss';

// if is not added any extra class will take the default :) 
const BUTTON_TYPE_CLASSES = {
   google : 'google-sign-in',
   inverted : 'inverted'
}


const Button = ({children,buttonType,...otherProps}) => {
   //here gives otherProps beyond it looks don't do anithing, to give all the properties the original button has
   return (
      <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}{...otherProps}>{children}</button>
   )
}

export default Button;