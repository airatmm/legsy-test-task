type TRequestHeaders = {
    'Content-Type': string;
    Accept?: string;
    Authorization?: string;
};

export type TRequestOption = {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    headers: TRequestHeaders;
    // Политика реферера для установки referrerPolicy запроса
    referrerPolicy?: ReferrerPolicy;
    body?: string;
};

export type TErrorResponse = {
    detail: {
        loc: Array<string | number>;
        msg: string;
        type: string;
    }[] | string;
}
export type TSupplierCardsState = {
    list: Array<string>,
    isLoading: boolean,
    error: TErrorResponse | null,
    isSuccess: boolean,
}
type TCardDetailColors = {
    name: string,
}
export type TCardDetail = {
    id: number,
    subjectId: number,
    subjectParentId: number,
    name: string,
    brand: string,
    brandId: number,
    siteBrandId: number,
    supplierId: number,
    sale: number,
    priceU: number,
    salePriceU: number,
    rating?: number,
    feedbacks?: number,
    colors?: Array<TCardDetailColors>
}

export type TGraphItem = {
    amount: number,
    date: string,
}
type TGraph = {
    graph: Array<TGraphItem>
}
export type TCardDetailWithGraph = TCardDetail & TGraph

type TCardImageData = {
    image: string
}
export type TCardDetailWithImage = TCardDetailWithGraph & TCardImageData

export type TCardDetailState = {
    list: Array<TCardDetail> | [],
    isLoading: boolean,
    error: TErrorResponse | null,
}

export type TCardDict = {
    [key: string]: string;
}
export type CardsPhotoState = {
    dict: TCardDict,
    isLoading: boolean,
    error: TErrorResponse | null,
    isSuccess: boolean
};
