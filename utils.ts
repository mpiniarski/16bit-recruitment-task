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

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomOddInt = (min: number, max: number) => {
  const number = randomInt(min, max - 1);
  return number % 2 == 0 ? number + 1 : number
}

export const randomEvenInt = (min: number, max: number) => {
  const number = randomInt(min, max - 1);
  return number % 2 == 0 ? number : number + 1
}