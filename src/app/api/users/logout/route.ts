import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true
        }, {
            status: 200 // Change to 200 for a successful logout
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Set expiration date to a past date
            path: '/signin',
            domain: String(process.env.DOMAIN) 
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        });
    }
}
