import { moduleMetadata } from "@storybook/angular";
import { FormsModule } from "@angular/forms";
import { action } from "@storybook/addon-actions";
import { RadioComponent } from "./radio.component";

export default {
  title: "Forms|Radio",
  decorators: [
    moduleMetadata({
      declarations: [RadioComponent],
      imports: [FormsModule]
    })
  ]
};

export const checkbox = () => ({
  template: `
  <app-radio name="test" [val]="val1" [(ngModel)]="value" (ngModelChange)="onChange($event)">Option 1</app-radio>
  <app-radio name="test" [val]="val2" [(ngModel)]="value" (ngModelChange)="onChange($event)">Option 2</app-radio>
  <app-radio name="test" [val]="val3" [(ngModel)]="value" (ngModelChange)="onChange($event)">Option 3</app-radio>
  <app-radio name="test" val="disabled" [(ngModel)]="value" [disabled]="true" (ngModelChange)="onChange($event)">Disabled</app-radio>
  `,
  props: {
    value: undefined,
    val1: new Date(),
    val2: { test: "test" },
    val3: "string",
    onChange: action("onChange")
  }
});
