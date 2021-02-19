import {http} from './http';
import {
    IExternalGroup,
    IExternalGroupRequest,
    IExternalParameter,
    IExternalParameterRequest,
} from '../types/externalParameters';

const API = '/api/v1/tpi/external-parameters';

export const fetchExternalGroups = async () => {
    const response = await http.get(API + '/groups');
    return response.data;
};

export const fetchExternalAddGroup = async (data: IExternalGroup) => {
    const response = await http.post(API + '/groups/', data);
    return response.data;
};

export const fetchExternalGroupByid = async (id: number) => {
    const response = await http.get(`${API}/groups/${id}`);
    return response.data;
};

export const fetchExternalRemoveGroupById = async (id: number) => {
    const response = await http.delete(`${API}/groups/${id}`);
    return response.data;
}

export const fetchAddParameterInGroup = async (data: IExternalParameterRequest) => {
    const response = await http.post(`${API}?groupId=${data.groupId}`, data);
    return response.data;
}


export const fetchGetParameter = async (id: number) => {
    const response = await http.get(`${API}/${id}`);
    return response.data;
}

export const fetchEditExternalGroupGroup = async (data: IExternalGroupRequest) => {
    const response = await http.put(`${API}/groups/${data.id}`, data);
    return response.data;
}

export const fetchAddParameter = async (data: IExternalParameter) => {
    const response = await http.post(`${API}`, data);
    return response.data;
}

export const fetchEditParameter = async (data: any) => {
    const response = await http.put(`${API}/${data.id}`, data);
    return response.data;
}

export const fetchDeleteParameter = async (id: number) => {
    const response = await http.delete(`${API}/${id}`);
    return response.data;
}

export const fetchParameterDataTypes = async (data: IExternalParameter) => {
    const response = await http.post(`${API}`, data);
    return response.data;
}
