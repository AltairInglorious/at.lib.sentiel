import { InvalidSubjectError } from "../errors/InvalidSubjectError";
import { IPermissions, IPermissionPolicy, IPolicy } from "../interfaces";
import { PermissionSet } from "./PermissionSet";

export class Role {
    private policy: IPolicy = {}
    private defaultAccess: boolean

    /**
     * Role that containe permissionSet for certain role
     * @param sets object that describe permissionSets
     * @param defaultAccess default value for check, will be return if requested action is not present in role
     */
    constructor(sets: IPermissionPolicy, defaultAccess = false) {
        this.defaultAccess = defaultAccess
        const keys = Object.keys(sets)
        for (let key of keys) {
            this.setPermissionSet(key, sets[key])
        }
    }

    /**
     * Add new subject controller for role
     * @param name subject name
     * @param permissionSet permissionSet for current subject
     * @param defaultAccess defaultValue which will be return if action is not present in PermissionSet
     */
    setPermissionSet(name: string, permissionSet: IPermissions, defaultAccess = this.defaultAccess) {
        this.policy[name] = new PermissionSet(permissionSet, defaultAccess)
    }

    /**
     * Check if can User perform Action on Subject
     * @param objectType we can mannualy set subjectType if subject type !== class
     * @returns boolean can User perform Action on Subject
     */
    can(user: any, action: string, subject: any, objectType?: string): boolean {
        if (!objectType) {
            objectType = subject?.constructor?.name?.toLowerCase()
            if (!objectType) {
                throw new InvalidSubjectError()
            }
        }
        const set = this.policy[objectType.toLowerCase()]
        if (!set) {
            throw new InvalidSubjectError(`Invalid subject type of "${objectType}" avaliable types is:\n[${Object.keys(this.policy)}]\nTry manualy set objectType`)
        }
        return set.can(user, action, subject)
    }
}