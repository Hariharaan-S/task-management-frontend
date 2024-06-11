import { useContext, useState } from "react";
import FormInput from "../../components/form-input/form-input.component.jsx";
import Button from "../../components/button/button.component.jsx";
import { SignInContainer } from "./sign-in.styles.jsx";
import { UserContext } from "../../context/user.context.jsx";
import { useNavigate } from "react-router";



const defaultFields = {
  email: "",
  password: "",
};

const SignIn = () => {

  const { setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [formFields, setFormFields] = useState(defaultFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_BASE_URL + '/auth/login', {
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
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password");
          break;
        case "auth/user-not-found":
          alert("No user associated");
          break;
        default:
          console.log(error.message);
      }
      console.log("user creation error", error);
    }
  };
  return (
    <SignInContainer>
      <h2>Already Have Account?</h2>
      <span>Sign in with Email and Password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button children={"Sign In"} type="submit" />
        </div>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
