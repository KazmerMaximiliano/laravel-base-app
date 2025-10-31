import { router } from "@inertiajs/react";
import { themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DataTableProps } from "./DataTable.types";

const myTheme = themeQuartz.withParams({
  accentColor: "#283593",
  borderRadius: 6,
  browserColorScheme: "light",
  columnBorder: false,
  fontFamily: ["Arial", "sans-serif"],
  fontSize: 16,
  headerFontSize: 16,
  spacing: 8,
  wrapperBorderRadius: 24,
});

export const DataTable = ({
  data,
  currentPage,
  pageSize,
  paginationRoute,
  total,
}: DataTableProps) => {
  const { t } = useTranslation("headers");

  const [rowData, setRowData] = useState<Record<string, unknown>[]>([]);
  const [colDefs, setColDefs] = useState<
    { field: string; headerName: string }[]
  >([]);
  const [pageSizeSelector, setPageSizeSelector] = useState<number[]>([
    10, 25, 50, 100,
  ]);
  const [gridApi, setGridApi] = useState<any>(null);

  const defineRowData = () => {
    if (typeof total === "number" && total > 0 && currentPage && pageSize) {
      const allRows: Record<string, unknown>[] = [];

      for (let i = 0; i < total; i++) {
        const pageForRow = Math.floor(i / pageSize) + 1;
        const indexInPage = i % pageSize;

        if (pageForRow === currentPage && indexInPage < data.length) {
          allRows[i] = data[indexInPage];
        } else {
          const placeholder: Record<string, unknown> = {
            __placeholder: true,
            __rowIndex: i,
            __page: pageForRow,
          };

          if (data.length > 0) {
            Object.keys(data[0]).forEach((key) => {
              placeholder[key] = `Página ${pageForRow}...`;
            });
          }

          allRows[i] = placeholder;
        }
      }

      setRowData(allRows);
    } else {
      setRowData(data);
    }
  };

  const defineColumnsByData = () => {
    if (data.length === 0) return;

    const columns = Object.keys(data[0]).map((key) => ({
      field: key,
      headerName: t(key) || key,
    }));
    console.log(columns);
    setColDefs(columns);
  };

  const handlePageSizeSelector = () => {
    const source = typeof total === "number" && total > 0 ? total : data.length;
    let sizes = [10, 25, 50, 100].filter((size) => size <= source);
    if (sizes.length === 0) {
      sizes = [Math.max(1, source)];
    }
    setPageSizeSelector(sizes);
  };

  const handlePaginate = (current: number, size: number) => {
    if (currentPage === current && pageSize === size) {
      return;
    }

    if (paginationRoute) {
      router.get(
        paginationRoute,
        {
          currentPage: current,
          pageSize: size,
        },
        {
          preserveState: true,
          preserveScroll: true,
        },
      );
    }
  };

  useEffect(() => {
    if (gridApi && total && currentPage) {
      defineRowData();

      const targetPage = currentPage - 1;
      const currentGridPage = gridApi.paginationGetCurrentPage();

      if (currentGridPage !== targetPage) {
        gridApi.paginationGoToPage(targetPage);
      }
    }
  }, [gridApi, data, currentPage, pageSize, total]);

  useEffect(() => {
    defineColumnsByData();
    defineRowData();
    handlePageSizeSelector();
  }, [data, currentPage, pageSize, total]);

  return (
    <AgGridReact
      theme={myTheme}
      rowData={rowData}
      columnDefs={colDefs}
      pagination={true}
      paginationPageSize={pageSize || 10}
      paginationPageSizeSelector={pageSizeSelector}
      suppressPaginationPanel={false}
      paginationAutoPageSize={false}
      onGridReady={(params) => {
        setGridApi(params.api);
      }}
      onPaginationChanged={(e) => {
        const size = e.api.paginationGetPageSize();
        const current = e.api.paginationGetCurrentPage() + 1;

        if (current !== currentPage || size !== pageSize) {
          handlePaginate(current, size);
        }
      }}
      getRowStyle={(params) => {
        if (params.data?.__placeholder) {
          return {
            backgroundColor: "#f8f9fa",
            opacity: "0.7",
            fontStyle: "italic",
          };
        }
        return undefined;
      }}
      // isRowSelectable={(params) => {
      //   return !params.data?.__placeholder;
      // }}

      onCellClicked={(params) => {
        if (params.data?.__placeholder) {
          const targetPage = params.data.__page as number;
          if (targetPage !== currentPage) {
            handlePaginate(targetPage, pageSize || 10);
          }
        }
      }}
      domLayout="autoHeight"
      autoSizeStrategy={{
        type: "fitGridWidth",
        defaultMinWidth: 100,
      }}
    />
  );
};
