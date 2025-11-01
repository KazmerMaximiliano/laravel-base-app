import { router } from "@inertiajs/react";
import { themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useResponsive } from "../../hooks/useResponsive";
import { DataTableColDef, DataTableProps } from "./DataTable.types";

export const DataTable = ({
  data,
  currentPage,
  pageSize,
  paginationRoute,
  total,
}: DataTableProps) => {
  const { t } = useTranslation("headers");
  const { isMobile, isTablet } = useResponsive();

  const [rowData, setRowData] = useState<Record<string, unknown>[]>([]);
  const [colDefs, setColDefs] = useState<DataTableColDef[]>([]);
  const [pageSizeSelector, setPageSizeSelector] = useState<number[]>([]);

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

  const defineRowData = () => {
    if (total && total > 0 && currentPage && pageSize) {
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

    const columns = Object.keys(data[0]).map((key) => ({
      field: key,
      headerName: t(key) || key,
    }));

    setColDefs(columns);
  };

  const handlePageSizeSelector = () => {
    const source = total && total > 0 ? total : data.length;
    const baseSizes = [10, 25, 50, 100];

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
    defineColumnsByData();
    defineRowData();
    handlePageSizeSelector();
  }, [data, currentPage, pageSize, total, isMobile, isTablet]);

  return (
    <div style={{ height: "500px" }}>
      <AgGridReact
        theme={responsiveTheme}
        rowData={rowData}
        columnDefs={colDefs}
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
        onPaginationChanged={(e) => {
          const size = e.api.paginationGetPageSize();
          const current = e.api.paginationGetCurrentPage() + 1;
          if (current !== currentPage || size !== pageSize) {
            handlePaginate(current, size);
          }
        }}
        domLayout="autoHeight"
        autoSizeStrategy={{
          type: "fitGridWidth",
          defaultMinWidth: 100,
        }}
      />
    </div>
  );
};
