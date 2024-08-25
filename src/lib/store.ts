/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type Store = {
  data: any;
  update: (data:any) => void;
};

const useTableStore = create<Store>()((set) => ({
  data: [],
  update: (data) => set(() => ({ data: data })),
  reset:() => set(() => ({ data: [] }))
}));

export { useTableStore };
