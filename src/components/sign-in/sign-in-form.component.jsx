import { useState} from "react"
import {signinWithGooglePopup,signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import './sign-in-form.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"


const defaultFormField = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormField)
    const {email, password} = formFields
    // console.log(formFields)


    const resetFormField = () =>{
        setFormFields(defaultFormField)
    }

    const signInWithGoogle = async()=>{
        await signinWithGooglePopup()
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email,password)
            resetFormField()
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Invalid credentials. Please try again!')
                    break
                case 'auth/user-not-found':
                    alert('Invalid credentials. Please try again!')
                    break
                default:
                    console.log(error)
            }
        }
    }



    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormFields({
            ...formFields,[name]: value
        })


    }

    return(
        <div className="sign-in-container">
            <h2>Already have an account</h2>
            <span>Sign up with your email and password </span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" required type="email" onChange={handleChange} name='email' value={email} />
                <FormInput label="Password" required type="password" onChange={handleChange} name='password' value={password} />
                <div className="buttons-container1">
                    <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>SIGN IN</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google}  onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </div>

            </form>
        </div>
    )
}


export default SignInForm