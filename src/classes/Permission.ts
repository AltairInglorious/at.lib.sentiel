export class Permission {
    action: string
    private callback: (user: any, subject: any) => boolean

    constructor(
        action: string,
        callback: (user: any, subject: any) => boolean = () => false
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
        return this.callback(user, subject)
    }
}