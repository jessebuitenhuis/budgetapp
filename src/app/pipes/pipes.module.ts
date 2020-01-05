import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProxyCurrencyPipe } from "./proxy-currency.pipe";

const pipes = [ProxyCurrencyPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...pipes],
  exports: [...pipes]
})
export class PipesModule {}
