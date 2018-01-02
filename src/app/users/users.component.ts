import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService';
import { UserModel } from '../../models/user.Model';
import { UserslistModel } from '../../models/userslist.Model';

@Component({
  selector: 'UsersComponent',
  styleUrls: ['./users.style.scss'],
  templateUrl: './users.template.html',
  providers: [UserService],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'UsersComponent-page app'
  },
})
export class UsersComponent {
  router: Router;
  public userObject: UserModel;
  public usersList: UserslistModel[] = [];
  public searchedUsersList: UserslistModel[] = [];
  public searchedQuery:string;

  

  constructor(router: Router, public _userService: UserService) {
    this.router = router;


    this.userObject = JSON.parse(localStorage.getItem('userObject'));

    
    this.getUserData();
  }

  getUserData(){

    this._userService.getAllUsers(this.userObject.token).subscribe(a => {
      console.log(a);
      this.usersList = a.data.users;
      this.searchedUsersList = a.data.users;
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
        this.searchedUsersList[i].createdAt = year + '/' + month + '/' + dt;
      }
    })

  }
  blockUser(user){

      if (confirm('Do you want to block this user?')) {
      
        this._userService.blockThisUser(this.userObject.token,user._id).subscribe(a=>{

          if(a.code == 200 ){
              
            $("#snackbar").html("User Blocked");
            this.getUserData();
            this.showToast();
            
          }else{
  
               
            $("#snackbar").html("Errors");
            this.showToast();
  
          }
  
  
        })
          
    } else {
      
    }

  }


  searchThisUser(e) {

    this.searchedUsersList = [];
    console.log(this.searchedQuery);

    for (var i = 0; i < this.usersList.length; i++) {

      if (this.usersList[i].name.toLowerCase().indexOf(this.searchedQuery) > -1) {


        this.searchedUsersList.push(this.usersList[i]);


      }



    }


  }


  UnBlockUser(user){


    
    if (confirm('Do you want to unblock this user?')) {
      
      this._userService.unBlockThisUser(this.userObject.token,user._id).subscribe(a=>{

        if(a.code == 200 ){
            
          $("#snackbar").html("User UnBlocked");
          this.getUserData();
          this.showToast();


          
        }else{

             
          $("#snackbar").html("Errors");
          this.showToast();

        }


      })
        
  } else {
    
  }

  }

  showToast() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }


  searchResult(): void {
    this.router.navigate(['/app', 'extra', 'search']);
  }
}
