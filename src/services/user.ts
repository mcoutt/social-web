import {Service, Inject} from 'typedi';
import {ISuggest, IUser, IUserInputDTO} from "../interfaces/IUser";
import {Container} from "typedi";
import {User} from "../db";
import {UserRepository} from "../repository/user";
import {runOnTransactionCommit, Transactional} from "typeorm-transactional-cls-hooked";
import {OrmRepository} from "typeorm-typedi-extensions";
import {getCustomRepository} from "typeorm";
import {GroupRepository} from "../repository/group";


@Service()
export class UserService {
    protected repository: UserRepository = getCustomRepository(UserRepository)
    protected groupRepository: GroupRepository = getCustomRepository(GroupRepository)

    @Transactional()
    async createUser(options: any): Promise<User> {
        return await this.repository.createAndSave(options)
        // runOnTransactionCommit(() => this.events.emit('post created'))
//     const exist = await this.getUser(user.id)
//     if (exist) {
//         if (exist.id === user.id) {
//             return {
//                 data: "User with this login exist. Please choose another login name.."
//             }
//         }
//     }
//     await this.userModel.create(user)
// }
    }

    @Transactional()
    public async GetUsers(): Promise<User[]> {
        try {
            return this.repository.allUsers()
        } catch (e) {
            console.log(e)
        }
    }

    @Transactional()
    public async GetUser(id: string): Promise<User> {
        try {
            return this.repository.findOneUser(id)
        } catch (e) {
            console.log(e)
        }

    }

    @Transactional()
     public async updateUser(user: IUserInputDTO): Promise<IUserInputDTO> {
        try {
            return this.repository.updateUser(user)
        } catch (e) {
            console.log(e)
        }
    }

    @Transactional()
    deleteUser = async (user: IUserInputDTO): Promise<IUserInputDTO> => {
        // this.groupRepository.deleteGroup()
        return this.repository.updateUser(user)
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
