import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import supplierCardsSlice from "./slices/supplier-cards-slice";
import cardsDetailsSlice from "./slices/cards-details-slice";
import cardsPhotoSlice from "./slices/cards-photo-slice";

export const store = configureStore({
    reducer: {
        supplierCards: supplierCardsSlice,
        cardsDetails: cardsDetailsSlice,
        cardsPhoto: cardsPhotoSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
