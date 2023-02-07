import { Permission } from "./Permission";
import { IPermissions } from '../interfaces'
import { Condition } from "../types";

export class PermissionSet {
    private permissions: Permission[] = []
    private defaultAccess: boolean

    /**
     * Set of permissions for certain object
     * @param permissions object that describe permissions of current set
     * @param defaultAccess default value for check, will be return if requested action is not present in set 
     */
    constructor(permissions: IPermissions = {}, defaultAccess = false) {
        this.defaultAccess = defaultAccess
        const keys = Object.keys(permissions)
        for (let key of keys) {
            this.setPermission(key, permissions[key])
        }
    }

    /**
     * Add new permission to set
     * @param action new action type
     * @param callback check function
     */
    setPermission(action: string, callback: Condition): void {
        this.permissions.push(new Permission(action, callback))
    }

    /**
     * Check if USER can do ACTION on SUBJECT
     * @param user User to check
     * @param action Action type
     * @param subject Subject to check
     * @returns boolean
     */
    can(user: any, action: string, subject: any): boolean {
        const p = this.permissions.find(e => e.action === action)
        return p ? p.can(user, subject) : this.defaultAccess
    }
}