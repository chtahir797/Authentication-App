import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const reqBody = await request.json();
        const { email } = reqBody;

        // Find the user by email
        const user = await User.findOne({ email }); // Add await here

        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 400,
                }
            );
        }

        // Send verification email with user ID
        await sendEmail({ email, emailType: "RESET", userId: user._id });

        return NextResponse.json({
            message: "Email sent successfully",
            success: true,
        });
    } catch (error:any) {
        return NextResponse.json(
            {
                message: "An error occurred",
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
