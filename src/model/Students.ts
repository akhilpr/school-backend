import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Parent } from "./Parents"

@Entity()
export class Students {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    class: string

    @Column()
    status: string

    @Column()
    parentId: string

    @ManyToOne(type => Parent, par => par.child)
    @JoinColumn()
    parent

}
