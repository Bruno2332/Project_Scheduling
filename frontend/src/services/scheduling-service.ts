import type { AxiosRequestConfig } from "axios";
import { requestBackend } from "../util/requests";
import type { SchedulingInsertDTO } from "../models/scheduling";



export function findPageRequest(page: number, minDate: string, maxDate: string, size = 12, sort = "momentScheduling,desc"){
    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/schedulings",
        params: {
            page,
            minDate,
            maxDate,
            size,
            sort
        }
    }
    return requestBackend(config);
}

export function findById(id : number) {
    return requestBackend({ url: `/schedulings/${id}` });
}

export function deleteById(id: number){
    const config : AxiosRequestConfig = {
        method: "DELETE",
        url: `/schedulings/${id}`,
    }
    return requestBackend(config);
}


export function updateRequest(obj: SchedulingInsertDTO){
    const config : AxiosRequestConfig = {
        method: "PUT",
        url: `/schedulings/${obj.id}`,
        data: obj
    }
    return requestBackend(config);
}


export function insertRequest(obj: SchedulingInsertDTO){
    const config : AxiosRequestConfig = {
        method: "POST",
        url: `/schedulings`,
        data: obj
    }
    return requestBackend(config);
}
