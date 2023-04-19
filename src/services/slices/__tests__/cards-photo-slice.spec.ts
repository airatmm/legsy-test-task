import reducer, {
    initialState,
    cardsPhotoRequest,
    cardsPhotoSuccess,
    cardsPhotoError
} from '../cards-photo-slice';
import { testError } from "./cards-details-slice.spec";

const testCardsPhoto = {
  "116565962": "https://basket-08.wb.ru/vol1165/part116565/116565962/images/c246x328/1.jpg",
  "140374926": "https://basket-10.wb.ru/vol1403/part140374/140374926/images/c246x328/1.jpg",
  "148320325": "https://basket-10.wb.ru/vol1483/part148320/148320325/images/c246x328/1.jpg"
}

describe('cards photo reducer', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(initialState);
    });
    test('should return cards photo REQUEST', () => {
        const state = reducer(undefined, cardsPhotoRequest());
        expect(state).toEqual({
            dict: {},
            isLoading: true,
            error: null,
            isSuccess: false,
        })
    });
    test('should return cards photo SUCCESS', () => {
        const state = reducer(initialState, cardsPhotoSuccess(testCardsPhoto));
        expect(state).toEqual({
            dict: testCardsPhoto,
            isLoading: false,
            error: null,
            isSuccess: true,
        })
    });
    test('should return cards photo ERROR', () => {
        const state = reducer(initialState, cardsPhotoError(testError));
        expect(state).toEqual({
            dict: {},
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
