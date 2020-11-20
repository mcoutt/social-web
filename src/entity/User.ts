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
import {IUser} from "../interfaces/IUser";


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

    @ManyToMany(type => Group, group => group.users)
    groups: Group[];

    constructor(options: IUser = {}) {
        this.login = options.login;
        this.password = options.password;
        this.age = options.age;
        this.isDeleted = options.isDeleted;
    }

}
