import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from '@/dbConfig/dbConfig';
import bcrypt from 'bcryptjs';
connect();

export async function PATCH(request: NextRequest) {
   try {
    const reqBody = await request.json();
    const { password, token } = reqBody;

    const salt = await bcrypt.genSalt(10); // Await the salt generation
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
        return NextResponse.json(
            { message: "Invalid Token" },
            { status: 400 }
        );
    }

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
        message: "Password Changed Successfully"
    });
   } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },{
            status:500
        })
   }
}
