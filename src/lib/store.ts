/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type Store = {
  data: any;
  update: (data: any) => void;
};

type LogsStore = {
  logs: any;
  update: (data: any) => void;
  reset: () => void;
};

const useTableStore = create<Store>()((set) => ({
  data: [],
  update: (data) => set(() => ({ data: data })),
  reset: () => set(() => ({ data: [] })),
}));

const useLogsStore = create<LogsStore>()((set) => ({
  logs: ["Currently, this application is in the beta stage."],
  update: (_data: any) =>
    set((state) => {
      let logEntry: string;

      if (typeof _data === "string") {
        logEntry = _data;
      } else if (typeof _data === "object" && _data.message) {
        logEntry = _data.message;
      } else {
        logEntry = "Error: Unknown error";
      }

      return {
        logs: [...state.logs, logEntry],
      };
    }),
  reset: () =>
    set(() => ({
      logs: ["Currently, this application is in the beta stage."],
    })),
}));

export { useTableStore, useLogsStore };
