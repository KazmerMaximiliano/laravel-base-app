import { router } from "@inertiajs/react";
import { themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useResponsive } from "../../hooks/useResponsive";
import { DataTableProps } from "./DataTable.types";

export const DataTable = ({
  data,
  currentPage,
  pageSize,
  paginationRoute,
  total,
}: DataTableProps) => {
  const { t } = useTranslation("headers");
  const { isMobile, isSmallMobile, isTablet } = useResponsive();

  const [rowData, setRowData] = useState<Record<string, unknown>[]>([]);
  const [colDefs, setColDefs] = useState<
    {
      field: string;
      headerName: string;
      flex?: number;
      minWidth?: number;
      maxWidth?: number;
      resizable?: boolean;
    }[]
  >([]);
  const [pageSizeSelector, setPageSizeSelector] = useState<number[]>([
    10, 25, 50, 100,
  ]);
  const [gridApi, setGridApi] = useState<any>(null);

  const responsiveTheme = useMemo(() => {
    return themeQuartz.withParams({
      accentColor: "#283593",
      borderRadius: 6,
      browserColorScheme: "light",
      columnBorder: false,
      fontFamily: ["Arial", "sans-serif"],
      fontSize: isMobile ? 14 : isTablet ? 15 : 16,
      headerFontSize: isMobile ? 14 : isTablet ? 15 : 16,
      spacing: isMobile ? 4 : isTablet ? 6 : 8,
      wrapperBorderRadius: 24,
    });
  }, [isMobile, isTablet]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: isMobile ? 100 : 120,
      resizable: !isMobile,
      sortable: true,
      filter: !isMobile,
      floatingFilter: false,
    }),
    [isMobile],
  );

  const autoSizeStrategy = useMemo(
    () => ({
      type: "fitGridWidth" as const,
      defaultMinWidth: isMobile ? 80 : 100,
    }),
    [isMobile],
  );

  const handleResize = useCallback(() => {
    if (gridApi) {
      setTimeout(() => {
        gridApi.sizeColumnsToFit();
      }, 100);
    }
  }, [gridApi]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

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

    const columns = Object.keys(data[0]).map((key, index) => {
      const baseMinWidth = isMobile ? 100 : 120;
      const firstColumnMinWidth = isMobile ? 120 : 150;

      const baseConfig = {
        field: key,
        headerName: t(key) || key,
        flex: index === 0 ? (isMobile ? 1.5 : 2) : 1,
        minWidth: index === 0 ? firstColumnMinWidth : baseMinWidth,
        resizable: !isMobile,
        sortable: false,
        filter: false,
        suppressMenu: isMobile,
      };

      if (
        key.toLowerCase().includes("id") ||
        key.toLowerCase().includes("numero")
      ) {
        return {
          ...baseConfig,
          flex: isMobile ? 0.8 : 0.5,
          minWidth: isMobile ? 70 : 80,
          maxWidth: isMobile ? 100 : 120,
        };
      }

      if (
        key.toLowerCase().includes("fecha") ||
        key.toLowerCase().includes("date")
      ) {
        return {
          ...baseConfig,
          flex: 1,
          minWidth: isMobile ? 100 : 120,
          maxWidth: isMobile ? 150 : 200,
          cellRenderer: isMobile
            ? (params: any) => {
                if (params.value) {
                  const date = new Date(params.value);
                  return date.toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  });
                }
                return params.value;
              }
            : undefined,
        };
      }

      if (
        key.toLowerCase().includes("email") ||
        key.toLowerCase().includes("url")
      ) {
        return {
          ...baseConfig,
          flex: isMobile ? 1.2 : 1.5,
          minWidth: isMobile ? 150 : 200,
          cellRenderer: isMobile
            ? (params: any) => {
                if (params.value && params.value.length > 20) {
                  return `${params.value.substring(0, 20)}...`;
                }
                return params.value;
              }
            : undefined,
        };
      }

      return baseConfig;
    });

    console.log(columns);
    setColDefs(columns);
  };

  const handlePageSizeSelector = () => {
    const source = typeof total === "number" && total > 0 ? total : data.length;
    const baseSizes = isMobile ? [5, 10, 25] : [10, 25, 50, 100];
    let sizes = baseSizes.filter((size) => size <= source);
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
  }, [data, currentPage, pageSize, total, isMobile, isTablet]);

  return (
    <div
      className="responsive-data-table-container no-floating-pagination"
      style={
        isSmallMobile ? { height: "500px", minHeight: "400px" } : undefined
      }
    >
      <AgGridReact
        theme={responsiveTheme}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        autoSizeStrategy={autoSizeStrategy}
        pagination={!isMobile}
        paginationPageSize={pageSize || 10}
        paginationPageSizeSelector={pageSizeSelector}
        suppressPaginationPanel={false}
        paginationAutoPageSize={false}
        suppressScrollOnNewData={true}
        maintainColumnOrder={true}
        suppressColumnVirtualisation={isMobile}
        suppressHorizontalScroll={false}
        alwaysShowHorizontalScroll={false}
        suppressMenuHide={isMobile}
        suppressNoRowsOverlay={isMobile}
        suppressRowHoverHighlight={false}
        rowSelection={isMobile ? undefined : "single"}
        rowHeight={isMobile ? 48 : undefined}
        headerHeight={isMobile ? 40 : undefined}
        onGridReady={(params) => {
          setGridApi(params.api);
          params.api.sizeColumnsToFit();
        }}
        onGridSizeChanged={(params) => {
          params.api.sizeColumnsToFit();
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
        getRowId={(params) => {
          if (params.data?.__placeholder) {
            return `placeholder-${params.data.__rowIndex}`;
          }
          return params.data.id?.toString() || `row-${Math.random()}`;
        }}
        onCellClicked={(params) => {
          if (params.data?.__placeholder) {
            const targetPage = params.data.__page as number;
            if (targetPage !== currentPage) {
              handlePaginate(targetPage, pageSize || (isMobile ? 5 : 10));
            }
          }
        }}
        domLayout={isSmallMobile ? "normal" : "autoHeight"}
      />
    </div>
  );
};
