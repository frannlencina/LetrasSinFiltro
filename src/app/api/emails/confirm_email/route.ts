import { NextResponse } from "next/server";
import User from "@/app/models/user";

export async function POST(request: Request) {
  try {
    const { token, username } = await request.json();

    const user = await User.findOne({
      "email_verify.emailToken": token as string,
    });

    if (!user) {
      // Si no se encuentra un usuario con el token proporcionado, devuelve una respuesta de error.
      return NextResponse.json(
        { message: "User not found. Check your email for the verification link." },
        { status: 404 }
      );
    }

    // Actualizar ultima conexion del usuario. 
    const doc = await User.updateOne(
      { username: username },
      { $set: { 'email_verify.emailToken': token } }
    );

    // Si el usuario es encontrado, actualiza su registro para marcar el email como verificado.
    await User.findOneAndUpdate(
      { "email_verify.emailToken": token },
      {
        $set: {
          "email_verify.isVerify": true,
          "email_verify.emailToken": null, // Limpia el token de verificación.
        },
      }
    );

    // Devuelve una respuesta exitosa si el email fue verificado correctamente.
    return NextResponse.json(
      { user: user, message: `Email verified! ${user.email}` },
      { status: 200 }
    );
  } catch (error) {
    // Maneja cualquier error inesperado y devuelve una respuesta de error del servidor.
    return new NextResponse("Failed to send message. => " + error, {
      status: 500,
    });
  }
}
