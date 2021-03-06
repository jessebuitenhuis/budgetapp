import { Injectable } from "@angular/core";
import { Category } from "../models/Category";
import { EntityService } from "./entity.service";

@Injectable({
  providedIn: "root"
})
export class CategoryService extends EntityService<Category> {
  constructor() {
    super("category");
  }
}
