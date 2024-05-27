import AuthRegister from "./AuthRegister";
import AuthWrapper from "./AuthWrapper";

const Register = () => {
    return (
        <AuthWrapper
        footerText="Already have an account?"
        footerLinkText="Login here"
        footerLinkTo="/login"
        >
            <AuthRegister/>
        </AuthWrapper>
    )
};
export default Register;