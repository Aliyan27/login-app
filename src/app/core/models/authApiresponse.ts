

export interface Iverify2fa {
    message: string;
    data:    Data;
    status:  number;
    success: boolean;
}

export interface Data {
    tokenDto: TokenDto;
    userInfo: UserInfo;
}

export interface TokenDto {
    accessToken:  string;
    refreshToken: string;
    deviceId:     null;
}

export interface UserInfo {
    id:              string;
    firstName:       string;
    lastName:        string;
    companyName:     string;
    email:           string;
    role:            null;
    dateJoined:      Date;
    addedBy:         string;
    lockoutEnd:      Date;
    isActive:        boolean;
    userModuleRoles: UserModuleRole[];
}

export interface UserModuleRole {
    module: Module;
    role:   Role;
}

export interface Module {
    moduleId:   string;
    moduleName: string;
    metadata:   string;
}

export interface Role {
    roleId:      string;
    roleName:    RoleName;
    displayName: DisplayName;
}

export enum DisplayName {
    SuperAdmin = "Super Admin",
}

export enum RoleName {
    SuperAdmin = "SuperAdmin",
}