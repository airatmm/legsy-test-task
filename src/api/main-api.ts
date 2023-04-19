import request from "./api-tools";
import { BASE_URL } from "../utils/constants";
import { TCardDetail, TCardDict } from "../types/types";

export const fetchSupplierCards = () => request<Array<string>>(
    `${ BASE_URL }/get_supplier_cards?supplier_id=31460`,

    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        referrerPolicy: "unsafe-url"
    }
);

export const fetchCardsDetails = (data: {nm_ids: Array<string>}) => request<Array<TCardDetail>>(
    `${ BASE_URL }/cards_detail`,

    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        referrerPolicy: "unsafe-url",
        body: JSON.stringify( data)
    }
);

export const fetchCardsPhoto = (data: {nm_ids: Array<string>}) => request<TCardDict>(
    `${ BASE_URL }/cards_photo`,

    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        referrerPolicy: "unsafe-url",
        body: JSON.stringify( data)
    }
);
