import Emotion from "@/app/models/emotion";
import { connectDB } from "@/app/libs/mongodb";
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    await connectDB();

    const queryParam = request.nextUrl.searchParams.get("emotion");

    if (!queryParam) {
        return NextResponse.json({ "error": "El parámetro 'emotion' es requerido" }, { status: 400 });
    }

    const search = await Emotion.findOne({ emotion: queryParam });

    if (search) {
        console.log('Frases enviadas');
        return NextResponse.json(search, { status: 200 });
    } else {
        return NextResponse.json({ "error": "No se encontraron datos" }, { status: 500 });
    }
}
