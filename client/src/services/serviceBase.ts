import axios from "axios";



export const getData = async <T>(url:string, headers: Record<string, string>): Promise<T> => {
    const response = await axios.get<T>(url, {headers:headers})
 
    return response.data
}

export const postData = async <TData, TResponse>(url: string, data: TData, headers: object): Promise<TResponse> => {
    const response = await axios.post<TResponse>(url, data, {headers : headers});

    return response.data;

}

export const putData = async <T>(url:string, data: T, headers: object): Promise<T> => {
    const response = await axios.put<T>(url, data, {headers : headers});
    return response.data;
}