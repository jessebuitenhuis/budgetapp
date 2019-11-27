type PickR<T, R> = {
  [P in keyof T]: T[P] extends R ? P : never;
}[keyof T];
type Remove<T, R> = Omit<T, PickR<T, R>>;

export type Viewmodel<T> = Omit<Remove<T, Function>, "id"> & { id?: string };
