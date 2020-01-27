import { moduleMetadata } from "@storybook/angular";
import { FormsModule } from "@angular/forms";
import { action } from "@storybook/addon-actions";
import { CheckboxComponent } from "./checkbox.component";

export default {
  title: "Forms|Checkbox",
  decorators: [
    moduleMetadata({
      declarations: [CheckboxComponent],
      imports: [FormsModule]
    })
  ]
};

export const checkbox = () => ({
  template: `<app-checkbox name="democheckbox" [(ngModel)]="isSelected" (ngModelChange)="onChange($event)">Label text</app-checkbox>`,
  props: {
    onChange: action("onChange")
  }
});
