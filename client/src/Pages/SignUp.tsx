import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { useEffect } from "react";

const SignUp = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('info');
        if (user)
            navigate('/chats');
    }, [navigate]);

    return (
        <RegisterForm />
    )
}

export default SignUp;