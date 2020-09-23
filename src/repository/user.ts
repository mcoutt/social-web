import {EntityRepository, Repository, getRepository} from "typeorm";
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import {User} from "../db";
import * as util from "util";
import {IUser, IUserInputDTO} from "../interfaces/IUser";


@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {

    async createAndSave(user: User): Promise<User> {
        let res_user: User = new User(user);
        return await this.save(res_user);
    }

    async allUsers(): Promise<User[]> {
        return await this.createQueryBuilder("user")
                .leftJoinAndSelect("user.groups", "group")
                .getMany();
    }

    async findOneUser(userId: string): Promise<User> {
        let user = await this.createQueryBuilder("user")
                    .leftJoinAndSelect("user.groups", "group")
                    .andWhere("user.id = :id", {id: userId})
                    .getOne()
        if (!UserRepository.isUser(user)) {
            throw new Error(`User id ${util.inspect(userId)} did not retrieve a User`);
        }
        return user;
    }

    async updateUser(user: IUserInputDTO): Promise<IUserInputDTO> {
        if (typeof user.age !== 'undefined') {
            user.age = normalizeNumber(user.age, 'Bad year entered');
        }

        if (!UserRepository.isUserUpdater(user)) {
            throw new Error(`User update id ${util.inspect(user.id)} did not receive a User updater ${util.inspect(user)}`);
        }
        await this.manager.update(User, user.id, user);
        return user;
    }

    async deleteUser(user: string | User) {
        if (typeof user !== 'string'
            && !UserRepository.isUser(user)) {
            throw new Error('Supplied user object not a User');
        }
        await this.manager.delete(User,
            typeof user === 'string'
                ? user : user.id);
    }

    static isUser(user: any): user is User {
        return typeof user === 'object'
            && typeof user.login === 'string'
            && typeof user.password === 'string'
            && typeof user.age === 'number'
            && typeof user.isDeleted === 'boolean'
            // && UserRepository.isGender(user.gender);
    }

    static isUserUpdater(updater: any): boolean {
        let ret = true;
        if (typeof updater !== 'object') {
            throw new Error('isUserUpdater must get object');
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
        //     if (!UserRepository.isGender(updater.gender)) ret = false;
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