import type { AxiosRequestConfig } from "axios";
import { requestBackend } from "../util/requests";
import type { ProfessionalDTO } from "../models/professional";


export function findAll(){
    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/professionals"
    }
    return requestBackend(config);
}

export function findById(id : number) {
    return requestBackend({ url: `/professionals/${id}` });
}

export function deleteById(id: number){
    const config : AxiosRequestConfig = {
        method: "DELETE",
        url: `/professionals/${id}`,
    }
    return requestBackend(config);
}


export function updateRequest(obj: ProfessionalDTO){
    const config : AxiosRequestConfig = {
        method: "PUT",
        url: `/professionals/${obj.id}`,
        data: obj
    }
    return requestBackend(config);
}


export function insertRequest(obj: ProfessionalDTO){
    const config : AxiosRequestConfig = {
        method: "POST",
        url: `/professionals`,
        data: obj
    }
    return requestBackend(config);
}
