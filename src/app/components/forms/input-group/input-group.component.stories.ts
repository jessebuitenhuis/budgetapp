import { moduleMetadata } from "@storybook/angular";
import { FormsModule } from "../forms.module";

export default {
  title: "Forms | InputGroupComponent",
  decorators: [
    moduleMetadata({
      imports: [FormsModule]
    })
  ]
};

export const Default = () => ({
  template: `
    <app-input-group>
      <input type="text" class="form-control">
    </app-input-group>
  `
});

export const WithText = () => ({
  template: `
    <app-input-group appendText="appended" prependText="prepended">
      <input type="text" class="form-control">
    </app-input-group>
  `
});

export const WithIcons = () => ({
  template: `
    <app-input-group appendIcon="fa fa-search" prependIcon="fa fa-search">
      <input type="text" class="form-control">
    </app-input-group>
  `
});
