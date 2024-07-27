import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Chat, User } from '../../Context/ChatProvider';
import UserBadgeInGroupChat from '../User/UserBadgeInGroupChat';
import { apiClient } from '../../services/apiClient';
import { loggedInUser } from '../../services/chatService';
import UserListItem from '../User/UserListItem';
import { toast } from '../ui/use-toast';
import axios from 'axios';
import { cn } from '../../lib/utils';

interface Props {
    isUpdateGcOpen: boolean,
    setIsUpdateGcOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedChat: Chat,
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat | undefined>>;
}

const UpdateGroupChatModal = ({ selectedChat, isUpdateGcOpen, setIsUpdateGcOpen, setSelectedChat }: Props) => {
    const [users, setUsers] = useState<User[]>(selectedChat.users);
    const [newChatName, setNewChatName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchUsersList, setSearchUsersList] = useState<User[]>([]);

    async function handleSearchUser(search: string) {
        try {
            setSearchQuery(search);
            if (search === '') {
                setSearchUsersList([]);
                return
            }
            const config = {
                headers: {
                    authorization: `Bearer ${loggedInUser.token}`,
                },
            };
            const { data } = await apiClient.get(`users?username=${search}`, config);
            const filteredUsers: User[] = data.data.filter((user: User) => !users.some(u => u.id === user.id));
            console.log(filteredUsers);
            setSearchUsersList(filteredUsers);
        } catch (err) {
            console.log(err);
        }
    }

    async function removeFromGroup(user: User) {
        try {
            console.log({ user: user.id, admin: loggedInUser.id });
            if (user.id === loggedInUser.id) {
                toast({
                    title: "Cannot remove yourself as you are admin",
                    className: cn(
                        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                    ),
                    status: "error",
                    variant: 'destructive',
                })
                return;
            }
            const payload = { chatId: selectedChat.id, userId: user.id };
            const config = {
                headers: {
                    authorization: `Bearer ${loggedInUser.token}`,
                },
            };
            const { data } = await apiClient.patch(`/chats/group/remove`, payload, config);
            setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
            toast({
                title: data.success ? "User removed from group successfully!" : "Uh oh! Something went wrong.",
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                description: data.success ? "" : data.message,
                status: data.success ? 'success' : 'error'
            });
        } catch (err) {
            console.log(err);
            toast({
                title: "Removing user from group failed",
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                description: (axios.isAxiosError(err) && err.response?.data?.message) || "An unexpected error occurred. Please try again.",
                status: "error",
                variant: 'destructive',
            });
        }
    }

    async function renameGroupChat() {
        try {
            if (newChatName === '') {
                setIsUpdateGcOpen(false);
                return;
            }
            const payload = { chatId: selectedChat.id, newChatName };
            const config = {
                headers: {
                    authorization: `Bearer ${loggedInUser.token}`,
                },
            };
            const { data } = await apiClient.patch(`/chats/group`, payload, config);
            const updatedChatData = data.data;
            setSelectedChat({ ...selectedChat, chatName: updatedChatData.chatName });
            toast({
                title: data.success ? "Group chat renamed successfully!" : "Uh oh! Something went wrong.",
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                description: data.success ? "" : data.message,
                status: data.success ? 'success' : 'error'
            });
            setIsUpdateGcOpen(false);
        } catch (err) {
            console.log(err);
            toast({
                title: "Renaming group chat failed",
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                description: (axios.isAxiosError(err) && err.response?.data?.message) || "An unexpected error occurred. Please try again.",
                status: "error",
                variant: 'destructive',
            });
        }
    }

    async function addToGroupChat(user: User) {
        try {
            const payload = { chatId: selectedChat.id, userId: user.id };
            const config = {
                headers: {
                    authorization: `Bearer ${loggedInUser.token}`,
                },
            };
            setSearchUsersList(searchUsersList.filter((su) => su.id !== user.id));
            setUsers([...users, user]);
            const { data } = await apiClient.patch('/chats/group/add', payload, config);
            setSelectedChat({ ...selectedChat, users: [...users, user] });
            toast({
                title: data.success ? "User added to group successfully!" : "Uh oh! Something went wrong.",
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                description: data.success ? "" : data.message,
                status: data.success ? 'success' : 'error'
            });
        } catch (err) {
            console.log(err);
            toast({
                title: "Adding user to group chat failed",
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                description: (axios.isAxiosError(err) && err.response?.data?.message) || "An unexpected error occurred. Please try again.",
                status: "error",
                variant: 'destructive',
            });
        }
    }

    return (
        <>
            <Dialog open={isUpdateGcOpen} onOpenChange={setIsUpdateGcOpen}>
                <DialogTrigger className='hidden' asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className='flex justify-center items-center'>
                        <DialogTitle>{selectedChat.chatName}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-wrap space-x-1 space-y-1">
                        {users.map(u => <UserBadgeInGroupChat onClick={removeFromGroup} key={u.id} user={u} />)}
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <Input
                            placeholder='Updated Group Chat Name'
                            value={newChatName}
                            onChange={(e) => setNewChatName(e.target.value)}
                            id="newchatname"
                            className="col-span-3"
                        />
                        <Input
                            placeholder='Search Users'
                            value={searchQuery}
                            onChange={(e) => {
                                handleSearchUser(e.target.value);
                            }}
                            id="searchquery"
                            className="col-span-3"
                        />
                        <div className="flex flex-col space-y-1">
                            {searchUsersList.map(user => <UserListItem onClick={() => addToGroupChat(user)} key={user.id} user={user} />)}
                        </div>
                        <Button onClick={renameGroupChat}>
                            Update Group
                        </Button>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default UpdateGroupChatModal;