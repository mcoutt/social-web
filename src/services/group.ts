import {Container, Service} from 'typedi';
import {getCustomRepository} from "typeorm";
import {GroupRepository} from "../repository/group";
import {Transactional} from "typeorm-transactional-cls-hooked";
import {IGroup} from "../interfaces/IGroup";


@Service()
export default class GroupService {
    constructor(
        protected repository: GroupRepository = getCustomRepository(GroupRepository)
    ) {
    }

    @Transactional()
    async createGroup(options: IGroup): Promise<IGroup | object> {
        try {
            const exist = await this.repository.findGroupByName(options.name)
            if (exist) {
                if (options.name === exist.name) {
                    return {
                        data: `Group with this name of: ${exist.name} exist. Please choose another group's name..`
                    }
                }
            }
            return await this.repository.createGroup(options)
        } catch (e) {
            console.log(e)
            return e.message
        }
    }

    @Transactional()
    public async GetGroups(): Promise<IGroup[]> {
        try {
            return this.repository.allGroups()
        } catch (e) {
            console.log(e)
            return e.message
        }
    }

    @Transactional()
    public async getGroup(id: string): Promise<IGroup> {
        try {
            return this.repository.findOneGroup(id)
        } catch (e) {
            console.log(e)
            return e.message
        }

    }

    @Transactional()
    public async updateGroup(group: IGroup): Promise<IGroup> {
        try {
            return this.repository.updateGroup(group)
        } catch (e) {
            console.log(e)
            return e.message
        }
    }

    @Transactional()
    public async addUsersToGroup(groupId, userIds): Promise<IGroup> {
        try {
            await this.repository.addUsersToGroup(groupId, userIds)
            return this.repository.findOneGroup(groupId)
        } catch (e) {
            console.log(e)
            return e.message
        }
    }

    @Transactional()
    public async removeUserFromGroup(groupId, userIds): Promise<IGroup> {
        try {
            await this.repository.removeUserFromGroup(groupId, userIds)
            return this.repository.findOneGroup(groupId)
        } catch (e) {
            console.log(e)
            return e.message
        }
    }
    // delUsersFromGroup = async (groupId, userId) => {
    //     try {
    //         const item = {
    //             user_id: userId,
    //             group_id: groupId
    //         }
    //         return await this.usersGroupsModel.destroy(item, {w: 1}, {returning: true})
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    //
    // deleteGroup = async (group) => {
    //     const exist = await this.getGroupById(group)
    //     if (!exist) {
    //         return {
    //             data: "Group doesn't exist. Please choose another group id.."
    //         }
    //     }
    //     return await this.groupModel.destroy(
    //         {where: {id: group}}
    //     )
    // }

};
