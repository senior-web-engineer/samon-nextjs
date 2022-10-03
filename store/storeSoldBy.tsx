import create from 'zustand';
import { persist } from 'zustand/middleware';

const useSoldBy = create(
  persist((set) => ({
    soldByFilter: null,
    updateSoldByFilter: (filterValue) =>
      set((state: any) => ({ ...state, soldByFilter: filterValue })),
  }))
);
export default useSoldBy;
