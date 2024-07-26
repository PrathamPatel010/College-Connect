import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import React from 'react'
import { DialogTitle } from '../ui/dialog';
import { User } from '../../Context/ChatProvider';

interface Props {
    user: User,
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UserProfileModal = ({ user, isModalOpen, setIsModalOpen }: Props) => {
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <button className="hidden">Open Dialog</button>
            </DialogTrigger>
            <DialogContent className="w-full h-full">
                <DialogTitle className="text-center">User Profile</DialogTitle>
                <div className="flex flex-col items-center space-y-4">
                    <img className="rounded-full w-20 h-20" src={user?.pic} alt="Profile" />
                    <div>Username - {user?.username}</div>
                    <DialogClose asChild>
                        <button className="btn">Close</button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserProfileModal;