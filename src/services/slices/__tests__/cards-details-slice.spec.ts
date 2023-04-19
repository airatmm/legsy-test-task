import reducer, {
    initialState,
    cardsDetailsRequest,
    cardsDetailsSuccess,
    cardsDetailsError
} from '../cards-details-slice'

export const testError = {
    detail: [
        {
            loc: ["query", "supplier_id"],
            msg: "value is not a valid integer",
            type: "type_error.integer"
        }
    ]
};
const testCardsDetails = {
    id: 37811130,
    subjectId: 212,
    subjectParentId: 4,
    name: "Высокие носки Комплект 5 пар",
    brand: "Мастер Хлопка",
    brandId: 28787,
    siteBrandId: 38787,
    supplierId: 31460,
    sale: 53,
    priceU: 79000,
    salePriceU: 36600,
    rating: 5,
    feedbacks: 398,
    colors: [
        {
            name: "синий"
        },
        {
            name: "серый"
        }
    ]
}
const testArray = [testCardsDetails, testCardsDetails, testCardsDetails, testCardsDetails]

describe('cards details reducer', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(initialState);
    });
    test('should return cards details REQUEST', () => {
        const state = reducer(undefined, cardsDetailsRequest());
        expect(state).toEqual({
            list: [],
            isLoading: true,
            error: null,
        })
    });
    test('should return cards details SUCCESS', () => {
        const state = reducer(initialState, cardsDetailsSuccess(testArray));
        expect(state).toEqual({
            list: testArray,
            isLoading: false,
            error: null,
        })
    });
    test('should return cards details ERROR', () => {
        const state = reducer(initialState, cardsDetailsError(testError));
        expect(state).toEqual({
            list: [],
            isLoading: false,
            error: {
                detail: [
                    {
                        loc: ["query", "supplier_id"],
                        msg: "value is not a valid integer",
                        type: "type_error.integer"
                    }
                ]
            },
        })
    });
})

