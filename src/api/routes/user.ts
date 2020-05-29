import {Handler, Request, Response} from 'express'
// import {Container} from "typedi";
import {EntityManager, getConnection, getRepository, Like, Repository} from "typeorm";
import {IUser, IUserInputDTO} from "../../interfaces/IUser";
import {User} from "../../db";
import {Route} from "index";
import {UserDataAccess} from "../../data-access/user";
// import {delUserGroups} from "./group";


export const initUserRoutes = (): Route[] => {

    const addUser: Handler = async (req: Request, res: Response): Promise<void> => {
        await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
            const options = {
                login: req.body.login,
                password: req.body.password,
                age: req.body.age,
                isDeleted: false
            }
            const user: User = await UserDataAccess.addUser(options);
            res.status(200).json(user)
        })
    }

    const getUser: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: string = req.params.id.toString()
                const user: User = await UserDataAccess.getUser(id)
                res.status(200).json(user)
        } catch (e) {
            console.log(e)
        }
    }

    const updateUser: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const options: IUserInputDTO = req.body
                const user = await UserDataAccess.updateUser(options)
                res.status(200).json(user)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteUser: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: string = req.params.id.toString()
            const deletedUser: IUser = await UserDataAccess.deleteUser(id)
            res.status(200).json(deletedUser)
        } catch (e) {
            console.log(e)
        }
    }

    const userList: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
                const allUsers: User[] = await UserDataAccess.userList()
                res.status(200).json(allUsers)
        } catch (e) {
            console.log(e)
        }
    }

    const getSuggestUsers: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const login: string = req.params.login
            const queryLimit: number | null = req.params.limit ? parseInt(req.params.limit) : null
                const suggests: IUser | IUser[] = await UserDataAccess.getSuggestUsers(login, queryLimit)
                res.status(200).json(suggests)
        } catch (e) {
            console.log(e)
        }
    }

    return [
        {
            method: 'post',
            path: "/user/add",
            handler: addUser
        },
        {
            method: "get",
            path: "/user/:id",
            handler: getUser,
        },
        {
            method: "patch",
            path: "/user",
            handler: updateUser,
        },
        {
            method: 'get',
            path: "/user-list",
            handler: userList
        },
        {
            method: 'delete',
            path: "/user/:id",
            handler: deleteUser
        },
        {
            method: 'get',
            path: "/user-suggest/:login/:limit",
            handler: getSuggestUsers
        },
    ];
}