import styles from './table.module.css'
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ColumnSparklineOptions, SelectionChangedEvent, ValueGetterParams } from "ag-grid-community";
import { TCardDetailWithImage, TGraphItem } from "../../types/types";

const Table = ({ dataWithImage: data }: { dataWithImage: Array<TCardDetailWithImage> }): JSX.Element => {
    const containerStyle = useMemo(() => ({ maxWidth: '1600px', width: '100%', height: '100%' }), []);

    const imageRenderer = ({ value }: { value: string }): JSX.Element => {
        return <a href={ value } target="_blank" rel="noreferrer">
            <img className={ styles.image } src={ value } alt='' />
        </a>
    };
    const sortData = (params: ValueGetterParams) => {
        const graph = params.data.graph;
        graph.sort((a: TGraphItem, b: TGraphItem) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
        });
        console.log(graph)
        return graph.map((item: TGraphItem) => [new Date(item.date).getTime(), item.amount]);

    }

    // выбор строк через чекбокс
    const onSelectionChanged = (event: SelectionChangedEvent) => {
        const selectedRows = event.api.getSelectedRows();
        // по логике здесь нужно дальше что то делать с ними и взаимодействовать
        console.log(selectedRows);
        // return selectedRows.map(row => row.id); // к примеру
    };

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            //flex: 1,
            minWidth: 120,
            enableValue: true,
            enableRowGroup: true,
            enablePivot: true,
            sortable: true,
            filter: true,
            resizable: true,
        };
    }, []);
    const autoGroupColumnDef = useMemo<ColDef>(() => {
        return {
            minWidth: 200,
        };
    }, []);

    const columnDefs = useMemo(() => [
        {
            field: 'image',
            headerName: 'Фото',
            cellRenderer: imageRenderer,
            checkboxSelection: true,
            headerCheckboxSelection: true,
            width: 100,
            pinned: true,
            filter: false,
        },
        {
            field: 'id',
            headerName: 'Номенклатура',
            sortable: true,
            width: 160,
            pinned: true,
        },
        {
            field: 'brand',
            headerName: 'Брэнд',
            sortable: true,
            width: 160,
        },
        {
            field: 'name',
            headerName: 'Имя',
            width: 410,
            sortable: true,
        },
        {
            field: 'salePriceU',
            valueFormatter: `value/100 + ' ₽'`,
            headerName: 'Цена',
            width: 100,
            sortable: true,
        },
        {
            field: 'graph',
            cellRenderer: 'agSparklineCellRenderer',
            valueGetter: sortData,
            cellRendererParams: {
                sparklineOptions: {
                    type: 'column',
                    xKey: 'date',
                    yKey: 'amount',
                    axis: {
                        type: 'time',
                    },
                } as ColumnSparklineOptions,
            },
            headerName: 'График заказов',
            flex: 1,
            filter: false,
        }
    ], []);

    const sideBar = {
        toolPanels: [
            {
                id: 'filters',
                labelDefault: 'Фильтры',
                labelKey: 'filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
            },
            {
                id: 'columns',
                labelDefault: 'Столбцы',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
            },
        ],
        defaultToolPanel: 'null',
    };

    return (
        <div style={ containerStyle }>
            <div className="ag-theme-alpine" style={ { height: 500, width: '100%' } }>
                <AgGridReact
                    className="ag-theme-alpine"
                    defaultColDef={ defaultColDef }
                    rowData={ data }
                    columnDefs={ columnDefs }
                    autoGroupColumnDef={ autoGroupColumnDef }
                    onSelectionChanged={ onSelectionChanged }
                    rowSelection="multiple"
                    rowMultiSelectWithClick={ false }
                    suppressRowClickSelection={ true }
                    debounceVerticalScrollbar={ true }
                    sideBar={ sideBar }
                >
                </AgGridReact>
            </div>
        </div>
    );
};

export default Table;
