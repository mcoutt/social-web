import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
} from "typeorm";
import {User} from "./User";
import {IGroup} from "../interfaces/IGroup";


@Entity()
export class Group {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar")
    name: string;

    @Column({
        type: "enum",
        enum: [
            'READ',
            'WRITE',
            'DELETE',
            'SHARE',
            'UPLOAD_FILES'
        ],
        array: true,
        default: ["READ",]
    })
    permissions: string[];

    @CreateDateColumn({nullable: true})
    public createDate: Date;

    @UpdateDateColumn({nullable: true})
    public updateDate: Date;

    @ManyToMany(type => User, user => user.groups)
    @JoinTable()
    users: User[];

    constructor(options: IGroup = {}) {
        this.name = options.name;
        this.permissions = options.permissions;
    }

}
