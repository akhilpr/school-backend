import { Express } from "express";
import {
    createAdmin, adminLogin, getAllStudents, updateStudentStatus
} from "../controller/admin.controler";
import {
    studentCreation, parentCreation,
    parentLogin, getStudentsById, deleteStudent
} from "../controller/parent.controler";

export default (app: Express) => {
    app.get('/', createAdmin);
    app.post('/validateAdmin', adminLogin);
    app.post('/validateParent', parentLogin);
    app.post('/createParent', parentCreation);
    app.get('/getAllStudents', getAllStudents);
    app.post('/createStudent', studentCreation);
    app.get('/getStudentsById/:id', getStudentsById);
    app.post('/updateStudentStatus', updateStudentStatus);
    app.delete('/deleteStudent/:id', deleteStudent);
}