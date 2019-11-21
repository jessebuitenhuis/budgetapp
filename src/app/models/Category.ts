import { Viewmodel } from "./types";
import { BaseModel } from "./BaseModel";

export class Category extends BaseModel<Category> {
  name: string = this.data.name;

  constructor(private data: Viewmodel<Category>) {
    super(data);
  }

  clone(): Category {
    const vm = JSON.parse(JSON.stringify(this));
    return new Category(vm);
  }
}
