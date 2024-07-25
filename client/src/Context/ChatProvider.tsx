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
    isVerified: boolean,
    pic: string,
    token?: string,
}

export interface Chat {
    id: number,
    chatName: string,
    isGroupChat: boolean,
    groupAdminId: number,
    createdAt: Date,
    updatedAt: Date,
    latestMessage: number,
    users: User[]
}

interface ChatContextType {
    user?: User;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    selectedChat?: Chat;
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat | undefined>>;
    chats: Chat[];
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const ChatProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [selectedChat, setSelectedChat] = useState<Chat | undefined>(undefined);
    const [chats, setChats] = useState<Chat[]>([]);
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
        <ChatContext.Provider value={{ user, setUser, chats, setChats, selectedChat, setSelectedChat }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("ChatState must be used within a ChatProvider");
    }
    return context;
}

export default ChatProvider;
