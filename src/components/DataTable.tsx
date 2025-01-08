import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React from "react";
import { formattedTableData } from "../utils/dataUtils";

interface Props {
  isDarkMode: boolean;
}

export const DataTable: React.FC<Props> = ({ isDarkMode }: Props) => {
  const data = formattedTableData();

  const columns: ColDef[] = [
    { headerName: "Device", field: "device" },
    { headerName: "Start Time", field: "start_time" },
    { headerName: "Resolution Time", field: "resolution_time" },
    { headerName: "Duration", field: "duration" },
    {
      headerName: "Category",
      field: "category",
      filter: "agSetColumnFilter",
    },
    { headerName: "Alarm Code", field: "alarm_code" },
    {
      headerName: "Description",
      field: "description",
      filter: "agTextColumnFilter",
    },
  ];

  return (
    <div className={isDarkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'} style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={{
          sortable: true,
          flex: 1,
          floatingFilter: true,
        }}
      />
    </div>
  );
};
