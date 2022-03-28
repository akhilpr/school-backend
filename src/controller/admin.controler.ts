import { Request, Response } from "express";
import { AppDataSource } from "../db/db";
import { Admin } from "../model/Admin";
import * as bcrypt from "bcrypt";
import { Students } from "../model/Students";

const db = AppDataSource.getRepository(Admin);
const successResponse = { status: '200', response: 'success' };
export const createAdmin = async (req: Request, res: Response) => {
    try {
        const newUser = new Admin()
        newUser.firstName = "akhil"
        newUser.lastName = "pr"
        newUser.userName = 'admin@admin.com'
        newUser.password = bcrypt.hashSync('admin', 8);
        const users = await db.findOneBy({ userName: newUser.userName })
        if (!users) {
            await db.save(newUser)
            res.sendStatus(200)
        } else {
            res.send('user already created')
        }
    } catch (error) {
        res.send(error)
    }
}
export const adminLogin = async (req: Request, res: Response) => {
    try {
        const user = await db.findOneBy({ userName: req.body.username })
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            res.send(successResponse)
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        res.send(error)
    }

}
export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const students = AppDataSource.getRepository(Students);
        const user = await students.find();
        res.send(user)
    } catch (error) {
        res.send(error)

    }
}
export const updateStudentStatus = async (req: Request, res: Response) => {
    try {
        const students = AppDataSource.getRepository(Students);
        const user = await students.update({ id: req.body.id }, { status: req.body.status });
        res.send(user)
    } catch (error) {
        res.send(error)

    }
}