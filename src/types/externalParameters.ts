export interface IExternalParameter {
    code: string;
    description: string;
    lifeTime: number;
    testValue: string;
    type: string;
    groupId?: string;
}

export interface IExternalParameterResponse {
    code: string;
    description: string;
    lifeTime: number;
    testValue: string;
    type: string;
    id: string;
}

export interface IExternalParameterRequest {
    code: string;
    description: string;
    lifeTime: number;
    testValue: string;
    type: string;
    groupId: number;
}

export interface IExternalGroup {
    code: string;
    description: string;
}

export interface IExternalGroupRequest {
    code: string;
    description: string;
    id: number;
}

export interface IUserChangeGroup {
    "email": string;
    "firstName": string;
    "fullName": string;
    "id": number;
    "lastName": string;
    "login": string;
    "middleName": string;
}

export interface ILastChangeGroup {
    dateTime: string;
    user: IUserChangeGroup;
}

export interface IExternalFullGroup {
    group: IExternalGroupRequest;
    lastChange: ILastChangeGroup;
    parameters: IExternalParameterResponse[]
}

export interface IExternalParameterDataTypes {
    "selected": boolean;
    "text": string;
    "value": string
}
