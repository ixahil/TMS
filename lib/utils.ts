import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const userStatusMap = {
  ACTIVE: {
    color: "bg-green-500",
    text: "Active",
  },
  SUSPENDED: {
    color: "bg-red-500",
    text: "Suspended",
  },
  UNDER_REVIEW: {
    color: "bg-yellow-500",
    text: "Under Review",
  },
} as const;

export const tourStatusMap = {
  ACTIVE: {
    color: "bg-green-500",
    text: "Active",
  },
  DRAFT: {
    color: "bg-red-500",
    text: "Draft",
  },
  UNDER_REVIEW: {
    color: "bg-yellow-500",
    text: "Under Review",
  },
} as const;

export const userStatus = Object.keys(userStatusMap) as Array<
  keyof typeof userStatusMap
>;

// utils/exportUtils.ts
import * as XLSX from "xlsx";

export type ExportOptions = {
  fileName?: string;
  fileType?: "csv" | "xlsx";
};

/**
 * Export data to CSV or Excel and trigger browser download
 * @param data - Array of objects to export
 * @param options - Options like fileName and fileType
 */
export const exportData = (data: object[], options?: ExportOptions) => {
  if (!data || data.length === 0) {
    console.error("No data to export.");
    return;
  }

  const { fileName = "export", fileType = "xlsx" } = options || {};
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");

  if (fileType === "csv") {
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    triggerDownload(blob, `${fileName}.csv`);
  } else {
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    triggerDownload(blob, `${fileName}.xlsx`);
  }
};

const triggerDownload = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};
