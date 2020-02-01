import {
  EntityMetadataMap,
  EntityDataModuleConfig,
  EntityPluralNames
} from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
  Account: {},
  Budget: {},
  Category: {},
  Payee: {},
  Transaction: {}
};

const pluralNames: EntityPluralNames = {
  Category: "Categories"
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
