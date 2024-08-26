/* eslint-disable no-prototype-builtins */
import toast from "react-hot-toast";
import { useLogsStore } from "./store";
const { update } = useLogsStore.getState();

/* eslint-disable @typescript-eslint/no-explicit-any */
export const applyFilter = (
  data: any[],
  filterKey: string,
  filterValue: string | number,
  filterColumn: string
): any => {
  try {
    if (!filterKey || !filterValue || !filterColumn) return data;

    switch (filterKey) {
      case "text_is_exactly":
        return data.filter((item) => item[filterColumn] == filterValue);
      case "text_is_not_exactly":
        return data.filter((item) => item[filterColumn] != filterValue);
      case "text_includes":
        return data.filter((item) => item[filterColumn]?.includes(filterValue));
      case "text_does_not_include":
        return data.filter(
          (item) => !item[filterColumn]?.includes(filterValue)
        );
      case "data_is_not_empty_or_null":
        return data.filter(
          (item) => item[filterColumn] != null && item[filterColumn] !== ""
        );
      case "data_matches_regex":
        // eslint-disable-next-line no-case-declarations
        const regex = new RegExp(filterValue as string);
        return data.filter((item) => regex.test(item[filterColumn]));
      case "number_equals":
        return data.filter((item) => item[filterColumn] == Number(filterValue));
      case "number_is_greater_than":
        return data.filter((item) => item[filterColumn] > Number(filterValue));
      case "number_is_greater_than_or_equals":
        return data.filter((item) => item[filterColumn] >= Number(filterValue));
      case "number_is_less_than":
        return data.filter((item) => item[filterColumn] < Number(filterValue));
      case "number_is_less_than_or_equals":
        return data.filter((item) => item[filterColumn] <= Number(filterValue));
      default:
        return data;
    }
  } catch (err) {
    console.error(err);
    toast.error("Error:" + err);
    update(err);
    return [];
  }
};

export const groupByKey = (data: any, key: string) => {
  try {
    return data.reduce((result: { [key: string]: any }, item: any) => {
      const groupKey = item[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {});
  } catch (err) {
    console.error(err);
    toast.error("Error:" + err);
    update(err);
    return [];
  }
};

export const handleExecute = async (dataset: any, fullCode: any) => {
  try {
    const dynamicFunction = new Function("return " + fullCode)();
    return await dynamicFunction(dataset);
  } catch (error) {
    toast.error("Function execution error:" + error);
    console.error("Function creation error:", error);
    update("Function creation error:" + error);
    return [];
  }
};

export function mergeByColumn(
  dataset1: any[],
  dataset2: any[],
  key: string
): any {
  try {
    const mergedMap: { [key: string]: any } = {};
    for (const item of dataset1) {
      if (item.hasOwnProperty(key)) {
        mergedMap[item[key]] = { ...item };
      } else {
        mergedMap[item[key]] = item;
      }
    }

    for (const item of dataset2) {
      if (item.hasOwnProperty(key)) {
        if (mergedMap[item[key]]) {
          mergedMap[item[key]] = { ...mergedMap[item[key]], ...item };
        } else {
          mergedMap[item[key]] = item;
        }
      } else {
        mergedMap[item[key]] = item;
      }
    }

    return Object.values(mergedMap);
  } catch (err) {
    console.error(err);
    toast.error("Error:" + err);
    update(err);
    return [];
  }
}

export const handleSlice = (data: any, sliceIndex: any) => {
  try {
    if(!sliceIndex) return data;
    const { from, to } = sliceIndex;
    if (from == 0 && to == 0) return data;
    const isValid = from >= 0 && to <= data.length && from < to;
    if (!isValid) {
      console.error("Invalid slice indices");
      return [];
    }

    return data.slice(Number(from), Number(to));
  } catch (err) {
    console.error(err);
    toast.error("Error:" + err);
    update(err);
    return [];
  }
};

export const handleSort = (
  data: any,
  { column_name, order }: { column_name: string; order: string }
) => {
  try {
    if (!column_name || !order) {
      return data;
    }

    const normalizedOrder = order.toLowerCase() === "asc" ? 1 : -1;

    return [...data].sort((a, b) => {
      const aValue = a[column_name];
      const bValue = b[column_name];
      if (aValue < bValue) return -normalizedOrder;
      if (aValue > bValue) return normalizedOrder;
      return 0;
    });
  } catch (err) {
    console.error(err);
    toast.error("Error:" + err);
    update(err);
    return [];
  }
};

export const handleStatsCalculation = (data: any[], columnName: string) => {
  try {
    if (!columnName) {
      return { min: 0, max: 0, average: 0, median: 0, sum: 0 };
    }

    const columnData = data
      .map((row: any) => Number(row[columnName]))
      .filter((value) => !isNaN(value));

    if (columnData.length === 0) {
      return { min: 0, max: 0, average: 0, median: 0, sum: 0 };
    }

    const sum = columnData.reduce((a, b) => a + b, 0);
    const min = Math.min(...columnData);
    const max = Math.max(...columnData);
    const average = sum / columnData.length;
    const sortedData = columnData.sort((a, b) => a - b);
    const median =
      sortedData.length % 2 === 0
        ? (sortedData[sortedData.length / 2 - 1] +
            sortedData[sortedData.length / 2]) /
          2
        : sortedData[Math.floor(sortedData.length / 2)];

    return { min, max, average, median, sum };
  } catch (err) {
    console.error(err);
    toast.error("Error:" + err);
    return { min: 0, max:0, average:0, median:0, sum:0 };
    update(err);
  }
};
