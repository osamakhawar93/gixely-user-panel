import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExchangeComponent } from './exchange.component.ts';
export const routes = [
  { path: '', component: ExchangeComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ExchangeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export default class TeamsModule {
  static routes = routes;
}
