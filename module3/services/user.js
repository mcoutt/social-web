import {Container} from 'typedi';
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op;

export default class UserService {

    userModel = Container.get('userModel')

    createUser = async (user) => {
        const exist = await this.getUser(user.login)
        if (exist) {
            if (exist.login === user.login) {
                return {
                    data: "User with this login exist. Please choose another login name.."}
            }
        }
        await this.userModel.create(user)
    }

    getUser = async (user) => {
        try {
            return this.userModel.findOne({where: {login: user}})
        } catch (e) {
            console.log(e)
        }
    }

    getUserById = async (id) => {
        try {
            return this.userModel.findOne({where: {id: id}})
        } catch (e) {
            console.log(e)
        }
    }

    getSuggestUser = async (login, limit) => {
        try {
            return this.userModel.findAll({
                where: {
                    login: {
                        [Op.like]: `%${login}%`
                    }
                },
                limit: limit
            });
        } catch (e) {
            console.log(e)
        }
    }

    updateUser = async (user) => {
        try {
            return this.userModel.update(
                {...user},
                {where: {id: user.id}})
        } catch (e) {
            console.log(e)
        }
    }

    deleteUser = async (user) => {
        const exist = await this.getUserById(user)
            if (!exist) {
            return {
                data: "User doesn't exist. Please choose another user id.."}
            }
        const updated = await this.userModel.update(
            {isDeleted: true},
            {where: {id: user}}
        )
        return updated[0]
    }

    getUsers = async () => {
        try {
            return this.userModel.findAll()
        } catch (e) {
            console.log(e)
        }
    }

};