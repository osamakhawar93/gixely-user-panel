import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransactionsComponent } from 'app/transactions/transactions.component';

export const routes = [
  { path: '', component: TransactionsComponent, pathMatch: 'full' }
];



@NgModule({
  declarations: [
    TransactionsComponent
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
