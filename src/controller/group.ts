import {Container} from "typedi";
import {DeleteResult, EntityManager, getConnection, getRepository, Repository} from "typeorm";
import {IGroup} from "../interfaces/IGroup";
import {Group} from "../entity/Group";
import {User} from "../entity/User";
import {UserService} from "../services/user";
import GroupService from "../services/group";


export const delUserGroups: any = async (usersIds: string[] | string, groupId: string): Promise<void> => {
    await getConnection().transaction(async (manager: EntityManager): Promise<IGroup> => {
        let updatedGroup: IGroup;
        const groupRepo: Repository<IGroup> = manager.getRepository(Group)
        const group: any = await groupRepo.findOne(groupId)
        if (Array.isArray(usersIds)) {
            usersIds.map(async id => {
                await groupRepo.createQueryBuilder()
                    .relation(Group, "users")
                    .of(group)
                    .remove(id)
            })
        } else if (typeof usersIds === "string") {
            await groupRepo.createQueryBuilder()
                .relation(Group, "users")
                .of(group)
                .remove(usersIds)
        }
        await manager.save(group)
        updatedGroup = group
        return updatedGroup
    })
}

export class GroupDataAccess {

    constructor() {
    }

    public static async addGroup(options: IGroup): Promise<IGroup> {
        try {
            const groupService: GroupService = Container.get(GroupService)
            return await groupService.createGroup(options)
        } catch (e) {
            console.log(e)
        }

        // let group: IGroup;
        // await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
        //     const groupRepo: Repository<Group> = manager.getRepository(Group);
        //     group = new Group(options);
        //     await groupRepo.insert(group)
        // })
        // return group
    }

    public static async getGroup(id: string): Promise<IGroup> {
        try {
            const groupService: GroupService = Container.get(GroupService)
            return await groupService.getGroup(id)
        } catch (e) {
            console.log(e)
        }
    }

    public static async updateGroup(id: string, options: IGroup): Promise<IGroup> {
        try {
            options.id = id
            const groupService: GroupService = Container.get(GroupService)
            return await groupService.updateGroup(options)
        } catch (e) {
            console.log(e)
        }
    }

    public static async deleteGroup(id: string): Promise<DeleteResult> {
        try {
            const groupRepo: Repository<Group> = getRepository(Group);
            const userRepo: Repository<User> = getRepository(User);
            await groupRepo.createQueryBuilder()
                .relation(Group, "users")
                .of(id)
                .remove(userRepo)
            return await groupRepo.delete(id)
        } catch (e) {
            console.log(e)
        }
    }

    public static async groupList(): Promise<IGroup[]> {
        try {
            const groupService: GroupService = Container.get(GroupService)
            return await groupService.GetGroups()
        } catch (e) {
            console.log(e)
        }
    }

    public static async addUserToGroup(groupId: string, usersIds: string[]): Promise<IGroup> {
        try {
            const groupService: GroupService = Container.get(GroupService)
            return await groupService.addUsersToGroup(groupId, usersIds)
        } catch (e) {
            console.log(e)
        }
    }

    public static async removeUserFromGroup(usersIds: string[], groupId: string): Promise<IGroup> {
        try {
            const groupService: GroupService = Container.get(GroupService)
            return await groupService.removeUserFromGroup(groupId, usersIds)
        } catch (e) {
            console.log(e)
        }
    }
}
