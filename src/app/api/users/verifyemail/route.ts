import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { token } = reqBody;

    // Log the token for debugging
    console.log('Received token:', token);

    // Find the user with the provided token and check token expiry
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // If no user is found, return an error response
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid Token' },
        { status: 400 }
      );
    }

    // Log the user for debugging
    console.log('User found:', user);

    // Update user verification status and remove token
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    // Save the user
    await user.save();

    // Return a success response
    return NextResponse.json(
      { message: 'Email Verified', success: true },
      { status: 200 } // Changed to 200 for successful requests
    );

  } catch (error: any) {
    // Log the error for debugging
    console.error('Error during email verification:', error);

    // Return an error response
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
