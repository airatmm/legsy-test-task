import React, { useEffect, useMemo } from 'react';
import styles from './app.module.css';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getSupplierCards, supplierCardsState } from "../../services/slices/supplier-cards-slice";
import { cardsDetailState, getCardDetails } from "../../services/slices/cards-details-slice";
import { cardsPhotoState, getCardsPhoto } from "../../services/slices/cards-photo-slice";
import Table from "../table/table";
import { addGraphData } from "../../utils/graph-generate";
import { TCardDetailWithGraph, TCardDetailWithImage } from "../../types/types";

function App(): JSX.Element {
    const dispatch = useAppDispatch();
    const { list: nomenclatures } = useAppSelector(supplierCardsState)
    const { list: cardsDetails } = useAppSelector(cardsDetailState)
    const { dict } = useAppSelector(cardsPhotoState)

    const dataWithGraph = addGraphData(cardsDetails)

    const dataWithImage = useMemo(() => {
        if (dataWithGraph.length > 0 && Object.keys(dict).length > 0) {
            return dataWithGraph.map((obj) => {
                const image = dict[obj.id];
                return image ? { ...obj, image } : obj;
            });
        }
    }, [dataWithGraph, dict]) as Array<TCardDetailWithImage>;
    console.log(dataWithImage)
    //console.log(dataWithImage && typeof dataWithImage[0].graph[0].date)

    useEffect(() => {
        dispatch(getSupplierCards())
    }, [dispatch])

    // console.log(nomenclatures)
    //console.log(cardsDetails)
    // console.log(dict)
    useEffect(() => {
        if (nomenclatures.length > 0) {
            dispatch(getCardsPhoto(nomenclatures))
            dispatch(getCardDetails(nomenclatures))
        }
    }, [dispatch, nomenclatures]);


    return (
        <div className={ styles.app }>
            <Table dataWithImage={dataWithImage}/>
        </div>
    );

}

export default App;
