import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSupplierCards } from "../../api/main-api";
import { AppThunk, RootState } from "../store";
import { TErrorResponse, TSupplierCardsState } from "../../types/types";

export const initialState: TSupplierCardsState = {
    list: [],
    isLoading: false,
    error: null,
};

export const supplierCardsSlice = createSlice({
    name: 'supplierCards',
    initialState,
    reducers: {
        supplierCardsRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        supplierCardsSuccess: (state, action: PayloadAction<Array<string>>) => {
            state.isLoading = false;
            state.list = action.payload;
        },
        supplierCardsError: (state, action: PayloadAction<TErrorResponse>) => {
            state.isLoading = false;
            state.error = action?.payload;
        }
    }
});
export default supplierCardsSlice.reducer;

export const {
    supplierCardsRequest,
    supplierCardsSuccess,
    supplierCardsError,
} = supplierCardsSlice.actions;

export const supplierCardsState = (store: RootState) => store.supplierCards;

export const getSupplierCards = (): AppThunk => async (dispatch) => {
    dispatch(supplierCardsRequest())
    try {
        await fetchSupplierCards()
            .then((data) => dispatch(supplierCardsSuccess(data)))
    } catch (error: any) {
        dispatch(supplierCardsError(error));
    }
};
