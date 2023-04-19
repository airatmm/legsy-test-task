import { TCardDetail, TCardDetailWithGraph, TGraphItem } from "../types/types";

const generateRandomAmount = () => Math.floor(Math.random() * 100);

const generateDate = () => {
    const start = new Date(2021, 0, 1); // начало периода, с которого нужно генерировать даты
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const day = String(randomDate.getDate()).padStart(2, '0');
    const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const seconds = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const milliseconds = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    return `${ year }/${ month }/${ day } ${ hours }:${ minutes }:${ seconds }.${ milliseconds }`;
}

export const addGraphData = (date: Array<TCardDetail>): Array<TCardDetailWithGraph> => {
    return date.map((item) => {
        const graph: Array<TGraphItem> = [];
        for (let i = 1; i <= 15; i++) {
            graph.push({
                date: generateDate(),
                amount: generateRandomAmount(),
            });
        }
        return { ...item, graph }
    })
}
