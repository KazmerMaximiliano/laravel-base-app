import { router } from "@inertiajs/react";
import { themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useResponsive } from "../../hooks/useResponsive";
import { IconButton } from "../IconButton/IconButton";
import "./DataTable.styles.css";
import { DataTableColDef, DataTableProps } from "./DataTable.types";

export const DataTable = ({ data, route, pagination }: DataTableProps) => {
  const { t } = useTranslation("headers");
  const { isMobile, isTablet } = useResponsive();

  const { current_page, from, last_page, per_page, to, total } = pagination;

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
    if (isMobile) {
      setRowData(data);
      return;
    }

    if (total && total > 0 && current_page && per_page) {
      const allRows: Record<string, unknown>[] = [];

      for (let i = 0; i < total; i++) {
        const pageForRow = Math.floor(i / per_page) + 1;
        const indexInPage = i % per_page;

        if (pageForRow === current_page && indexInPage < data.length) {
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
    if (current_page === current && per_page === size) {
      return;
    }

    if (route) {
      router.get(
        route,
        {
          currentPage: current,
          pageSize: size,
        },
        {
          preserveState: false,
          preserveScroll: false,
          replace: true,
        },
      );
    }
  };

  useEffect(() => {
    defineColumnsByData();
    defineRowData();
    handlePageSizeSelector();
  }, [data, current_page, per_page, total, isMobile, isTablet]);

  return (
    <div className="data-table-container">
      <AgGridReact
        theme={responsiveTheme}
        rowData={rowData}
        columnDefs={colDefs}
        pagination={!isMobile}
        paginationPageSize={per_page || 10}
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
        onPaginationChanged={
          !isMobile
            ? (e) => {
                const size = e.api.paginationGetPageSize();
                const current = e.api.paginationGetCurrentPage() + 1;
                if (current !== current_page || size !== per_page) {
                  handlePaginate(current, size);
                }
              }
            : undefined
        }
        domLayout="autoHeight"
        autoSizeStrategy={{
          type: "fitGridWidth",
          defaultMinWidth: 100,
        }}
      />
      {isMobile && (
        <div className="pagination-controls">
          <IconButton
            disabled={current_page === 1}
            onClick={() => {
              handlePaginate(current_page - 1, per_page);
            }}
            icon={FaChevronLeft}
          />
          <span className="pagination-info">
            {`${current_page} / ${last_page}`}
          </span>
          <IconButton
            disabled={current_page === last_page}
            onClick={() => {
              handlePaginate(current_page + 1, per_page);
            }}
            icon={FaChevronRight}
          />
        </div>
      )}
    </div>
  );
};
