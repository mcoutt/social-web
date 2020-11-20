import {Service, Inject} from 'typedi';
import {IUser} from "../interfaces/IUser";
import {UserRepository} from "../repository/user";
import {runOnTransactionCommit, Transactional} from "typeorm-transactional-cls-hooked";
import {OrmRepository} from "typeorm-typedi-extensions";
import {getCustomRepository, UpdateResult} from "typeorm";
import {GroupRepository} from "../repository/group";


@Service()
export class UserService {
    constructor(
        protected repository: UserRepository = getCustomRepository(UserRepository)
    ) {
    }

    @Transactional()
    async createUser(options: IUser): Promise<IUser | object> {
        try {
            const exist = await this.repository.findOneUserByName(options.login)
            if (exist) {
                if (options.login === exist.login) {
                    return {
                        data: `User with this login: ${exist.login} exist already. Please choose another login name..`
                    }
                }
            }
            return await this.repository.createUser(options)
        } catch (e) {
            console.log(e)
            return e.message
        }
    }

    @Transactional()
    public async GetUsers(): Promise<IUser[]> {
        try {
            return this.repository.allUsers()
        } catch (e) {
            console.log(e)
            return e.message
        }
    }

    @Transactional()
    public async GetUser(id: string): Promise<IUser | string> {
        try {
            const exist = await this.repository.findOneUser(id)
            if (!exist) {
                return `User with this id: ${id} doesn't exist. Please choose another id..`
            }
        } catch (e) {
            console.log(e)
            return e.message
        }

    }

    @Transactional()
    async checkUser(userId: string): Promise<boolean | string> {
        const _user: IUser | string = await this.GetUser(userId)
        if (typeof _user === 'string') {
            return _user;
        }
        return false;
    }

    @Transactional()
    public async updateUser(user: IUser): Promise<IUser | string> {
        try {
            const userNotExist = await this.checkUser(user.id)
            if (userNotExist === false) {
                return await this.repository.updateUser(user)
            } else if (typeof userNotExist === 'string') {
                return userNotExist
            }
        } catch (e) {
            console.log(e)
            return e.message
        }
    }

    @Transactional()
    public async deleteUser(userId: string): Promise<IUser | string> {
        try {
            const user: IUser | string = await this.updateUser({
                id: userId,
                isDeleted: true
            })
            if (typeof user === 'string') {
                return user
            } else {
                return await this.repository.removeUserFromGroup(user.id)
            }
        } catch (e) {
            console.log(e)
            return e.message
        }
    }
}


// public async GetSuggestUser(userSuggest: ISuggest): Promise<[]> {
//             try {
//                 return this.userModel.findAll({
//                     where: {
//                         login: {
//                             [Op.like]: `%${userSuggest.login}%`
//                         }
//                     },
//                     limit: userSuggest.limit
//                 });
//             } catch(e) {
//                 console.log(e)
//             }
//         }
//
// getUsers = async () => {
//     try {
//         return this.userModel.findAll()
//     } catch (e) {
//         console.log(e)
//     }
// }

// }
