import { NextResponse } from "next/server";
import { connectDB } from "@/app/libs/mongodb";
import User from "@/app/models/user";

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url)
        const usernamee = searchParams.get('username')

        const search = await User.findOne({ username: usernamee });

        if (search) {
            console.log('Cuentas encontradas => :' + search);
            return NextResponse.json(search, {status: 200});
        } else {
            return NextResponse.json({ "error": "No se encontraron datos" }, {status: 500});
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ "error": "Error interno del servidor" });
    }
}

