import axios from "axios";

export const getData = async <T>(url:string): Promise<T> => {
    const response = await axios.get<T>(url)
    return response.data
}

export const postData = async <T>(url: string, data: T, headers: object): Promise<T> => {
    const response = await axios.post<T>(url, data, {headers : headers});
    return response.data;

}

export const putData = async <T>(url:string, data: T, headers: object): Promise<T> => {
    const response = await axios.put<T>(url, data, {headers : headers});
    return response.data;
}