export interface IPermissions {
    [key: string]: ((user: any, subject: any) => boolean) | boolean
}