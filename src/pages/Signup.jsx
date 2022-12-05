import FormSignUp from '../components/Forms/FormSignUp';
import FormSignIn from '../components/Forms/FormSignIn';

const Signup = () => {
  return (
    <>
      <FormSignUp />
      <p>New here? Create your account:</p>
      <FormSignIn />
    </>
  );
};

export default Signup;
