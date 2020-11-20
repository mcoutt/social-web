import {Handler, Response} from 'express'
// import {Container} from "typedi";
import {IUser} from "../../interfaces/IUser";
import {UserDataAccess} from "../../controller/user";
import {Request, Route} from "../../types";
import {HttpMethod} from "../../constants/HttpMethod";
import {UpdateResult} from "typeorm";


export function initUserRoutes(): Route[] {

    const addUser: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const options = {
                login: req.body.login,
                password: req.body.password,
                age: req.body.age,
                isDeleted: false
            }
            const user: IUser | object = await UserDataAccess.addUser(options);
            res.status(200).json(user)
        } catch (e) {
            console.log(e)
        }
    }


    const userList: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const allUsers: IUser[] = await UserDataAccess.userList()
            console.log(allUsers)
            res.status(200).json(allUsers)
        } catch (e) {
            console.log(e)
        }
    }

    const getUser: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: string = req.params.id.toString()
            const user: IUser | string = await UserDataAccess.getUser(id)
            res.status(200).json(user)
        } catch (e) {
            console.log(e)
        }
    }

    const updateUser: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const options: IUser = req.body
            const id: string = req.params.id.toString()
            const user = await UserDataAccess.updateUser(id, options)
            res.status(200).json(user)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteUser: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: string = req.params.id.toString()
            const deletedUser: IUser | string = await UserDataAccess.deleteUser(id)
            res.status(200).json(deletedUser)
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
            method: HttpMethod.POST,
            path: "/user/add",
            handler: addUser
        },
        {
            method: HttpMethod.GET,
            path: "/user/:id",
            handler: getUser,
        },
        {
            method: HttpMethod.PATCH,
            path: "/user/:id",
            handler: updateUser,
        },
        {
            method: HttpMethod.GET,
            path: "/user",
            handler: userList
        },
        {
            method: HttpMethod.DELETE,
            path: "/user/:id",
            handler: deleteUser
        },
        {
            method: HttpMethod.GET,
            path: "/user-suggest/:login/:limit",
            handler: getSuggestUsers
        },
    ];
}
