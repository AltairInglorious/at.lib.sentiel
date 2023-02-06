import { PermissionSet } from "../classes/PermissionSet"

export interface IPolicy {
    [key: string]: PermissionSet
}