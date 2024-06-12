import { NextResponse } from "next/server";
import { connectDB } from "@/app/libs/mongodb";
import User from "@/app/models/user";
import { v4 as uuidv4 } from 'uuid';

import { sendVerificationEmail } from '../../../libs/email'
// Crear cuentas
export async function POST(request: Request) {
  try {
    await connectDB();

    const { token, password, name, email, last_name, username, pp_image, rank, terms_and_conditions } = await request.json();
    const body = { token, password, name, email, last_name, username, pp_image, rank, terms_and_conditions };
    
    // Verificar si los términos y condiciones han sido aceptados
    if (!terms_and_conditions) {
      return NextResponse.json({ "error": "Los términos y condiciones no han sido aceptados" }, { status: 400 });
    }

    const usuarioExistente = await User.findOne({ username: body.username });
    const emailExistente = await User.findOne({ "account.email": body.email });

    const todayDate = new Date();
    const day = todayDate.getDate().toString().padStart(2, '0');
    const month = (todayDate.getMonth() + 1).toString().padStart(2, '0');
    const year = todayDate.getFullYear();
    const dateString = `${day}/${month}/${year}`;

    if (usuarioExistente) {

      return NextResponse.json({ "error": "Usuario ya registrado" }, { status: 500 });

    } else if (emailExistente) {

      return NextResponse.json({ "error": "Correo electrónico ya registrado" }, { status: 500 });

    } else {

      const emailToken = uuidv4();
      
      const nuevoUsuario = await User.create({
        username: username,
        avatar: "default",
        rank: rank,
        last_connection: dateString,
        account: {
          email: email,
          password: password,
          name: name,
          last_name: last_name,
        },
        terms_and_conditions: terms_and_conditions,
        email_verify: {
          isVerify: false,
          emailToken: emailToken,
        
        },
      });


      try {
        await sendVerificationEmail(email, emailToken, username);
        return new Response(JSON.stringify({ message: 'User has been created and verification email sent.' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ message: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // return NextResponse.json({ nuevoUsuario }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ "error": "Internal Server Error" }, { status: 500 });
  }
}