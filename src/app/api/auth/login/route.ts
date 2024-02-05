import { NextResponse } from "next/server";

import { connectDB } from "@/app/libs/mongodb";
import User from '@/app/models/user'

const jwt = require('jsonwebtoken');
const JSONWKEY = process.env.JSONWKEY;

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

    console.log(resultado.account.password)

    const usernameUpdate = await body.username;
    
    if (resultado.account.password == body.password ) {

      const datosToken = { datosToken: resultado.username };
      const tokenJWT = jwt.sign(datosToken, JSONWKEY, { expiresIn: '1h' });
      
      // Actualizar ultima conexion del usuario. 
      const doc = await User.updateOne(
        { username: usernameUpdate },
        { $set: { last_connection: dateString } }
      );

      console.log(doc)

      // console.log('Datos encontrados:', resultado);

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
