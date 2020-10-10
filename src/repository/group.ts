import {EntityRepository, Repository, getRepository} from "typeorm";
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import {Group} from "../entity/Group";
import * as util from "util";
import {IGroup} from "../interfaces/IGroup";


@EntityRepository(Group)
export class GroupRepository extends BaseRepository<IGroup> {

    async createAndSave(group: IGroup): Promise<IGroup> {
        let res_group: IGroup = new Group(group);
        return await this.save(res_group);
    }

    async allGroups(): Promise<IGroup[]> {
        return await this.createQueryBuilder("group")
                .leftJoinAndSelect("group.groups", "group")
                .getMany();
    }

    async findOneGroup(groupId: string): Promise<Group> {
        let group = await this.createQueryBuilder("group")
                    .leftJoinAndSelect("group.groups", "group")
                    .andWhere("group.id = :id", {id: groupId})
                    .getOne()
        if (!GroupRepository.isGroup(group)) {
            throw new Error(`Group id ${util.inspect(groupId)} did not retrieve a Group`);
        }
        return group;
    }

    async updateGroup(group: IGroup): Promise<IGroup> {

        if (!GroupRepository.isGroupUpdater(group)) {
            throw new Error(`Group update id ${util.inspect(group.id)} did not receive a Group updater ${util.inspect(group)}`);
        }
        await this.manager.update(Group, group.id, group);
        return group;
    }

    async deleteGroup(group: string | Group) {
        if (typeof group !== 'string'
            && !GroupRepository.isGroup(group)) {
            throw new Error('Supplied group object not a Group');
        }
        await this.manager.delete(Group,
            typeof group === 'string'
                ? group : group.id);
    }

    static isGroup(group: any): group is Group {
        return typeof group === 'object'
            && typeof group.login === 'string'
            && typeof group.password === 'string'
            && typeof group.age === 'number'
            && typeof group.isDeleted === 'boolean'
            // && GroupRepository.isGender(group.gender);
    }

    static isGroupUpdater(updater: any): boolean {
        let ret = true;
        if (typeof updater !== 'object') {
            throw new Error('isGroupUpdater must get object');
        }
        if (typeof updater.login !== 'undefined') {
            if (typeof updater.login !== 'string') ret = false;
        }
        if (typeof updater.password !== 'undefined') {
            if (typeof updater.password !== 'string') ret = false;
        }
        if (typeof updater.age !== 'undefined') {
            if (typeof updater.age !== 'number') ret = false;
        }
        // if (typeof updater.gender !== 'undefined') {
        //     if (!GroupRepository.isGender(updater.gender)) ret = false;
        // }
        return ret;
    }

    // static isGender(gender: any): gender is Gender {
    //     return typeof gender === 'string'
    //         && (gender === 'male' || gender === 'female');
    // }
}

export function normalizeNumber(num: number | string, errorIfNotNumber: string): number {
    if (typeof num === 'undefined') {
        throw new Error(`${errorIfNotNumber} -- ${num}`);
    }
    if (typeof num === 'number') return num;

    let ret = parseInt(num);

    if (isNaN(ret)) {
        throw new Error(`${errorIfNotNumber} ${ret} -- ${num}`);
    }
    return ret!;
}
