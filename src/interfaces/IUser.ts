import {IGroup} from "./IGroup";

export interface IUser {
    id?: string;
    login?: string;
    password?: string;
    age?: number;
    isDeleted?: boolean;
    // groups?: IGroup
}

export interface IUserInputDTO {
    id?: string;
    login?: string;
    password?: string;
    age?: number;
    isDeleted?: boolean;
}

export interface ISuggest {
    login: string;
    limit: number
}


export interface IDB {
    database: string,
    username: string,
    pass: string,
    host: string,
    port: string,
    dialect: string,
}
