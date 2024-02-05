import { NextResponse } from "next/server";
import { connectDB } from "@/app/libs/mongodb";
import Emotion from "@/app/models/emotion";

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url)
        const emotion = searchParams.get('emotion')

        const search = await Emotion.findOne({ emotion: emotion });

        if (search) {
            console.log('Frases enviadas')
            return NextResponse.json(search, {status: 200});
        } else {
            return NextResponse.json({ "error": "No se encontraron datos" }, {status: 500});
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ "error": "Error interno del servidor" });
    }
}

