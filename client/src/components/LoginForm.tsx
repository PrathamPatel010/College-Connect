import { z } from "zod";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { apiClient } from "../services/apiClient";
import { useNavigate } from "react-router-dom";
import Heading from "./ui/Heading";
import { toast } from "./ui/use-toast";
import axios from "axios";
import { Toaster } from "./ui/toaster";
import { cn } from "../lib/utils";

const LoginForm = () => {
    const navigate = useNavigate();
    const formSchema = z.object({
        username: z.string().min(4, {
            message: "Username must be at least 4 characters.",
        }),
        password: z.string().min(8, {
            message: 'Password must of at least 8 characters'
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { data } = await apiClient.post('/auth/signin', values);
            await localStorage.setItem('info', JSON.stringify(data.data));
            toast({
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                title: data.success ? "User Signed-In successfully!" : "Uh oh! Something went wrong.",
                description: data.success ? "Please Wait..." : data.message,
                status: data.success ? 'success' : 'error'
            });
            setTimeout(() => {
                navigate('/chats');
            }, 1000);
        } catch (err) {
            toast({
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                title: "Login Failed",
                description: (axios.isAxiosError(err) && err.response?.data?.message) || "An unexpected error occurred. Please try again.",
                status: "error",
                variant: 'destructive',
            });
        }
    }

    return (
        <>
            <Heading text="Login" />
            <Form {...form}>
                <form className="pt-5 flex flex-col items-center space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="w-80 px-5">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter your username
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-80 px-5">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Pas$Word" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter your password
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="hover:bg-gray-400" type="submit">Login</Button>
                    <a href='/signup' className='underline'>Haven't signed up yet?</a>
                </form>
            </Form>
            <div>
                <Toaster />
            </div>
        </>
    )
}

export default LoginForm;