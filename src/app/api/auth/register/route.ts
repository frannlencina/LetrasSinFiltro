import { NextResponse } from "next/server";
import { connectDB } from "@/app/libs/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import User from "@/app/models/user";

// Crear cuentas
export async function POST(request: Request) {
  try {
    await connectDB();

    const { token, password, name, last_name, username, pp_image, rank } = await request.json();
    const body = { token, password, name, last_name, username, pp_image, rank };
    console.log(body)
    const resultado = await User.findOne({ username: body.username });

    if (resultado && resultado.username) {

      console.log('El usuario ya existe => :', resultado);
      return NextResponse.json({ resultado });
    } else {

      User.create({
        name: name,
        last_name: last_name,
        username: username,
        password: password,
        pp_image: pp_image,
        rank: rank,

      })
      console.log('Noticia creada exitosamente => :', resultado);
      return NextResponse.json({ resultado });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ "error": "Internal Server Error" }, { status: 500 });
  }
}

// Agarrar cuentas
export async function GET(request: Request) {
  try {
    await connectDB();  // Asegurarse de que connectDB() funcione correctamente

    const allSearch = await User.find({});

    if (allSearch) {
      console.log('Cuentas encontradas => :' + allSearch);
      return NextResponse.json(allSearch);
    } else {
      return NextResponse.json({ "error": "No se encontraron datos" });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ "error": "Internal Server Error" });
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