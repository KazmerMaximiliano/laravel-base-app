import { router } from "@inertiajs/react";
import { ICellRendererParams, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useResponsive } from "../../hooks/useResponsive";
import { colorAliases } from "../../styles/colors";
import { Actions } from "../Actions/Actions";
import { IconButton } from "../IconButton/IconButton";
import "./DataTable.styles.css";
import { DataTableColDef, DataTableProps } from "./DataTable.types";

const NoRowsOverlay = () => {
  const { t } = useTranslation("datatable");

  return (
    <div className="no-rows-overlay">
      <div className="no-rows-content">
        <h3 className="no-rows-title">{t("noRowsToShow")}</h3>
        <p className="no-rows-description">{t("noRowsDescription")}</p>
      </div>
    </div>
  );
};

const DataTableComponent = <T extends object>({
  data,
  route,
  pagination,
  onEdit,
  onDelete,
  onInfo,
}: DataTableProps<T>) => {
  const { t } = useTranslation("headers");
  const { isMobile, isTablet } = useResponsive();

  const { current_page, last_page, per_page, total } = pagination;

  const [rowData, setRowData] = useState(data);
  const [colDefs, setColDefs] = useState<DataTableColDef[]>([]);
  const [pageSizeSelector, setPageSizeSelector] = useState<number[]>([]);

  const responsiveTheme = useMemo(() => {
    return themeQuartz.withParams({
      accentColor: colorAliases.primaryColor,
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
    setRowData(data);
  };

  const defineColumnsByData = () => {
    if (data.length === 0) return;

    const columns: DataTableColDef[] = Object.keys(data[0]).map((key) => ({
      field: key,
      headerName: t(key) || key,
    }));

    if (onEdit || onDelete || onInfo) {
      columns.push({
        field: "actions",
        headerName: "",
        cellRenderer: renderActions,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
        cellClass: "actions-cell",
        headerClass: "actions-header",
        cellStyle: {
          borderLeft: "none",
          borderRight: "none",
        },
      });
    }

    setColDefs(columns);
  };

  const renderActions = (params: ICellRendererParams) => {
    const rowData = params.data;

    if (!rowData) {
      return null;
    }

    return (
      <Actions
        onInfo={onInfo ? () => onInfo(rowData) : undefined}
        onEdit={onEdit ? () => onEdit(rowData) : undefined}
        onDelete={onDelete ? () => onDelete(rowData) : undefined}
      />
    );
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
        pagination={false}
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
        suppressNoRowsOverlay={false}
        suppressRowHoverHighlight={false}
        rowSelection={isMobile ? undefined : "single"}
        rowHeight={isMobile ? 48 : undefined}
        headerHeight={isMobile ? 40 : undefined}
        domLayout="autoHeight"
        autoSizeStrategy={{
          type: "fitGridWidth",
          defaultMinWidth: 100,
        }}
        noRowsOverlayComponent={NoRowsOverlay}
      />

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
    </div>
  );
};

export const DataTable = DataTableComponent as typeof DataTableComponent;
