import { NextResponse } from "next/server";

import { connectDB } from "@/app/libs/mongodb";
import User from '@/app/models/user'

const bcrypt = require('bcryptjs');

const todayDate = new Date();

const day = todayDate.getDate().toString().padStart(2, '0');
const month = (todayDate.getMonth() + 1).toString().padStart(2, '0'); 
const year = todayDate.getFullYear();
const hours = todayDate.getHours().toString().padStart(2, '0');
const minutes = todayDate.getMinutes().toString().padStart(2, '0');
const seconds = todayDate.getSeconds().toString().padStart(2, '0');

const dateString = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`; 

export async function POST(request: Request) {
  try {
    await connectDB();

    const { token, password, username  } = await request.json();
    const body = { token, password, username };

    const resultado = await User.findOne({ username: body.username });

    const usernameUpdate = await body.username;
    const isPasswordMatch = await bcrypt.compare(password, resultado.account.password);

    if (isPasswordMatch) {
      
      // Actualizar ultima conexion del usuario. 
      const doc = await User.updateOne(
        { username: usernameUpdate },
        { $set: { last_connection: dateString } }
      );

      return NextResponse.json({ resultado });
    } else {
      return NextResponse.json({ "error": "Contraseña incorrecta" }, { status: 500 });
    }
   
  } catch (err) {
    return NextResponse.json({ "error": "Internal Server Error" }, { status: 500 });
  }
}
