import { Viewmodel } from "./types";

export abstract class BaseModel<T> {
  id: string = this.vm.id;

  constructor(private vm: Viewmodel<BaseModel<T>>) {}

  abstract clone(): T;
}
