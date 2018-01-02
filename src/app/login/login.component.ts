import { Component, ViewEncapsulation } from '@angular/core';
import { SignupModel } from '../../models/signup.Model';
import { UserService } from '../../services/userService';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'login',
  styleUrls: ['./login.style.scss'],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  providers: [UserService],
  host: {
    class: 'login-page app'
  }
})
export class Login {

  public signedUpData: SignupModel;

  constructor(public _userService: UserService,public router:Router) {

  }

  loginWithEnter(event) {
    
    if (event.keyCode == 13) {
      this.login();
    }

  }

  login() {
    this.signedUpData.email = $.trim(this.signedUpData.email);
    var error;

    $(".custom-inputs").removeClass("errors");

    if (this.signedUpData.email == undefined || this.signedUpData.email.length == 0) {
      error = true;
      $("#logged-email").addClass("errors");
    }

    if (this.signedUpData.password == undefined) {
      error = true;
      $("#logged-password").addClass("errors");
    }

    if (error) {

    } else {
      $(".loginLoader").show();
      $(".action").hide();

      this._userService.login(this.signedUpData).subscribe(a => {
        console.log(a);
        if(a.code == 200){

          $(".loginLoader").hide();
          $(".action").show();
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
