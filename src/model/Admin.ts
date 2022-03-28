import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Admin {

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    userName: string

    @Column()
    password: string

}
