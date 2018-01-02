import { Component, ViewEncapsulation } from '@angular/core';
import { SignupModel } from '../../models/signup.Model';
import { UserService } from '../../services/userService';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'signup',
  styleUrls: ['./signup.style.scss'],
  templateUrl: './signup.template.html',
  encapsulation: ViewEncapsulation.None,
  providers: [UserService],
  host: {
    class: 'signup-page app'
  }
})
export class Signup {

  public signedUpData: SignupModel;


  constructor(public _userService: UserService, public router: Router) {
  }


  SignUp() {

    this.signedUpData.username = $.trim(this.signedUpData.username);
    var error;

    $(".custom-inputs").removeClass("errors");

    if (this.signedUpData.username == undefined || this.signedUpData.username.length == 0) {
      error = true;
      $("#signedUpData-username").addClass("errors");
    }

    if (this.signedUpData.password == undefined) {
      error = true;
      $("#signedUpData-password").addClass("errors");
    }


    if (this.signedUpData.phoneNumber == undefined) {
      error = true;
      $("#signedUpData-phoneNumber").addClass("errors");
    }

    if (this.signedUpData.email == undefined) {
      error = true;
      $("#signedUpData-email").addClass("errors");
    }

    if (error) {
    } else {
      $(".action").hide();
      $(".myLoader").show();


      this._userService.signUp(this.signedUpData).subscribe(a => {
        console.log(a);
        if (a.code == 200) {
          $(".action").show();
          $(".myLoader").hide();
          localStorage.setItem('userObject', JSON.stringify(a.data));
          localStorage.setItem
          setTimeout(() => {
            this.router.navigate(['/app/dashboard']);
          }, 2000);

        }
      })
    }


  }




  ngOnInit(): void {
    this.signedUpData = new SignupModel();

  }



}
