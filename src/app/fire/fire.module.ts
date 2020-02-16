import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { FireEffects } from "./fire.effects";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./fire.reducer";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("firestore", reducer),
    EffectsModule.forFeature([FireEffects])
  ],
  declarations: []
})
export class FireModule {}
