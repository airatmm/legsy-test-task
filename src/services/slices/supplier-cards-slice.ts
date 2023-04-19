import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSupplierCards } from "../../api/main-api";
import { AppThunk, RootState } from "../store";
import { TErrorResponse, TSupplierCardsState } from "../../types/types";

export const initialState: TSupplierCardsState = {
    list: [],
    isLoading: false,
    error: null,
    isSuccess: false,
};


export const supplierCardsSlice = createSlice({
    name: 'supplierCards',
    initialState,
    reducers: {
        supplierCardsRequest: (state) => {
            state.isLoading = true;
            state.error = null;
            state.isSuccess = false;
        },
        supplierCardsSuccess: (state, action: PayloadAction<Array<string>>) => {
            state.isLoading = false;
            state.list = action.payload;
            state.isSuccess = true;
        },
        supplierCardsError: (state, action: PayloadAction<TErrorResponse>) => {
            state.isLoading = false;
            state.error = action?.payload;
            state.isSuccess = false;
        }
    }

    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getSupplierCards.pending, (state) => {
    //             state.isLoading = true;
    //         })
    //         .addCase(getSupplierCards.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //         })
    //         .addCase(getSupplierCards.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.error.message || 'Something went wrong';
    //         })
    // }
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
    } catch(error: any) {
        dispatch(supplierCardsError(error));
    }
};
