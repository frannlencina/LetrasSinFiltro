import User from "@/app/models/user";
import { connectDB } from "@/app/libs/mongodb";
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {

    const queryParam = request.nextUrl.searchParams.get("username");

    if (!queryParam) {
        return NextResponse.json({ "error": "El parámetro 'username' es requerido" }, { status: 400 });
    }

    const search = await User.findOne({ username: queryParam }).select('-account.password');

    if (search) {
        console.log('Frases enviadas');
        return NextResponse.json(search, { status: 200 });
    } else {
        return NextResponse.json({ "error": "No se encontraron datos" }, { status: 500 });
    }
}
