import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody: any = await request.json(); 
        const { username, email, password } = reqBody; 
        console.log(reqBody);

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10); // Await the salt generation
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const saveUser = await newUser.save();

        // Get the saved user's ID
        const userId = saveUser._id;

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId });

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            user: saveUser,
        });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
