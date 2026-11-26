import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../db";
import type { LUser } from "../users/user.interface";
import config from "../../config";

const loginUserIntoDB = async (payload: LUser) => {
    // console.log(payload);
    const { email, password } = payload

    // 1 cheak if the user exist
    // 2 cheak if the password match
    // 3 cheak the user status 
    // 4 if pass all then genarate jwt token
    const user = await pool.query(`
          SELECT * FROM users WHERE email=$1`, [email])


    // console.log(user.rows[0]);
    if (user.rowCount === 0) {
        throw new Error("Invalid Credensials")
    }

    const matchPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!matchPassword) {
        throw new Error("Invalid Credensials")
    }

    if (!user.rows[0].is_active) {
        throw new Error("Access denided")
    }

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_secret, { expiresIn:"1d" });

    delete user.rows[0].password;
    console.log({ accessToken, data: user.rows[0] });
    return { accessToken, data: user.rows[0] }
}

export const authService = {
    loginUserIntoDB
}