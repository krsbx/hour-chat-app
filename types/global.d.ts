declare global {
  type KeyOf<T> = keyof T;
  type ValueOf<T> = T[KeyOf<T>];
}

export {};
