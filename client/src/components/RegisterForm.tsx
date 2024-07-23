"use client"
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { toast } from "./ui/use-toast"
import Header from "./ui/Header";
import { useState } from "react";
import { Toaster } from './ui/toaster';
import { apiClient } from '../services/apiClient';
import { CLOUD_NAME, CLOUDINARY_URL, UPLOAD_PRESET } from '../config/serverConfig';

const FormSchema = z.object({
    email: z.string().email(),
    username: z.string().min(4, {
        message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    pic: z.string().optional(),
});

function RegisterForm() {
    const [pic, setPic] = useState<File | null>(null);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            pic: "",
        },
    })

    const uploadPicture = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("cloud_name", CLOUD_NAME);
        const response = await axios.post(CLOUDINARY_URL, formData);
        return response.data.secure_url;
    };

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            let pictureUrl = "";
            let formData = { ...data };
            if (pic) {
                pictureUrl = await uploadPicture(pic);
                formData = { ...data, pic: pictureUrl };
            }
            const response = await apiClient.post('/auth/signup', formData);
            toast({
                title: response.data.success ? "User registered successfully!" : "Uh oh! Something went wrong.",
                description: response.data.success ? "Check your email to verify account" : response.data.message,
                status: response.data.success ? 'success' : 'error'
            });
        } catch (err) {
            toast({
                title: "Registration Failed",
                description: (axios.isAxiosError(err) && err.response?.data?.message) || "An unexpected error occurred. Please try again.",
                status: "error",
                variant: 'destructive',
            });
        }
    }

    return (
        <>
            <div className="mt-5 pt-5">
                <Header />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4 pt-10">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='w-80 px-5'>
                                    <FormLabel>Enter Email:</FormLabel>
                                    <FormControl>
                                        <Input placeholder="EN_NO@mbit.edu.in" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Use your MBIT college mail only
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className='w-80 px-5'>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="funnyGuy" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Refrain from using your real name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className='w-80 px-5'>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Pas$code" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Password must be of atleast 8 characters
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <FormLabel>Profile Picture (Optional)</FormLabel>
                            <FormControl>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPic(e.target.files ? e.target.files[0] : null)}
                                    className="hover:cursor-pointer block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100"
                                />
                            </FormControl>
                        </FormItem>
                        <Button className="hover:bg-gray-400" type="submit">Sign up</Button>
                        <a href='/' className='underline'>Already a user?</a>
                    </form>
                </Form>
            </div>
            <div>
                <Toaster />
            </div>
        </>
    )
}

export default RegisterForm;