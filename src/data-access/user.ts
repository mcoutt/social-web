import {Container} from "typedi";
import {EntityManager, getConnection, Like, Repository} from "typeorm";
import {IUser, IUserInputDTO} from "../interfaces/IUser";
import {User} from "../db";
import {delUserGroups} from "./group";


export class UserDataAccess {
    constructor(container) {
        this.userModel = Container.get("userModel")
    }
    public static async addUser(options: IUserInputDTO): Promise<User> {
        let user: User
        await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
            const userRepo: Repository<User> = manager.getRepository(User);
            user = new User(options);
            await userRepo.insert(user)
        })
        return user
    }

    public static async getUser(userId: string): Promise<User> {
        try {
            let user: User
            await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
                const userRepo: Repository<User> = manager.getRepository(User);
                user = await userRepo.createQueryBuilder("user")
                    .leftJoinAndSelect("user.groups", "group")
                    .andWhere("user.id = :id", {id: userId})
                    .getOne()
            })
            return user
        } catch (e) {
            console.log(e)
        }
    }

    public static async updateUser(options: IUserInputDTO): Promise<User> {
        try {
            let user: User
            await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
                const userRepo: Repository<User> = manager.getRepository(User);
                user = await userRepo.findOne(options.id)
                user.login = options.login ? options.login : user.login
                user.password = options.password ? options.password : user.password
                user.age = options.age ? options.age : user.age
                await userRepo.save(user)
            })
            return user
        } catch (e) {
            console.log(e)
        }
    }

    public static async deleteUser(id: string): Promise<IUser> {
        try {
            let user: any
            await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
                const userRepo: Repository<User> = manager.getRepository(User);
                user = await userRepo.findOne(id, {relations: ["groups"]})
                const groupId = user.groups[0].id.toString()
                const userIdArray = Array.of(user.id)
                user.isDeleted = true
                await userRepo.save(user)
                await delUserGroups(userIdArray, groupId)
            })
            return user
        } catch (e) {
            console.log(e)
        }
    }

    public static async userList(): Promise<User[]> {
        try {
            let users: User[]
            await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
                const userRepo: Repository<User> = manager.getRepository(User);
                users = await userRepo.createQueryBuilder("user")
                    .leftJoinAndSelect("user.groups", "group")
                    .getMany()
            })
            return users
        } catch (e) {
            console.log(e)
        }
    }

    public static async getSuggestUsers(login: string, queryLimit: number): Promise<IUser | IUser[]> {
        try {
            let result: any
            await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
                const userRepo: Repository<User> = await manager.getRepository(User)
                result = await userRepo.find({
                where: {
                    login: Like(`%${login}%`)
                },
                        take: queryLimit
                })
            })
            return result
        } catch (e) {
            console.log(e)
        }
    }
}