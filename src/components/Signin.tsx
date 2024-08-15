"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Signin() {
  const { toast } = useToast();
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email",
    }),
    password: z
      .string()
      .min(7, {
        message: "Password length must be greater than 7",
      })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/, {
        message:
          "Your password must contain at least one letter, one number, and one special character",
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    try {
      const response = await axios.post("/api/users/signin", data);
      toast({
        title: "Login Successfully",
        
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue in login to your account",
      });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <h1 className="text-center text-5xl text-white font-semibold mb-8">
        Login to your Account
      </h1>
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-indigo-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write Email"
                      {...field}
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Enter your email.
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
                  <FormLabel className="text-indigo-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write Password"
                      {...field}
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <div className="flex justify-between">
                    <FormDescription className="text-gray-500">
                      Set your password.
                    </FormDescription>
                    <FormDescription className="text-gray-600 font-semibold">
                      <Link href="/resetpassword" className="hover:underline">
                        Forget Password?
                      </Link>
                    </FormDescription>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-3 text-white bg-indigo-700 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default Signin;
