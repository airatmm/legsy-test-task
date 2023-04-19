import { TRequestOption } from "../types/types";
import { handleTErrorResponse } from "../utils/error-response";

export const checkResponse = <T>(res: Response): Promise<T> => {
    if (res.ok) {
        return res.json() as Promise<T>;
    }
    return res.json().then(error => Promise.reject(`Ошибка:${ handleTErrorResponse(error) }`));
};

const request = <T>(url: string, options: TRequestOption): Promise<T> => {
    return fetch(url, options).then((res: Response) => checkResponse<T>(res))
}

export default request;
