import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCardsPhoto } from "../../api/main-api";
import { AppThunk, RootState } from "../store";
import { CardsPhotoState, TCardDict, TErrorResponse } from "../../types/types";

export const initialState: CardsPhotoState = {
    dict: {},
    isLoading: false,
    error: null,
};

export const cardsPhotoSlice = createSlice({
    name: 'cardsPhoto',
    initialState,
    reducers: {
        cardsPhotoRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        cardsPhotoSuccess: (state, action: PayloadAction<TCardDict>) => {
            state.dict = action.payload;
            state.isLoading = false;
            state.error = null;
        },

        cardsPhotoError: (state, action: PayloadAction<TErrorResponse>) => {
            state.isLoading = false;
            state.error = action?.payload;
        },
    }
});

export default cardsPhotoSlice.reducer;
export const {
    cardsPhotoRequest,
    cardsPhotoSuccess,
    cardsPhotoError
} = cardsPhotoSlice.actions

export const cardsPhotoState = (store: RootState) => store.cardsPhoto;

export const getCardsPhoto = (nm_ids: Array<string>): AppThunk => async (dispatch) => {
    dispatch(cardsPhotoRequest());
    try {
        await fetchCardsPhoto({ nm_ids })
            .then((data) => dispatch(cardsPhotoSuccess(data)))
    } catch (error: any) {
        dispatch(cardsPhotoError(error))
    }
}

