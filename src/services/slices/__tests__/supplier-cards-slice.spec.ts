import reducer, {
    initialState,
    supplierCardsRequest,
    supplierCardsSuccess,
    supplierCardsError
} from '../supplier-cards-slice'
import { testError } from "./cards-details-slice.spec";

const testArray = [
    '148320325',
    '140374926',
    '116565962',
    '148320324',
    '148320329',
    '141319109',
    '140374922',
    '140374915',
    '37811130',
    '117630337',
    '116562748',
    '116445812',
    '117626125',
    '103339209',
    '122257176'
];

describe('supplier cards reducer', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(initialState);
    });
    test('should return supplier cards REQUEST', () => {
        const state = reducer(undefined, supplierCardsRequest());
        expect(state).toEqual({
            list: [],
            isLoading: true,
            error: null,
            isSuccess: false,
        })
    });
    test('should return supplier cards SUCCESS', () => {
        const state = reducer(initialState, supplierCardsSuccess(testArray));
        expect(state).toEqual({
            list: testArray,
            isLoading: false,
            error: null,
            isSuccess: true,
        })
    });
    test('should return supplier cards ERROR', () => {
        const state = reducer(initialState, supplierCardsError(testError));
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
            isSuccess: false,
        })
    });
})
