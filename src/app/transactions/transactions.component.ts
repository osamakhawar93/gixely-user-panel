import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService';
import { UserModel } from '../../models/user.Model';
import { UserslistModel } from '../../models/userslist.Model';
import { DashboardModel } from '../../models/dashboard.Model';
@Component({
  selector: 'transactions',
  styleUrls: ['./transactions.style.scss'],
  templateUrl: './transactions.template.html',
  providers: [UserService],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'transactions-page app'
  },
})
export class TransactionsComponent {
  router: Router;

  public userObject: UserModel;
  public dashboardData:DashboardModel;
  public dashboardDataFetched:boolean = false;




  constructor(router: Router,public _userService: UserService) {
    this.router = router;

    this.userObject = JSON.parse(localStorage.getItem('userObject'));

    this._userService.getDashboardData(this.userObject.token).subscribe(a=>{

      this.dashboardData = a.data;
      this.dashboardDataFetched = true;
    })

    this.getAllTransactions();
  }

  getAllTransactions(){


    this._userService.getAllTransactions(this.userObject.token).subscribe(a=>{
      console.log(a);
    })

  }


}
