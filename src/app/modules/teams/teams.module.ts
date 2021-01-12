import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TeamsComponent } from "./teams.component";
import { SpinnerModule } from "../../shared/spinner/spinner.module";

@NgModule({
  declarations: [
    TeamsComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule
  ],
  exports: [
    TeamsComponent
  ]
})

export class TeamsModule {}