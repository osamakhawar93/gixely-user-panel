import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LendingComponent } from './lending.component.ts';
export const routes = [
  { path: '', component: LendingComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    LendingComponent
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
