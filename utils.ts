import {StorageObj} from "react-storage-hooks/dist/common";

// needed to use browser storage (session/local) with SSR
export const serverSideStorage: StorageObj = {
  getItem: () => null,
  setItem: () => {
  },
  removeItem: () => {
  },
};

// determines if current rendering environment is a browser (for SSR)
export const isBrowser = () => typeof window !== 'undefined';