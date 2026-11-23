import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";



const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUserIntoDB(req.body)

        res.status(201).json({
            success: true,
            message: " user created",
            data: result.rows[0]
        })

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        })
    }
}

const getAllUsers = async (req: Request, res: Response) => {

    try {
        const result = await userService.getAllusersFromDB();

        res.status(201).json({
            success: true,
            message: "users ritrived successfully",
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error

        })
    }
};

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userService.getSingleUserFromDB(id as string)
        // console.log(result);

        if (result.rowCount === 0) {

            res.status(404).json({
                success: false,
                message: "user not found",

            })
        }

        res.status(201).json({
            success: true,
            message: "user ritrived successfully",
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error

        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await userService.updateUserFromDB(req.body, id as string)

        // console.log(result);

        if (result.rowCount === 0) {

            res.status(404).json({
                success: false,
                message: "user not found",

            })
        }

        res.status(200).json({
            success: true,
            message: "user updated successfully",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error

        })
    }
}

const deleteUser =  async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
         const result = await userService.deleteUserFromBD(id as string)

        if (result.rowCount === 0) {

            res.status(404).json({
                success: false,
                message: "user not found",

            })
        }

        // console.log(result);

        res.status(201).json({
            success: true,
            message: "user delete successfully",
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error

        })
    }
}


export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}