import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FavoriteComponent } from './favorite.component';
import { SpinnerModule } from '../../shared/spinner/spinner.module';
import { FavoriteRoutingModule } from './favorite-routing.module';

@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    SpinnerModule
  ]
})

export class FavoriteModule {}
