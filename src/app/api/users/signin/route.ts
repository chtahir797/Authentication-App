import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
connect()
export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, {
                status: 400
            })
        }
        const validPassword = await bcrypt.compare(password, user.password)


        if (!validPassword) {
            return NextResponse.json({
                message: "Check your credentials"
            }, {
                status: 400
            })
        }
        console.log(user)
        if(!user.isVerified){
            return NextResponse.json({
                message:"User is not Verified",
                success:false
            },{
                status:500
            })
        }
        const TokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(TokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}