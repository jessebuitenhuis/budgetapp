import { moduleMetadata } from "@storybook/angular";
import { FormsModule } from "../forms.module";

export default {
  title: "Forms | FormGroupComponent",
  decorators: [
    moduleMetadata({
      imports: [FormsModule]
    })
  ]
};

export const Default = () => ({
  template: `
    <app-form-group>
      <label>Hello</label>
      <input type="text" class="form-control">
    </app-form-group>
  `
});
