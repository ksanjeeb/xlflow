/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function downloadJSON(array: any[]) {
  if (!array || array.length === 0) {
      console.error('No data to download');
      return;
  }

  const jsonString = JSON.stringify(array, null, 2);
  const jsonData = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  let jsonURL: string | null = null;

  if ((navigator as any).msSaveBlob) {
      (navigator as any).msSaveBlob(jsonData, 'data.json');
  } else {
      jsonURL = window.URL.createObjectURL(jsonData);
      const tempLink = document.createElement('a');
      tempLink.href = jsonURL;
      tempLink.setAttribute('download', 'data.json');
      tempLink.click();
  }
}