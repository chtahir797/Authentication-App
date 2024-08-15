"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  const { profile } = useParams(); 
  const [userData, setUserData] = useState<any>([]);

  const getUser = async () => {
    try {
      const response = await axios.post("/api/users/me");
      setUserData(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []); 

  return (
    <div className="h-screen bg-orange-600 flex justify-center items-center flex-col gap-10">
      

      <h1 className="text-white font-bold">Welcome {userData.username}</h1>
      <h2 className="text-white font-medium">Your Email {userData.email}</h2>
      <Link href="/dashboard"><Button>Go back</Button></Link>
    </div>
  );
}

export default Page;
