import { FormsModule } from "@angular/forms";
import { action } from "@storybook/addon-actions";
import { moduleMetadata } from "@storybook/angular";
import { SelectAccountsComponent } from "./select-accounts.component";
import { InputsModule } from "src/app/components/inputs/inputs.module";

export default {
  title: "SelectAccounts",
  decorators: [
    moduleMetadata({
      imports: [FormsModule, InputsModule],
      declarations: [SelectAccountsComponent]
    })
  ]
};

export const selectAccounts = () => ({
  template: `<app-select-accounts [accounts]="accounts" [(ngModel)]="selected" (ngModelChange)="onChange($event)"></app-select-accounts>`,
  props: {
    selected: ["1"],
    accounts: [
      { id: "1", name: "Account 1" },
      { id: "2", name: "Account 2" }
    ],
    onChange: action("onChange")
  }
});
