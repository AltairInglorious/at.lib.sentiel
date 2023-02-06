import { IPermissions } from "./IPermissions";

export interface IPermissionPolicy {
    [key: string]: IPermissions
}