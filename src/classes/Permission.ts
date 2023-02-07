import { Condition } from "../types"

export class Permission {
    action: string
    private callback: Condition

    /**
     * 
     * @param action action type
     * @param callback check condition
     */
    constructor(
        action: string,
        callback: Condition
    ) {
        this.action = action
        this.callback = callback
    }

    /**
     * Check this permission for current user and subject
     * @param user User object
     * @param subject Subject object
     * @returns boolean
     */
    can(user: any, subject: any): boolean {
        if (typeof this.callback === 'boolean') {
            return this.callback
        }
        return this.callback(user, subject)
    }
}