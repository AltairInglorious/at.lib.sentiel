import { IPermissions, IPermissionPolicy, IPolicy } from "../interfaces";
import { PermissionSet } from "./PermissionSet";

export class Role {
    private policy: IPolicy = {}
    private defaultAccess: boolean

    constructor(sets: IPermissionPolicy, defaultAccess = false) {
        this.defaultAccess = defaultAccess
        const keys = Object.keys(sets)
        for (let key of keys) {
            this.setPermissionSet(key, sets[key])
        }
    }

    setPermissionSet(name: string, permissionSet: IPermissions, defaultAccess = this.defaultAccess) {
        this.policy[name] = new PermissionSet(permissionSet, defaultAccess)
    }

    can(user: any, action: string, subject: any, objectType?: string) {
        if (!objectType) {
            objectType = subject?.constructor?.name?.toLowerCase()
            if (!objectType) {
                throw new Error('Invalid subject type')
            }
        }
        const set = this.policy[objectType.toLowerCase()]
        if (!set) {
            throw new Error(`Invalid subject type of "${objectType}" avaliable types is:\n[${Object.keys(this.policy)}]\nTry manualy set objectType`)
        }
        return set.can(user, action, subject)
    }
}