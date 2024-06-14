'use client'
import Cookies from "js-cookie";
import { verifyAndDecodeJWT } from "./VerifyAndDecodeJSWT";

export const getLoginData = () => {
    const userData = verifyAndDecodeJWT(Cookies.get('tokenFirmado'))
    return userData;
}