import { Request, Response } from "express";
import { AppDataSource } from "../db/db";
import * as bcrypt from "bcrypt";
import { Students } from "../model/Students";
import { Parent } from "../model/Parents";

const successResponse = { status: '200', response: 'success' };

export const parentLogin = async (req: Request, res: Response) => {
    try {
        const parent = AppDataSource.getRepository(Parent);
        const user = await parent.findOneBy({ email: req.body.username });        
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            res.send({ status: '200', response: user });
        } else {
            res.send({ status: 401, response: 'user not valid' });
        }
    } catch (error) {
        res.send(error);
    }
}
export const studentCreation = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const parent = AppDataSource.getRepository(Parent);
        const user = await parent.findOneBy({ id: data.id })
        const student = AppDataSource.getRepository(Students);
        const child = new Students();
        child.age = data.age;
        child.class = data.class;
        child.firstName = data.firstname;
        child.lastName = data.lastname;
        child.status = data.status;
        child.parent = user
        await student.save(child);
        res.send(successResponse);
    } catch (error) {
        res.send(error)
    }

}

export const parentCreation = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const student = AppDataSource.getRepository(Parent);
        const child = new Parent();
        child.age = data.age;
        child.email = data.username;
        child.firstName = data.firstname;
        child.lastName = data.lastname;
        child.password = bcrypt.hashSync(data.password, 8);
        const response = await student.save(child)
        res.send(successResponse)
    } catch (error) {
        res.send(error)

    }
}

export const getStudentsById = async (req: Request, res: Response) => {
    try {
        const students = AppDataSource.getRepository(Students);
        const user = await students.find({ where: [{ parentId: req.params.id }] });
        res.send(user)
    } catch (error) {
        res.send(error)

    }
}

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const students = AppDataSource.getRepository(Students);
         await students.delete({  id: req.params.id });
        res.send(successResponse)
    } catch (error) {
        res.send(error)

    }
}