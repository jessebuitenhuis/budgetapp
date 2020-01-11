import { SelectAccountsComponent } from "./select-accounts.component";
import { moduleMetadata } from "@storybook/angular";
import { CheckboxComponent } from "src/app/components/checkbox/checkbox.component";
import { Account } from "src/app/models/Account";
import { action } from "@storybook/addon-actions";
import { FormsModule } from "@angular/forms";

export default {
  title: "SelectAccounts",
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [SelectAccountsComponent, CheckboxComponent]
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
