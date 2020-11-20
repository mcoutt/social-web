import {Container} from "typedi";
import {EntityManager, getConnection, getRepository, Like, Repository, UpdateResult} from "typeorm";
import {IUser} from "../interfaces/IUser";
import {User} from "../entity/User";
import {delUserGroups} from "./group";
import {UserService} from "../services/user";


export class UserDataAccess {

    public static async addUser(options: IUser): Promise<IUser> {
        try {
            const userService: UserService = Container.get(UserService)
            return await userService.createUser(options)
        } catch (e) {
            console.log(e)
        }
    }

    public static async getUser(userId: string): Promise<IUser | string> {
        try {
            const userService: UserService = Container.get(UserService)
            return await userService.GetUser(userId)
        } catch (e) {
            console.log(e)
        }
    }

    public static async updateUser(id: string, options: IUser): Promise<IUser | string> {
        try {
            options.id = id
            const userService: UserService = Container.get(UserService)
            return await userService.updateUser(options)
        } catch (e) {
            console.log(e)
        }
    }

    public static async deleteUser(userId: string): Promise<IUser | string> {
        try {
            // let user: any
            //     const userRepo: Repository<User> = manager.getRepository(User);
            //     user = await userRepo.findOne(id, {relations: ["groups"]})
            //     const groupId = user.groups[0].id.toString()
            //     const userIdArray = Array.of(user.id)
            const userService: UserService = Container.get(UserService)
            return await userService.deleteUser(userId)

            // user.isDeleted = true
            // await userRepo.save(user)
            // await delUserGroups(userIdArray, groupId)
            // return user

        } catch (e) {
            console.log(e)
        }
    }

    public static async userList(): Promise<IUser[]> {
        try {
            const userService: UserService = Container.get(UserService)
            return await userService.GetUsers()
        } catch (e) {
            console.log(e)
        }
    }

    public static async getSuggestUsers(login: string, queryLimit: number): Promise<IUser | IUser[]> {
        try {
            const userRepo: Repository<IUser> = getRepository(User);

            let result: any
            await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
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
