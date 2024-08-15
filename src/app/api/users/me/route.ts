import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function POST(request: NextRequest) {
    try {
        const UserId = await getDataFromToken(request);
        const user = await User.findOne({ _id: UserId }).select('-password');
        
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                data: null
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error:any) {
        return NextResponse.json({
            message: error.message
        }, { status: 500 });
    }
}
