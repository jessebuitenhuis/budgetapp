import { moduleMetadata } from "@storybook/angular";
import { FormsModule } from "./forms.module";

export default {
  title: "Forms | InputTextDirective",
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
      <input appInputText>
    </app-form-group>
  `
});
