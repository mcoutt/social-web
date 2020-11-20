import {EntityRepository, getRepository} from "typeorm";
import {BaseRepository} from 'typeorm-transactional-cls-hooked';
import {User} from "../entity/User";
import * as util from "util";
import {IUser} from "../interfaces/IUser";
import {normalizeNumber} from "../types";
import {Group} from "../entity/Group";


@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
    private userRepository = getRepository(User)

    async createUser(user: IUser): Promise<IUser> {
        let res_user: IUser = new User(user);
        return await this.userRepository.save(res_user);
    }

    async allUsers(): Promise<IUser[]> {
        // return await this.userRepository.createQueryBuilder("user")
        //     .leftJoinAndSelect("user.groups", "group")
        //     .getMany();
        return await this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.groups", "group")
            .getMany();
    }

    async findOneUser(userId: string): Promise<IUser | object> {
        let user = await this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.groups", "group")
            .andWhere("user.id = :id", {id: userId})
            .getOne()
        // if (!UserRepository.isUser(user)) {
        //     throw new Error(`User id ${util.inspect(userId)} did not retrieve a User`);
        // }
        return user;
    }

    async findOneUserByName(username: string): Promise<IUser> {
        let user = await this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.groups", "group")
            .andWhere("user.login = :user", {user: username})
            .getOne()
        // if (!UserRepository.isUser(user)) {
        //     throw new Error(`User id ${util.inspect(username)} did not retrieve a User`);
        // }
        return user;
    }

    async updateUser(user: IUser): Promise<IUser> {
        if (typeof user.age !== 'undefined') {
            user.age = normalizeNumber(user.age, 'Bad year entered');
        }

        return await this.userRepository.createQueryBuilder("user")
            .update(User)
            .set(user)
            .where("id = :id", {id: user.id})
            .returning("*")
            .execute()
            .then((response) => {
                const res = response
                return response.raw[0];
            });
    }

    async removeFromGroup(userId: string | string[], groups: string[]) {
        groups.map(async (id) => {
            await this.userRepository.createQueryBuilder("user")
                .relation("groups")
                .of(id)
                .remove(userId)
        })
    }

    async removeUserFromGroup(userId: string): Promise<IUser | object> {
        let user: any = await this.findOneUser(userId)
        if (user.groups[0].id) {
            const groups = user.groups
            await this.removeFromGroup(userId, groups)
            return {'user': 'removed'};

        }
        return {'user': 'removed'};

    }

    // let user = await this.userRepository.createQueryBuilder("user")
    //     .leftJoinAndSelect("user.groups", "group")
    //     .andWhere("user.id = :id", {id: userId})
    //     .getOne()
    // // if (!UserRepository.isUser(user)) {
    //     throw new Error(`User id ${util.inspect(userId)} did not retrieve a User`);
    // }

    // static isGender(gender: any): gender is Gender {
    //     return typeof gender === 'string'
    //         && (gender === 'male' || gender === 'female');
    // }
}

