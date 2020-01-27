import { moduleMetadata } from "@storybook/angular";
import { TableModule } from "./table.module";
import { FormsModule } from "@angular/forms";

export default {
  title: "TableComponent",
  decorators: [
    moduleMetadata({
      imports: [TableModule, FormsModule]
    })
  ]
};

const items = [
  { id: 1, name: "Number 1" },
  { id: 2, name: "Number 2" }
];

export const Default = () => ({
  template: `
    <app-table [data]="items" title="Table title">
      <ng-container cdkColumnDef="id">
        <th cdk-header-cell *cdkHeaderCellDef>Id</th>
        <td cdk-cell *cdkCellDef="let item">{{ item.id }}</td>
      </ng-container>

      <ng-container cdkColumnDef="name">
        <th cdk-header-cell *cdkHeaderCellDef>Name</th>
        <td cdk-cell *cdkCellDef="let item">{{ item.name }}</td>
      </ng-container>
    </app-table>
  `,
  props: {
    items
  }
});

export const WithSelect = () => ({
  template: `
    <app-table [data]="items" title="Table title" [showSelect]="true">
      <ng-container cdkColumnDef="id">
        <th cdk-header-cell *cdkHeaderCellDef>Id</th>
        <td cdk-cell *cdkCellDef="let item">{{ item.id }}</td>
      </ng-container>

      <ng-container cdkColumnDef="name">
        <th cdk-header-cell *cdkHeaderCellDef>Name</th>
        <td cdk-cell *cdkCellDef="let item">{{ item.name }}</td>
      </ng-container>
    </app-table>
  `,
  props: {
    items
  }
});
