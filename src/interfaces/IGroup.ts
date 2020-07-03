import {GroupPermissionsType} from "index";

export interface IGroup {
    id?: string;
    name?: string;
    permissions?: GroupPermissionsType;
}

export interface IGroupUsers {
    id?: string;
    name?: string;
    permissions?: GroupPermissionsType;
    users?: string[]
}

