import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Students } from "./Students"

@Entity()
export class Parent {

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(type => Students, stud => stud.parent)
    child: Students[]

}
