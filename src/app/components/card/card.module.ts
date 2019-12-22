import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardComponent } from "./card.component";
import { CardBodyComponent } from "./card-body/card-body.component";
import { CardHeaderComponent } from "./card-header/card-header.component";
import { CardFooterComponent } from "./card-footer/card-footer.component";

const components = [
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  CardFooterComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: [...components],
  exports: [...components]
})
export class CardModule {}
