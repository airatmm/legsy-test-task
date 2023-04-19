import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from "../store";
import { fetchCardsDetails } from "../../api/main-api";
import { TCardDetail, TCardDetailState, TErrorResponse } from "../../types/types";

export const initialState: TCardDetailState = {
    list: [],
    isLoading: false,
    error: null,
}
export const cardsDetailsSlice = createSlice({
    name: 'cardsDetails',
    initialState,
    reducers: {
        cardsDetailsRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        cardsDetailsSuccess: (state, action: PayloadAction<Array<TCardDetail>>) => {
            state.isLoading = false;
            state.list = action.payload;
        },
        cardsDetailsError: (state, action: PayloadAction<TErrorResponse>) => {
            state.isLoading = false;
            state.error = action?.payload;
        }
    }
})

export default cardsDetailsSlice.reducer;
export const {
    cardsDetailsRequest,
    cardsDetailsSuccess,
    cardsDetailsError,
} = cardsDetailsSlice.actions;

export const cardsDetailState = (store: RootState) => store.cardsDetails;

export const getCardDetails = (nm_ids: Array<string>): AppThunk => async (dispatch) => {
    dispatch(cardsDetailsRequest());
    try {
        await fetchCardsDetails({ nm_ids })
            .then((data) => dispatch(cardsDetailsSuccess(data)))

    } catch (error: any) {
        dispatch(cardsDetailsError(error))
    }
}
