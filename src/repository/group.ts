import {EntityRepository, getRepository, In} from "typeorm";
import {BaseRepository} from 'typeorm-transactional-cls-hooked';
import {Group} from "../entity/Group";
import * as util from "util";
import {IGroup} from "../interfaces/IGroup";


@EntityRepository(Group)
export class GroupRepository extends BaseRepository<Group> {
    private groupRepository = getRepository(Group)


    async createGroup(group: IGroup): Promise<IGroup> {
        let _group: IGroup = new Group(group);
        return await this.groupRepository.save(_group);
    }

    async allGroups(): Promise<IGroup[]> {
        return await this.groupRepository.createQueryBuilder("group")
            .leftJoinAndSelect("group.users", "user")
            .getMany();
    }

    async findGroupByName(groupName: string): Promise<Group> {
        let group = await this.groupRepository.createQueryBuilder("group")
            .leftJoinAndSelect("group.users", "user")
            .andWhere("group.name = :name", {name: groupName})
            .getOne()
        // if (!GroupRepository.isGroup(group)) {
        //     throw new Error(`Group id ${util.inspect(groupId)} did not retrieve a Group`);
        // }
        return group;
    }

    async findOneGroup(groupId: string): Promise<Group> {
        let group = await this.groupRepository.createQueryBuilder("group")
            .leftJoinAndSelect("group.users", "user")
            .andWhere("group.id = :id", {id: groupId})
            .getOne()
        // if (!GroupRepository.isGroup(group)) {
        //     throw new Error(`Group id ${util.inspect(groupId)} did not retrieve a Group`);
        // }
        return group;
    }

    async updateGroup(group: IGroup): Promise<IGroup> {
        try {
            // if (!GroupRepository.isGroupUpdater(group)) {
            //     throw new Error(`Group update id ${util.inspect(group.id)} did not receive a Group updater ${util.inspect(group)}`);
            // }
            await this.groupRepository.createQueryBuilder("group")
                .update(Group)
                .set(group)
                .where("id = :id", {id: group.id})
                .returning("*")
                .execute()
                .then((response) => {
                    return response.raw[0];
                });
        } catch (e) {
            console.log(e)
            return e.message
        }
    }

    // async deleteGroup(group: string | Group) {
    //     if (typeof group !== 'string'
    //         && !GroupRepository.isGroup(group)) {
    //         throw new Error('Supplied group object not a Group');
    //     }
    //     await this.manager.delete(Group,
    //         typeof group === 'string'
    //             ? group : group.id);
    // }


    async addUsersToGroup(groupId, userIds): Promise<Group> {
        try {
            await this.groupRepository.createQueryBuilder("group")
                .relation('users')
                .of(groupId)
                .add(userIds)
        } catch (e) {
            console.log(e)
            return e.message
        }
    }

    async removeUserFromGroup(groupId, userIds): Promise<Group> {
        try {
            await this.groupRepository.createQueryBuilder("group")
                .relation('users')
                .of(groupId)
                .remove(userIds)
        } catch (e) {
            console.log(e)
            return e.message
        }
    }
    // static isGroup(group: any): group is Group {
    //     return typeof group === 'object'
    //         && typeof group.login === 'string'
    //         && typeof group.password === 'string'
    //         && typeof group.age === 'number'
    //         && typeof group.isDeleted === 'boolean'
    //         // && GroupRepository.isGender(group.gender);
    // }
    //
    // static isGroupUpdater(updater: any): boolean {
    //     let ret = true;
    //     if (typeof updater !== 'object') {
    //         throw new Error('isGroupUpdater must get object');
    //     }
    //     if (typeof updater.login !== 'undefined') {
    //         if (typeof updater.login !== 'string') ret = false;
    //     }
    //     if (typeof updater.password !== 'undefined') {
    //         if (typeof updater.password !== 'string') ret = false;
    //     }
    //     if (typeof updater.age !== 'undefined') {
    //         if (typeof updater.age !== 'number') ret = false;
    //     }
    //     // if (typeof updater.gender !== 'undefined') {
    //     //     if (!GroupRepository.isGender(updater.gender)) ret = false;
    //     // }
    //     return ret;
    // }

    // static isGender(gender: any): gender is Gender {
    //     return typeof gender === 'string'
    //         && (gender === 'male' || gender === 'female');
    // }
}
