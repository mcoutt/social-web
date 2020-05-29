// import {Service, Inject} from 'typedi';
// import {ISuggest, IUser, IUserInputDTO} from "../interfaces/IUser";
// import {User} from "../db";
//
//
// @Service()
// export default class UserService {
//     constructor(
//         @Inject('userModel') private userModel: User,
//     ) {
//     }
//
//     public async CreateUser(userInputDTO: IUserInputDTO): Promise<object> {
//         return ({
//             ...userInputDTO
//         })
//     }
//
//     public async GetUsers(): Promise<[]> {
//         try {
//             return this.userModel.findAll()
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }
//
// //  console.log("Inserting a new user into the database...");
// //     const user = new this.userModel();
// //     user.login = "User12";
// //     user.password = "pdw";
// //     user.age = 25;
// //     await connection.manager.save(user);
// //     console.log("Saved a new user with id: " + user.id);
// //
// //     console.log("Loading users from the database...");
// //     const users = await connection.manager.find(User);
// //     console.log("Loaded users: ", users);
// //
// //     console.log("Here you can setup and run express/koa/any other framework.");
// //
// // }).catch(error => console.log(error));
//
// //     const exist = await this.getUser(user.id)
// //     if (exist) {
// //         if (exist.id === user.id) {
// //             return {
// //                 data: "User with this login exist. Please choose another login name.."
// //             }
// //         }
// //     }
// //     await this.userModel.create(user)
// // }
//
//
// // public async GetUser(userInputDTO: IUserInputDTO): Promise<{user: IUser}> {}
// //
// //     try {
// //         return this.userModel.findByPk(
// //             user, {
// //                 include: [
// //                     {
// //                         model: this.groupModel,
// //                         as: 'groups'
// //                     }]
// //             }
// //         )
// //     } catch (e) {
// //         console.log(e)
// //     }
// //
// // public async GetUserByID(userInputDTO: IUserInputDTO): Promise<{user: IUser}> {}
// //
// //     try {
// //         return this.userModel.findByPk(IUserInputDTO.id)
// //     } catch (e) {
// //         console.log(e)
// //     }
//
// // public async GetSuggestUser(userSuggest: ISuggest): Promise<[]> {
// //             try {
// //                 return this.userModel.findAll({
// //                     where: {
// //                         login: {
// //                             [Op.like]: `%${userSuggest.login}%`
// //                         }
// //                     },
// //                     limit: userSuggest.limit
// //                 });
// //             } catch(e) {
// //                 console.log(e)
// //             }
// //         }
// //
// // updateUser = async (user) => {
// //     try {
// //         return this.userModel.update(
// //             {...user},
// //             {where: {id: user.id}})
// //     } catch (e) {
// //         console.log(e)
// //     }
// // }
// //
// // deleteUser = async (user) => {
// //     const exist = await this.getUserById(user)
// //     if (!exist) {
// //         return {
// //             data: "User doesn't exist. Please choose another user id.."
// //         }
// //     }
// //     await this.usersGroupsModel.destroy({where: {user_id: user}})
// //     const updated = await this.userModel.update(
// //         {isDeleted: true},
// //         {where: {id: user}}
// //     )
// //     return updated[0]
// // }
// //
// // getUsers = async () => {
// //     try {
// //         return this.userModel.findAll()
// //     } catch (e) {
// //         console.log(e)
// //     }
// // }
//
// // }
