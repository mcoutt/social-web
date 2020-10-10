// import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
//
// @Entity()
// export class User {
//
//     @PrimaryGeneratedColumn()
//     id: number;
//
//     @Column()
//     firstName: string;
//
//     @Column()
//     lastName: string;
//
//     @Column()
//     age: number;
//
// }

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
    ManyToMany
} from "typeorm";
import {Group} from "./Group";


export interface UserOptions {
    login?: string;
    password?: string;
    age?: number;
    isDeleted?: boolean
}


@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    login: string;

    @Column("varchar")
    password: string;

    @Column("integer")
    age: number;

    @Column("boolean", {default: true})
    isDeleted: boolean;

    @CreateDateColumn({nullable: true})
    public createDate: Date;

    @UpdateDateColumn({nullable: true})
    public updateDate: Date;

    // @ManyToMany(type => Group, group => group.users)
    // groups: Group[];

    constructor(options: UserOptions = {}) {
        this.login = options.login;
        this.password = options.password;
        this.age = options.age;
        this.isDeleted = options.isDeleted;
    }

}
