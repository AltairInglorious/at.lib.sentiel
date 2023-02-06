export class Permission {
    action: string
    private callback: (((user: any, subject: any) => boolean) | boolean)

    constructor(
        action: string,
        callback: (((user: any, subject: any) => boolean) | boolean)
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
    check(user: any, subject: any): boolean {
        if (typeof this.callback === 'boolean') {
            return this.callback
        }
        return this.callback(user, subject)
    }
}