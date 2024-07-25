import { useEffect, useState } from "react";
import { ChatState, User } from "../Context/ChatProvider";
import { apiClient } from "../services/apiClient";
import { Button } from "./ui/button";

const MyChats = () => {
    const [loggedInUser, setLoggedInUser] = useState();
    const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();

    function getSender(loggedInUser: User | undefined, users: User[]) {
        return users[0]?.id === loggedInUser?.id ? users[1].username : users[0].username;
    }

    useEffect(() => {
        const userInfoString = localStorage.getItem('info');
        if (userInfoString) {
            setLoggedInUser(JSON.parse(userInfoString));
        }

        const fetchChats = async () => {
            if (!user?.token) return; // Ensure user token is available
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                const { data } = await apiClient.get("/chats", config);
                setChats(data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchChats();
    }, [setChats, user?.token]);

    return (
        <main className="h-screen">
            <div className={`w-full ${selectedChat ? 'hidden md:flex' : 'flex'} flex-col bg-gray-500 h-full md:w-full content-center rounded-md`}>
                <div className="flex justify-between items-center p-1">
                    <span>My Chats</span>
                    <Button className="flex justify-between items-center px-2">
                        <span>New Group Chat</span>
                        <i className="fa-solid fa-plus text-xl"></i>
                    </Button>
                </div>
                <div className="flex flex-col p-3 rounded-lg overflow-y-auto">
                    {chats.map((chat) => (
                        <div
                            onClick={() => setSelectedChat(chat)}
                            className={`${selectedChat === chat ? 'bg-black text-white' : 'bg-white text-black'} flex cursor-pointer p-3 rounded-lg mt-4`}
                            key={chat.id}
                        >
                            <span>{!chat.isGroupChat ? getSender(loggedInUser, chat.users) : chat.chatName}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default MyChats;
