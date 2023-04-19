import { TErrorResponse } from "../types/types";

export const handleTErrorResponse = (error: TErrorResponse): string => {
    const errorDetails = error?.detail;
    if (typeof errorDetails === 'string') {
        return errorDetails;
    }
    else if (Array.isArray(errorDetails)) {
        const errorMessages = errorDetails.map((detail) => `${ detail.type }: ${ detail.msg }`);
        return errorMessages.join(', ');
    }
    return 'Произошла неизвестная ошибка';

};
