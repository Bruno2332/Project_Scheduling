import type { AxiosRequestConfig } from "axios";
import { requestBackend } from "../util/requests";
import type { PatientDTO } from "../models/patient";


export function findAll(){
    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/patients"
    }
    return requestBackend(config);
}

export function findById(id : number) {
    return requestBackend({ url: `/patients/${id}` });
}

export function deleteById(id: number){
    const config : AxiosRequestConfig = {
        method: "DELETE",
        url: `/patients/${id}`,
    }
    return requestBackend(config);
}


export function updateRequest(obj: PatientDTO){
    const config : AxiosRequestConfig = {
        method: "PUT",
        url: `/patients/${obj.id}`,
        data: obj
    }
    return requestBackend(config);
}


export function insertRequest(obj: PatientDTO){
    const config : AxiosRequestConfig = {
        method: "POST",
        url: `/patients`,
        data: obj
    }
    return requestBackend(config);
}
