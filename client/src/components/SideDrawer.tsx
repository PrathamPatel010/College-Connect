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
import { ChatState } from "../Context/ChatProvider";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";


const SideDrawer = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const userData = ChatState();
    const user = userData?.user;

    return (
        <main className="px-2">
            <div className="flex justify-between items-center border-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button className="bg-gray-300" color="primary px-4">
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
                                <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
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
                </div>
            </div>
        </main >
    )
}

export default SideDrawer;