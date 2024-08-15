// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import axios from "axios";
// import { useRouter, useSearchParams } from "next/navigation"; 

// function Page() {
//   const { toast } = useToast();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Retrieve token from URL parameters
//   const token = searchParams.get("token");


//   // If no token is present, redirect to the sign-in page
//   if (!token) {
//     router.push("/signin");
//     return null;
//   }

//   // Form validation schema
//   const formSchema = z.object({
//     password: z
//       .string()
//       .min(7, {
//         message: "Password length must be greater than 7",
//       })
//       .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/, {
//         message:
//           "Your password must contain at least one letter, one number, and one special character",
//       }),
//     confirmPassword: z.string().min(7, { message: "Please confirm your password" }),
//   }).refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Passwords don't match",
//   });

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     try {
//       await axios.patch('/api/users/createpassword', { 
//         password: data.password, 
//         token 
//       });
//       toast({
//         title: "Password Reset Successfully",
//         description: "Please log in with your new password.",
//       });
//       router.push('/signin');
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "There was an issue resetting your password.",
//       });
//     }
//   };

//   return (
//     <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
//       <h1 className="text-center text-5xl text-white font-semibold mb-8">
//         Reset Your Password
//       </h1>
//       <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-indigo-700">Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Write Password"
//                       {...field}
//                       type="password"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="confirmPassword"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-indigo-700">Confirm Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Confirm Password"
//                       {...field}
//                       type="password"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               type="submit"
//               className="w-full py-3 text-white bg-indigo-700 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500"
//             >
//               Reset Password
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </section>
//   );
// }

// export default Page;











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
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const formSchema = z.object({
  password: z
    .string()
    .min(7, {
      message: "Password length must be greater than 7",
    })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/, {
      message:
        "Your password must contain at least one letter, one number, and one special character",
    }),
  confirmPassword: z.string().min(7, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords don't match",
});

function CreateNewPasswordForm() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
    } else {
      router.push("/signin");
    }
  }, [searchParams, router]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.patch('/api/users/createpassword', { 
        password: data.password, 
        token 
      });
      toast({
        title: "Password Reset Successfully",
        description: "Please log in with your new password.",
      });
      router.push('/signin');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue resetting your password.",
      });
    }
  };

  if (!token) return null;

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <h1 className="text-center text-5xl text-white font-semibold mb-8">
        Reset Your Password
      </h1>
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-indigo-700">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      {...field}
                      type="password"
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

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateNewPasswordForm />
    </Suspense>
  );
}

export default Page;
