import SignUp from "../../components/sign-up/sign-up.component.jsx";
import SignIn from "../../components/sign-in/sign-in.component.jsx";
import {AuthenticationContainer} from  "./authentication.styles.jsx"

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignIn />
      <SignUp />
    </AuthenticationContainer>
  );
};

export default Authentication;
