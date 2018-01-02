import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IcoComponent } from './ico.component.ts';
import '../../app/qrcode/jquery.qrcode.min.js';

export const routes = [
  { path: '', component: IcoComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    IcoComponent
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
