import { NextResponse } from "next/server";
import { connectDB } from "@/app/libs/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import User from "@/app/models/user";

// Crear cuentas
export async function POST(request: Request) {
  try {

    const { token, password, name, email, last_name, username, pp_image, rank } = await request.json();
    const body = { token, password, name, email, last_name, username, pp_image, rank };
    
    const usuarioExistente = await User.findOne({ username: body.username });
    const emailExistente = await User.findOne({ "account.email": body.email });

    const todayDate = new Date();
    const day = todayDate.getDate().toString().padStart(2, '0');
    const month = (todayDate.getMonth() + 1).toString().padStart(2, '0');
    const year = todayDate.getFullYear();
    const dateString = `${day}/${month}/${year}`;

    if (usuarioExistente) {

      console.log('El usuario ya existe');
      return NextResponse.json({ "error": "Usuario ya registrado" }, { status: 500 });

    } else if (emailExistente) {

      console.log('El correo electrónico ya está registrado');
      return NextResponse.json({ "error": "Correo electrónico ya registrado" }, { status: 500 });

    } else {

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
        
      });

      console.log('Usuario creado exitosamente => :', nuevoUsuario);
      return NextResponse.json({ nuevoUsuario }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ "error": "Internal Server Error" }, { status: 500 });
  }
}

// Agarrar cuentas
export async function GET(request: Request) {

  try {
    await connectDB();

    const { username } = await request.json();

    const body = { username };

    console.log(body);

    const search = await User.findOne({ username: body.username });

    if (search) {
      console.log('Cuentas encontradas => :' + search);
      return NextResponse.json(search);
    } else {
      return NextResponse.json({ "error": "No se encontraron datos" });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ "error": "Error interno del servidor" });
  }
}

// Eliminar cuentas por username
export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { username } = await request.json();

    const allSearch = await User.findByIdAndDelete(username);

    if (allSearch) {
      console.log('Cuenta eliminada => :' + allSearch);
      return NextResponse.json(allSearch);
    } else {
      return NextResponse.json({ "error": "No se encontraron datos" });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ "error": "Internal Server Error pene pene" });
  }
}