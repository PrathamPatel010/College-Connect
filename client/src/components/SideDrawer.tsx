import { Button } from "./ui/button";
import Heading from "./ui/Heading";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ChatState, User } from "../Context/ChatProvider";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "./ui/drawer";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { apiClient } from "../services/apiClient";
import UserListItem from "./User/UserListItem";
import { fetchChats } from "../services/chatService";



const SideDrawer = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<User[]>([]);
    const {
        user,
        setSelectedChat,
        chats,
        setChats,
    } = ChatState();
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('info');
        navigate('/');
    }

    async function handleSearch() {
        if (search === '')
            return;
        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        }
        const { data } = await apiClient.get(`/users?username=${search}`, config);
        setSearchResult(data.data);
    }


    async function accessChat(userId: number) {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            }
            const { data } = await apiClient.post(`/chats/`, { userId }, config);
            const chatData = data.data;
            if (chats.find(c => c.id === chatData.id))
                setChats([...chats, chatData]);
            setSelectedChat(chatData);
            fetchChats(user?.token, setChats);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <main className="px-2">
            <div className="flex justify-between items-center border-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button onClick={() => setIsDrawerOpen(true)} className="bg-gray-300" color="primary px-4">
                                <i className="fas fa-search"></i>
                                <span className="px-2 hidden md:block">Search Users</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Search Users
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div>
                    <Heading mt={3} size={4} text="College Connect" />
                </div>
                <div className="flex space-x-10">
                    <i className="text-3xl fa-solid fa-bell cursor-pointer"></i>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex space-x-2">
                            <Avatar>
                                <AvatarImage src={user?.pic} />
                                <AvatarFallback>{user?.username[0]}</AvatarFallback>
                            </Avatar>
                            <i className="fa-solid fa-arrow-down text-4xl"></i>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Dialog>
                                <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                                    Manage Profile
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="cursor-pointer">Logout</DropdownMenuItem>
                            </Dialog>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <button className="hidden">Open Dialog</button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogTitle className="text-center">User Profile</DialogTitle>
                            <div className="flex flex-col items-center space-y-4">
                                <img className="rounded-full w-20 h-20" src={user?.pic} alt="Profile" />
                                <div>Email - {user?.email}</div>
                                <DialogClose asChild>
                                    <button className="btn">Close</button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <DrawerTrigger asChild>
                            <Button className="hidden" variant="outline">Open Drawer</Button>
                        </DrawerTrigger>
                        <DrawerContent className="fixed h-full left-0 w-64 max-w-full">
                            <div className="mx-auto w-full h-full flex flex-col">
                                <DrawerHeader className="p-4 flex justify-center items-center">
                                    <div className="">
                                        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for a user" />
                                    </div>
                                    <div>
                                        <DrawerClose>
                                            <i className="text-4xl fa-solid fa-rectangle-xmark cursor-pointer"></i>
                                        </DrawerClose>
                                    </div>
                                </DrawerHeader>
                                <div className="text-center">
                                    <Button onClick={handleSearch} variant="outline">Search</Button>
                                </div>
                                <div className="flex flex-col overflow-y-auto">
                                    {searchResult.map((user) => {
                                        return (
                                            <UserListItem onClick={() => accessChat(user.id)} key={user.id} user={user} />
                                        )
                                    })}
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </main >
    )
}

export default SideDrawer;