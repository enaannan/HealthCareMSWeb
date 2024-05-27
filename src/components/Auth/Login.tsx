import AuthLogin from "./AuthLogin"
import AuthWrapper from "./AuthWrapper"

const Login = () => {
    return (
        <AuthWrapper
        footerText="Don't have an account?"
        footerLinkText="Register here"
        footerLinkTo="/register"
    >
            <AuthLogin/>
        </AuthWrapper>
    )
}
export default Login