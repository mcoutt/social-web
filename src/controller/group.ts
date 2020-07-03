import {Container} from "typedi";
import {DeleteResult, EntityManager, getConnection, getRepository, Repository} from "typeorm";
import {IGroup} from "../interfaces/IGroup";
import {Group, User} from "../db";


export const delUserGroups: any = async (usersIds: string[] | string, groupId: string): Promise<void> => {
    await getConnection().transaction(async (manager: EntityManager): Promise<IGroup> => {
        let updatedGroup: IGroup;
        const groupRepo: Repository<Group> = manager.getRepository(Group)
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
        let group: IGroup;
        await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
            const groupRepo: Repository<Group> = manager.getRepository(Group);
            group = new Group(options);
            await groupRepo.insert(group)
        })
        return group
    }

    public static async getGroup(id: string): Promise<IGroup> {
        try {
            let group: IGroup
            await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
                const groupRepo: Repository<Group> = manager.getRepository(Group);
                group = await groupRepo.findOne(id)
            })
            return group
        } catch (e) {
            console.log(e)
        }
    }

    public static async updateGroup(options: IGroup): Promise<IGroup> {
        try {
            let group: IGroup
            await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
                const groupRepo: Repository<Group> = manager.getRepository(Group);
                group = await groupRepo.findOne(options.id)
                group.name = options.name ? options.name : group.name
                group.permissions = options.permissions ? options.permissions : group.permissions
                await groupRepo.save(group)
            })
            return group
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
    };

    public static async groupList(): Promise<IGroup[]> {
        try {
            // const groupRepo: Repository<IGroup> = getRepository(Group);

            // const groupModel: any = Container.get("groupModel")
            const groupRepo: Repository<IGroup> = getRepository(Group)
            return await groupRepo.createQueryBuilder("group")
                .leftJoinAndSelect("group.users", "user")
                .getMany()
        } catch (e) {
            console.log(e)
        }
    }

    public static async addUserToGroup(usersIds: string[], groupId: string): Promise<IGroup> {
        try {
            let group: IGroup
            await getConnection().transaction(async (manager: EntityManager): Promise<void> => {
                const groupRepo: Repository<Group> = manager.getRepository(Group)
                group = await groupRepo.findOne(groupId)
                usersIds.map(async id => {
                    await groupRepo.createQueryBuilder()
                        .relation(Group, "users")
                        .of(group)
                        .add(id)
                })
                await manager.save(group)
            })
            return group
        } catch (e) {
            console.log(e)
        }
    }

    public static async delUserFromGroup(usersIds: string[], groupId: string): Promise<IGroup> {
        try {
            const group: IGroup = await delUserGroups(usersIds, groupId)
            return group
        } catch (e) {
            console.log(e)
        }
    }
}