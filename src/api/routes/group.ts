import {Handler, Request, Response} from 'express'
import {Container} from "typedi";
import {DeleteResult, EntityManager, getConnection, getRepository, Repository} from "typeorm";
import {IGroup} from "../../interfaces/IGroup";
import {Group} from "../../db";
import {Route} from "index";
import {Permission} from "../constants";
import {GroupDataAccess} from "../../controller/group";


export const initGroupRoutes = (): Route[] => {

    const addGroup: Handler = async (req: Request, res: Response): Promise<void> => {
        const options = {
            name: req.body.name,
            permissions: req.body.permissions,
        }
        options.permissions.forEach((item: string) => {
            if (Permission.indexOf(item) === -1) {
                res.status(400).json("Permission item doesn't exist in enums = 'READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'")
            }
        })
        const group: IGroup = await GroupDataAccess.addGroup(options)
        res.status(200).json(group)
    }

    const getGroup: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const id: string = req.params.id.toString()
            const group: IGroup = await GroupDataAccess.getGroup(id)
            res.status(200).json(group)
        } catch (e) {
            console.log(e)
        }
    }

    const updateGroup: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const options: IGroup = req.body
            const group: IGroup = await GroupDataAccess.updateGroup(options)
            res.status(200).json(group)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteGroup: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const group: string = req.params.id.toString()
            const resp: DeleteResult = await GroupDataAccess.deleteGroup(group)
            res.status(200).json(resp)
        } catch (e) {
            console.log(e)
        }
    }

    const groupList: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            let allGroups: any = await GroupDataAccess.groupList()
            res.status(200).json(allGroups)
        } catch (e) {
            console.log(e)
        }
    }

    const addUserToGroup: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const usersIds: string[] = req.body.usersIds
            const groupId: string = req.body.groupId
            const group: IGroup = await GroupDataAccess.addUserToGroup(usersIds, groupId)
            res.status(200).json(group)
        } catch (e) {
            console.log(e)
        }
    }

    const delUserFromGroup: Handler = async (req: Request, res: Response): Promise<void> => {
        try {
            const usersIds: string[] = req.body.usersIds
            const groupId: string = req.body.groupId
            const group: IGroup = await GroupDataAccess.delUserFromGroup(usersIds, groupId)
            res.status(200).json(group)
        } catch (e) {
            console.log(e)
        }
    }

    return [
        {
            method: 'post',
            path: "/group",
            handler: addGroup
        },
        {
            method: "get",
            path: "/group/:id",
            handler: getGroup,
        },
        {
            method: "patch",
            path: "/group",
            handler: updateGroup,
        },
        {
            method: 'get',
            path: "/groups",
            handler: groupList
        },
        {
            method: 'delete',
            path: "/group/:id",
            handler: deleteGroup
        },
        {
            method: 'post',
            path: "/group-user/add",
            handler: addUserToGroup
        },
        {
            method: 'post',
            path: "/group-user/del",
            handler: delUserFromGroup
        },
    ];
}