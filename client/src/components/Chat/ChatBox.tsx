import { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import SendButton from "../../utils/sendButton";
import { Input } from "../ui/input";
import ChatHeader from "./ChatHeader";
import ScrollableChat from "./ScrollableChat";
import { loggedInUser } from "../../services/chatService";
import { apiClient } from "../../services/apiClient";
import { Message } from "../../config/types";
import io, { Socket } from 'socket.io-client';
const endpoint = 'http://localhost:4000';
let socket: Socket, selectedChatCompare;

const ChatBox = () => {
    const { selectedChat, setSelectedChat, user } = ChatState();
    const [newMessage, setNewMessage] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const text = "Click on chat to start chatting";

    const config = {
        headers: {
            authorization: `Bearer ${user?.token}`
        }
    }

    useEffect(() => {
        socket = io(endpoint);
        socket.emit('setup', user);
        socket.on('connected', () => {
            setSocketConnected(true);
        });
    }, [user]);

    useEffect(() => {
        fetchMessages();
    }, [selectedChat?.id]);

    async function fetchMessages() {
        try {
            if (!selectedChat) {
                return;
            }
            const chatId = selectedChat && selectedChat.id;
            const response = await apiClient.get(`/messages/${chatId}`, config);
            setMessages(response.data.data.messages);
            socket.emit('join chat', selectedChat.id);
        } catch (err) {
            setMessages([]);
            console.log(err);
        }
    }



    async function handleSendMessage() {
        const sender = loggedInUser;
        const payload = { content: newMessage, chatId: selectedChat?.id, sender: user?.id };

        // Create optimistic message
        const latestMessage: Message = {
            chat: selectedChat || undefined,
            chatId: selectedChat?.id,
            content: newMessage,
            id: Date.now(), // Temporary ID for optimistic rendering
            sender: sender,
            senderId: sender.id,
        };
        setMessages([...messages, latestMessage]);
        setNewMessage('');
        try {
            const response = await apiClient.post('/messages', payload, config);
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.id === latestMessage.id ? { ...msg, id: response.data.data.id } : msg
                )
            );
        } catch (err) {
            console.log(err);
            setMessages(prevMessages =>
                prevMessages.filter(msg => msg.id !== latestMessage.id)
            );
        }
    }



    return (
        <div className="h-full flex flex-col">
            {!selectedChat && (
                <div className="h-lvh flex justify-center items-center">
                    {text}
                </div>
            )}
            {selectedChat && (
                <ChatHeader selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
            )}
            {selectedChat && (<ScrollableChat messages={messages} />)}
            {selectedChat && (
                <div className="bg-gray-500 sticky bottom-0 flex w-full items-center space-x-2">
                    <Input onChange={
                        (e) => setNewMessage(e.target.value)
                    }
                        value={newMessage} className="rounded-md bg-white text-black" type="text" placeholder="Type a message.." />
                    <SendButton onClick={() => handleSendMessage()} />
                </div>
            )}
        </div>
    );
};

export default ChatBox;
