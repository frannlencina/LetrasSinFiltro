import { NextResponse } from "next/server";

import { connectDB } from "@/app/libs/mongodb";
import User from '@/app/models/user'

const jwt = require('jsonwebtoken');
const JSONWKEY = process.env.JSONWKEY;

export async function POST(request: Request) {
  try {
    await connectDB();

    const { token, password, name, last_name, username, email, pp_image, rank } = await request.json();
    const body = { token, password, name, last_name, username, email, pp_image, rank };

    const resultado = await User.findOne({ username: body.username, password: body.password });

    if (resultado && resultado.username ) {
      const datosToken = { datosToken: resultado.username };
      const tokenJWT = jwt.sign(datosToken, JSONWKEY, { expiresIn: '1h' });

      console.log('Datos encontrados:', resultado);

      return NextResponse.json({ tokenJWT, resultado });
    } else {
      console.log('TOKEN UNDEFINED');
      return NextResponse.json({ "error": "TOKEN UNDEFINED" }, { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ "error": "Internal Server Error" }, { status: 500 });
  }
}
