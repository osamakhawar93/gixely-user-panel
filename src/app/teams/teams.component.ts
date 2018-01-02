import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {UserModel} from '../../models/user.Model';
import {UserService} from '../../services/userService';
import { DashboardModel } from '../../models/dashboard.Model';
import { SendgixelyModel } from '../../models/sendgixely.Model';
import  {ReferredUsersModel } from '../../models/referredUsers.Model';
declare var $: any;
declare var Clipboard:any;
@Component({
  selector: 'teams',
  styleUrls: [ './teams.style.scss' ],
  templateUrl: './teams.template.html',
  encapsulation: ViewEncapsulation.None,
  providers:[UserService],
  host: {
    class: 'teams-page app'
  },
})
export class TeamsComponent {
  router: Router;

  public thisUserName:string;
  public userObject:UserModel;
  public usersList : ReferredUsersModel[] = [];
  public gixelyAddress : any; 

  constructor(router: Router, public _userService:UserService) {
    this.router = router;
    this.userObject = JSON.parse(localStorage.getItem('userObject'));
    this.gixelyAddress = this.userObject.user.coupon;
    
    this._userService.getReferredMembers(this.userObject.token).subscribe(a=>{
      console.log(a);
      this.usersList = a.data.users;

      for (var i = 0; i < this.usersList.length; i++) {
        var date = new Date(this.usersList[i].createdAt);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dt = date.getDate();

        if (dt < 10) {
          dt = dt;
        }
        if (month < 10) {
          month = month;
        }

        this.usersList[i].createdAt = year + '/' + month + '/' + dt;
      }

    })
    
    
  }

  callToCopy(){
   
  }




  ngOnInit(){
    
    new Clipboard('.copyButton');
    
  }
  searchResult(): void {
    this.router.navigate(['/app', 'extra', 'search']);
  }
}
