import { Permission } from "./Permission";
import { IPermissions } from '../interfaces'

export class PermissionSet {
    private permissions: Permission[] = []
    private defaultAccess: boolean

    constructor(permissions: IPermissions = {}, defaultAccess = false) {
        this.defaultAccess = defaultAccess
        const keys = Object.keys(permissions)
        for (let key of keys) {
            this.setPermission(key, permissions[key])
        }
    }

    setPermission(action: string, callback: (user: any, subject: any) => boolean) {
        this.permissions.push(new Permission(action, callback))
    }

    can(user: any, action: string, subject: any) {
        const p = this.permissions.find(e => e.action === action)
        return p ? p.check(user, subject) : this.defaultAccess
    }
}