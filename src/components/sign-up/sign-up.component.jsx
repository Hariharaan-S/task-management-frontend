import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component.jsx";
import { SignUpContainer } from "./sign-up.styles.jsx";
import { UserContext } from "../../context/user.context.jsx";

const defaultFields = {
  displayName: "",
  email: "",
  password: "",
};

const SignUp = () => {

  const { setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [formFields, setFormFields] = useState(defaultFields);
  const [confirmPassword, setConfirmPassword] = useState("")
  const { displayName, email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFields);
    setConfirmPassword("")
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name !== 'confirmPassword')
      setFormFields({ ...formFields, [name]: value });
    else
      setConfirmPassword(value)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password does not match");
      return;
    }

    try {

      const response = await fetch(process.env.REACT_APP_BASE_URL + 'auth/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formFields)
      })

      if (response.status === 200) {
        const currentuser = await response.json();
        setCurrentUser(currentuser)
        navigate('/')
      }
      resetFormFields();
    } catch (error) {
      console.log("user creation error", error);
    }
  };
  return (
    <SignUpContainer>
      <h2>Don't Have an Account?</h2>
      <span>Sign in with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button children={"Sign Up"} type="submit" />
      </form>
    </SignUpContainer>
  );
};

export default SignUp;
