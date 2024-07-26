// src/utils/chatUtils.ts
import { apiClient } from "../services/apiClient";
import { Chat } from "../Context/ChatProvider";

export const fetchChats = async (token: string | undefined, setChats: React.Dispatch<React.SetStateAction<Chat[]>>) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await apiClient.get("/chats", config);
        setChats(data.data);
    } catch (err) {
        console.log(err);
    }
};

const userInfoString = localStorage.getItem('info');
export const loggedInUser = userInfoString ? JSON.parse(userInfoString) : null;
