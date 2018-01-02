import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamsComponent } from './teams.component.ts';
export const routes = [
  { path: '', component: TeamsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    TeamsComponent
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
