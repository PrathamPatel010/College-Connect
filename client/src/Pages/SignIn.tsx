import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";

const SignIn = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('info');
        if (user)
            navigate('/chats');
    }, [navigate]);

    return (
        <LoginForm />
    )
}

export default SignIn;