import {Container} from "typedi";
import {EntityManager, getConnection, getRepository, Like, Repository, UpdateResult} from "typeorm";
import {IUser, IUserInputDTO} from "../interfaces/IUser";
import {User} from "../entity/User";
import {delUserGroups} from "./group";
import {UserService} from "../services/user";


export class UserDataAccess {

    // private userRepo: Repository<IUser> = getRepository(User)


    public static async addUser(options: IUserInputDTO): Promise<IUser> {
        const userService: UserService = Container.get(UserService)
        return await userService.createUser(options)
    }

    public static async getUser(userId: string): Promise<IUser> {
        try {
            const userService: UserService = Container.get(UserService)
            return await userService.GetUser(userId)
        } catch (e) {
            console.log(e)
        }
    }

    public static async updateUser(options: IUserInputDTO): Promise<IUserInputDTO> {
        try {
            const userService: UserService = Container.get(UserService)
            return await userService.updateUser(options)
             // return await getRepository(User)
             //    .createQueryBuilder()
             //    .update(User)
             //    .set(options)
             //    .where("id = :id", {id: options.id})
             //    .execute()
        } catch (e) {
            console.log(e)
        }
    }

    public static async deleteUser(id: string): Promise<IUser> {
        try {
            // let user: any
            //     const userRepo: Repository<User> = manager.getRepository(User);
            //     user = await userRepo.findOne(id, {relations: ["groups"]})
            //     const groupId = user.groups[0].id.toString()
            //     const userIdArray = Array.of(user.id)
            const user = {
                id: id,
                isDeleted: true
            }
            const userService: UserService = Container.get(UserService)
            return await userService.deleteUser(user)

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
