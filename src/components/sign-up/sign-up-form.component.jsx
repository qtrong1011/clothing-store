import { useState} from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import './sign-up-form.styles.scss'
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"


const defaultFormField = {
    displayName : '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormField)
    const {displayName,email, password,confirmPassword} = formFields
    // console.log(formFields)

    const resetFormField = () =>{
        setFormFields(defaultFormField)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert('Passwords do not match')
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password)

            //we need it to have displayName if user object does not contain displayName
            await createUserDocumentFromAuth(user, {displayName})
            
            resetFormField()

        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            }
            else{
                console.log(error.message)
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
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password </span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" required type="text" onChange={handleChange} name='displayName' value={displayName} />
                <FormInput label="Email" required type="email" onChange={handleChange} name='email' value={email} />
                <FormInput label="Password" required type="password" onChange={handleChange} name='password' value={password} />
                <FormInput label="Confirm Password" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>Register</Button>
            </form>
        </div>
    )
}


export default SignUpForm