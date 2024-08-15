import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export function getDataFromToken(request:NextRequest){
    try {
        const token = request.cookies.get("token")?.value || ""
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!)
        const id = decodedToken.id
        return id
    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        })
    }
}