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
import { Cloudinary } from "@cloudinary/url-gen/index";

const FormSchema = z.object({
    email: z.string().email(),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    picture: z.string().optional(),
});

function RegisterForm() {
    const [picture, setPicture] = useState<File | null>(null);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            picture: "",
        },
    })

    const uploadPicture = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "<preset-name>");
        formData.append("cloud_name", "<cloud-name>");
        const response = await axios.post(`https://api.cloudinary.com/v1_1/<cloud-name>/image/upload`, formData);
        console.log("Pic uploaded: ", response.data);
        return response.data.secure_url;
    };

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        let pictureUrl = "";
        if (picture) {
            pictureUrl = await uploadPicture(picture);
        }
        const formData = { ...data, picture: pictureUrl };
        console.log(formData);
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <div className="flex flex-col justify-center items-center mt-5 pt-5">
            <Header />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-70 lg:w-96 space-y-4 pt-10">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
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
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="funnyGuy" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Refrain from entering your real name
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Pas$code" {...field} />
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
                                onChange={(e) => setPicture(e.target.files ? e.target.files[0] : null)}
                                className="hover:cursor-pointer block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100"
                            />
                        </FormControl>
                    </FormItem>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default RegisterForm;