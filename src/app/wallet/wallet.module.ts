import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WalletComponent } from './wallet.component.ts';
import '../../app/qrcode/jquery.qrcode.min.js';
export const routes = [
  { path: '', component: WalletComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    WalletComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export default class ErrorModule {
  static routes = routes;
}
