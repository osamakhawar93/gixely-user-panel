import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {UserModel} from '../../models/user.Model';
import {UserService} from '../../services/userService';
import { DashboardModel } from '../../models/dashboard.Model';
import { SendgixelyModel } from '../../models/sendgixely.Model';
declare var jQuery :any;
@Component({
  selector: 'error',
  styleUrls: [ './wallet.style.scss' ],
  templateUrl: './wallet.template.html',
  encapsulation: ViewEncapsulation.None,
  providers:[UserService],
  host: {
    class: 'wallet-page app'
  },
})
export class WalletComponent {
  router: Router;
  public thisUserName:string;
  public userObject:UserModel;
  public dashboardData:DashboardModel;
  public dashboardDataFetched:boolean = false;
  public verficationCodeInputForSendBtc:boolean = false;
  public verficationCodeInputForSendGXY:boolean = false; 

  public sendTransactionForm : SendgixelyModel; 



  public gixelyAddress : any; 


  constructor(router: Router,public _userService:UserService) {

    this.sendTransactionForm = new SendgixelyModel();

    this.router = router;

    this.userObject = JSON.parse(localStorage.getItem('userObject'));

    this.thisUserName = this.userObject.user.name;

    this.gixelyAddress = this.userObject.user.walletAddress;
   /*  if (this.userObject.user.walletAddress == undefined) {
      this.gixelyAddress = this.userObject.user.receiverEthAddress;
    } else {
      this.gixelyAddress = this.userObject.user.walletAddress;
    }  */


    this._userService.getDashboardData(this.userObject.token).subscribe(a=>{
      console.log(a);
      this.dashboardData = a.data;
      this.dashboardDataFetched = true;
    }) 

  }

  sendTransaction(){

     this.sendTransactionForm.ToAddress = $.trim(this.sendTransactionForm.ToAddress);
     var error;

     if(this.sendTransactionForm.ToAddress == undefined || this.sendTransactionForm.ToAddress.length == 0){

        error = true;
        $("#sendTransactionForm-ToAddress").addClass("errors");

     }

     if(this.sendTransactionForm.CoinsAmount == undefined){

        error = true;
        $("#sendTransactionForm-CoinsAmount").addClass("errors");

     }

     if(this.sendTransactionForm.VerificationCode == undefined){

        error = true;
        $("#sendTransactionForm-VerificationCode").addClass("errors");

      }

      if(error){

      }else{
        $(".verifyCode2").show();
        $("#send-trans").hide();
        this._userService.sendGixelyTransaction(this.userObject.token,this.sendTransactionForm).subscribe(a=>{

          if(a.code == 200){
            $("#snackbar").html("Transaction successful");
            this.myFunction();
            $(".verifyCode2").hide();
            $("#send-trans").show();
            this.sendTransactionForm = new SendgixelyModel();
          }else{
            $("#snackbar").html("Transaction not entertained due to errors");
            this.myFunction();
            $(".verifyCode2").hide();
            $("#send-trans").show();
          
          }

        })
      }


  }


  myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


ngOnInit(){

/* 
  this._userService.getUsersWalletAddress(this.userObject.token).subscribe(a=>{
    console.log(a);
    this.userObject.user.walletAddress  =  a.data;
  }) */


 if(this.userObject.user.walletAddress == undefined){
    jQuery('#qrcode').qrcode(this.userObject.user.receiverEthAddress);
  }else{
    jQuery('#qrcode').qrcode(this.userObject.user.walletAddress);
  } 


}

  sendVerficiationCodeToEmail(){
    $(".verifyCode").show();
    $("#sendEmail").hide();
    var TRANSACTION  = "TRANSACTION";
    this._userService.issueVerificationCode(this.userObject.token,TRANSACTION).subscribe(a=>{
      console.log(a); 
      if(a.code == 200){  

        $(".verifyCode").hide();
        $(".verfication-code-div").hide();
        $(".send-btc-form").slideDown();

      }else{
         $("#sendEmail").show();
         $(".verifyCode").hide();
      }


       
    })
  }
}
