import FormSignIn from '../components/Forms/FormSignIn';
import FormSignUp from '../components/Forms/FormSignUp';

const Signin = () => {
  return (
    <>
      <FormSignIn />
      <p>Alredy have an account?</p>
      <FormSignUp />
    </>
  );
};

export default Signin;
