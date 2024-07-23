import { useState, createContext, ReactNode, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext<ChatContextType | undefined>(undefined);


interface Props {
    children: ReactNode
}

export interface User {
    id: number,
    email: string,
    username: string,
    isVerified: false,
    pic: string,
    token: string,
}

interface ChatContextType {
    user?: User; // Adjust the type based on your actual user data structure
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>; // Adjust type as needed
}


const ChatProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const navigate = useNavigate();
    const path = window.location.pathname;
    useEffect(() => {
        const userInfoString = localStorage.getItem('info');
        if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            setUser(userInfo);
            return;
        }
        if (path !== '/signup' && path !== '/')
            navigate('/');

    }, [navigate, path]);

    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;