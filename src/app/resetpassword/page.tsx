

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"
import axios from "axios";
import { useRouter } from "next/navigation"; 

function Page() {
  const { toast } = useToast()
  const router = useRouter()
  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email",
    })
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    try {
      const response = await axios.post('/api/users/reset',data) 
      toast({
        title: "SUCCESS",
        description: "Reset email sent to your address"
        
      })
      router.push('/signin');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue in sending",
      });
    }
    
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <h1 className="text-center text-5xl text-white font-semibold mb-8">
        Reset your password
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 text-white bg-indigo-700 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500"
            >
              Reset Password 
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default Page;
