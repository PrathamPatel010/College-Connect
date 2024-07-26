import { useState } from "react"
import { apiClient } from "../../services/apiClient"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ChatState, User } from "../../Context/ChatProvider"
import UserListItem from "../User/UserListItem"
import UserBadgeInGroupChat from "../User/UserBadgeInGroupChat"
import { toast } from "../ui/use-toast"
import { Toaster } from "../ui/toaster"
import { fetchChats, loggedInUser } from "../../services/chatService";

interface Props {
    dialogOpen: boolean,
    setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

function ModalNewGroupChat({ dialogOpen, setDialogOpen }: Props) {
    const { user, setChats } = ChatState();
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [chatName, setChatName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<User[]>([loggedInUser]);

    async function handleSearchUser(search: string) {
        setSearch(search);
        if (search === '') {
            setUsers([])
            return
        }
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${user?.token}`,
                },
            };
            const { data } = await apiClient.get(`users?username=${search}`, config);
            const users: User[] = data.data;
            const filteredUsers: User[] = users.filter(u => !selectedUsers.some(su => su.id === u.id));
            setUsers(filteredUsers);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleClickOnUserList(u: User) {
        setSelectedUsers([...selectedUsers, u]);
        const remainingUsers = users.filter(user => user.id !== u.id);
        setUsers(remainingUsers);
    }

    async function createGroupChat() {
        try {
            if (selectedUsers.length < 3) throw new Error("Require atleast 3 users");
            if (chatName === '') throw new Error("Chat name is required");
            const groupChatData = {
                chatName, users: selectedUsers.map(user => user.id)
            }
            const { data } = await apiClient.post(`/chats/group`, groupChatData, {
                headers: {
                    authorization: `Bearer ${user?.token}`
                }
            });
            toast({
                title: data.success ? "Group Chat created successfully" : "Uh oh! Something went wrong.",
                status: data.success ? 'success' : 'error'
            });
            fetchChats(user?.token, setChats);
        } catch (err) {
            console.log(err);
            toast({
                title: "Error",
                description: (err as Error).message,
                status: "error",
                variant: 'destructive',
            });
        }
    }
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="hidden" asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Group Chat</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="chat name" className="text-right">
                            Chat Name
                        </Label>
                        <Input
                            onChange={(e) => setChatName(e.target.value)}
                            value={chatName}
                            id="chat name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            value={search}
                            onChange={(e) => {
                                handleSearchUser(e.target.value)
                            }}
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap space-x-1 space-y-1">
                    {selectedUsers.map(u => <UserBadgeInGroupChat key={u.id} user={u} />)}
                </div>
                <div className="flex flex-col space-y-1">
                    {users.map(user => <UserListItem key={user.id} onClick={() => handleClickOnUserList(user)} user={user} />)}
                </div>
                <DialogFooter>
                    <Button onClick={createGroupChat} type="submit">Create Chat</Button>
                </DialogFooter>
            </DialogContent>
            <div>
                <Toaster />
            </div>
        </Dialog>
    )
}

export default ModalNewGroupChat;