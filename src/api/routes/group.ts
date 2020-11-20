import * as express from 'express'
import {Container} from "typedi";
import {DeleteResult, EntityManager, getConnection, getRepository, Repository} from "typeorm";
import {IGroup} from "../../interfaces/IGroup";
import * as Route from "../routes/user";
import {Permission} from "../constants";
import {GroupDataAccess} from "../../controller/group";


export const initGroupRoutes = () => {

    const addGroup: express.Handler = async (req: express.Request, res: express.Response): Promise<void> => {
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

    const getGroup: express.Handler = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const id: string = req.params.id.toString()
            const group: IGroup = await GroupDataAccess.getGroup(id)
            res.status(200).json(group)
        } catch (e) {
            console.log(e)
        }
    }

    const updateGroup: express.Handler = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const id: string = req.params.id.toString()
            const options: IGroup = req.body
            const group: IGroup = await GroupDataAccess.updateGroup(id, options)
            res.status(200).json(group)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteGroup: express.Handler = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const group: string = req.params.id.toString()
            const resp: DeleteResult = await GroupDataAccess.deleteGroup(group)
            res.status(200).json(resp)
        } catch (e) {
            console.log(e)
        }
    }

    const groupList: express.Handler = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            let allGroups: any = await GroupDataAccess.groupList()
            res.status(200).json(allGroups)
        } catch (e) {
            console.log(e)
        }
    }

    const addUserToGroup: express.Handler = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const usersIds: string[] = req.body.usersIds
            const groupId: string = req.body.groupId
            const group: IGroup = await GroupDataAccess.addUserToGroup(groupId, usersIds)
            res.status(200).json(group)
        } catch (e) {
            console.log(e)
        }
    }

    const removeUserFromGroup: express.Handler = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const usersIds: string[] = req.body.usersIds
            const groupId: string = req.body.groupId
            const group: IGroup = await GroupDataAccess.removeUserFromGroup(usersIds, groupId)
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
            path: "/group/:id",
            handler: updateGroup,
        },
        {
            method: 'get',
            path: "/group",
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
            path: "/group-user/remove",
            handler: removeUserFromGroup
        },
    ];
}
