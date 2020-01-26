import { moduleMetadata } from "@storybook/angular";
import { FormsModule } from "../forms.module";

export default {
  title: "Forms | InputSearchComponent",
  decorators: [
    moduleMetadata({
      imports: [FormsModule]
    })
  ]
};

export const Default = () => ({
  template: `
    <app-input-search></app-input-search>
  `
});
