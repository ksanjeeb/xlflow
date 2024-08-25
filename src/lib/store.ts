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
  logs: ["Currently, this application is in the beta stage. We are open for feedback please submit feedback."],
  update: (data) => set((state) => ({ logs: state.logs.push(data) })),
  reset: () => set(() => ({ logs: ["Currently, this application is in the beta stage."] })),
}));

export { useTableStore, useLogsStore };
