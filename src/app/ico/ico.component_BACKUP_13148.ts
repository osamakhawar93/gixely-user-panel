import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService';
import { UserModel } from '../../models/user.Model';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'ico',
  styleUrls: ['./ico.style.scss', './animate.css'],
  templateUrl: './ico.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ico-page app'
  },
  providers: [UserService]
})
export class IcoComponent {
  router: Router;

  public priceBTC: any;
  public priceLTC: any;
  public priceETH: any;
  public careToBtc: any;
  public careToLtc: any;
  public careToEth: any;

  public ether_address: any;

  public userObject: UserModel;

  public gixelyAddress: any;

  constructor(router: Router, public _userSerivce: UserService) {
    this.router = router;

    this.userObject = JSON.parse(localStorage.getItem('userObject'));

    this.gixelyAddress = this.userObject.user.walletAddress;

    this._userSerivce.getBitCoins().subscribe(a => {
      console.log(a);
      this.priceBTC = a.USD;
    })
    this._userSerivce.getLiteCoins().subscribe(a => {
      console.log(a);
      this.priceLTC = a.USD;
    })
    this._userSerivce.getEthers().subscribe(a => {
      console.log(a);
      this.priceETH = a.USD;


      setTimeout(() => {
        this.calculate_now();
      }, 3000);

    })



  }


  buyClicked() {
<<<<<<< HEAD
    $(".div-changer").removeClass("offset-md-3 offset-lg-3 offset-sm-3");
    $(".div-expander").show();
=======
   // $(".div-changer").removeClass("offset-md-3 offset-lg-3 offset-sm-3");

   $(".div-changer").animate({
    width: "30%",
    marginLeft: "0"
  }, 2000, function() {
    $(".div-expander").fadeIn();
  });

 
>>>>>>> 064e4ea2ca8f98101cf3a03bb55a12687e7f4f68

    if ($(".image-rows li.active").attr('id') == "btc_img") {
      $(".btc-ltc-div").show();
      $(".eth-form").hide();
    } else if ($(".image-rows li.active").attr('id') == "ltc_img") {
      $(".btc-ltc-div").show();
      $(".eth-form").hide();

    } else if ($(".image-rows li.active").attr('id') == "eth_img") {
      $(".btc-ltc-div").hide();
      $(".eth-form").show();
    }
<<<<<<< HEAD

    
    jQuery('#qrcode2').qrcode(this.userObject.user.walletAddress);


  }

  scanQrCode() {
    require(['qr-code-scanner'], function (QRScanner) {

      QRScanner.initiate({
        onResult: function (result) {
          alert(result)
        },
        onError: function (err) { console.error('ERR :::: ', err); }, // optional 
        onTimeout: function () { console.warn('TIMEDOUT'); } // optional 
      }, function(err, data){
        console.info('DONE: ', data);
          $("#ether_address").val(data);
          
      })

    });
=======

    
    jQuery('#qrcode2').qrcode(this.userObject.user.walletAddress);


  }

  scanQrCode() {
  /*   require(['qr-code-scanner'], function (QRScanner) {

      QRScanner.initiate({
        onResult: function (result) {
          alert(result)
        },
        onError: function (err) { console.error('ERR :::: ', err); }, // optional 
        onTimeout: function () { console.warn('TIMEDOUT'); } // optional 
      }, function(err, data){
        console.info('DONE: ', data);
          $("#ether_address").val(data);
          
      })

    }); */


    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
       scanner.addListener('scan', function (content) {
        console.log(content);
        $("#ether_address").val(content);
        scanner.stop();
      }); 

    

      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
>>>>>>> 064e4ea2ca8f98101cf3a03bb55a12687e7f4f68
   

  }

  calculate_now() {

    var in_val = jQuery('input[type="number"]').val();

    var PriceUSd = 10;
    var bonus = 1;

    this.careToBtc = (PriceUSd / this.priceBTC).toFixed(3);
    this.careToLtc = (PriceUSd / this.priceLTC).toFixed(3);
    this.careToEth = (PriceUSd / this.priceETH).toFixed(3);

    var careToUSD = 10;
    /*     jQuery("#carexToEth").text("1 Care =" + this.careToEth + " Eth");
        jQuery("#carexToBtc").text("1 Care =" + this.careToBtc + " BTC");
        jQuery("#carexToLtc").text("1 Care =" + this.careToLtc + " LTC"); */




    var eth_final = ((PriceUSd / this.priceETH) * in_val).toFixed(4);

    var ltc_final = ((PriceUSd / this.priceLTC) * in_val).toFixed(4);

    var eth_text = eth_final;
    var btc_text = ((PriceUSd / this.priceBTC) * in_val).toFixed(4); //+ ' BTC';

    var usd_final = (PriceUSd) * in_val;
    var usd_text = usd_final;

    var ltc_text = ltc_final;
    var calc_res = bonus * in_val;


    if ($(".image-rows li.active").attr('id') == "btc_img") {
      jQuery('.currency_selected').val(btc_text);
      jQuery(".currencyActual").html("BTC");
    } else if ($(".image-rows li.active").attr('id') == "ltc_img") {
      jQuery('.currency_selected').val(ltc_text);
      jQuery(".currencyActual").html("LTC");
    } else if ($(".image-rows li.active").attr('id') == "eth_img") {
      jQuery('.currency_selected').val(eth_text);
      jQuery(".currencyActual").html("ETH");
    }

    /*    jQuery('.currency_selected').val(eth_text);
       jQuery('.currency_selected').val(ltc_text);
       jQuery('.currency_selected').val(usd_text);  */

    /*  jQuery("currency").text(jQuery('.selected').text());
 
     jQuery('.selectric .label').text(jQuery('.selected').text());
 
 
     var currency = jQuery(".selectric-wrapper .selectric-items .selectric-scroll ul li.selected").text();
     jQuery("#currency").val(currency); */

  }

  upping() {

    var oldValue = parseFloat(jQuery('input[type="number"]').val());
    var min = jQuery('input[type="number"]').attr('min');
    var max = jQuery('input[type="number"]').attr('max');
    var step = jQuery('#num_val').attr('step');
    if (oldValue >= parseFloat(max)) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue + parseFloat(step);
    }
    jQuery('#num_val').val(newVal);
    jQuery('#num_val').trigger("change");

    this.calculate_now();

  }

  downing() {

    var oldValue = parseFloat(jQuery('input[type="number"]').val());
    var min = jQuery('input[type="number"]').attr('min');
    var max = jQuery('input[type="number"]').attr('max');
    var step = jQuery('#num_val').attr('step');
    if (oldValue <= parseFloat(min)) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue - parseFloat(step);
    }
    jQuery('#num_val').val(newVal);
    jQuery('#num_val').trigger("change");

    this.calculate_now();

  }

  sendEthers() {
    this.ether_address = $.trim(this.ether_address);
    var error;
    $("#ether_address").removeClass("errors");

    if (this.ether_address == undefined || this.ether_address.length == 0) {
      error = true;
      $("#ether_address").addClass("errors");
    }

    if (error) {

    } else {

      $(".send-btn").hide();
      $(".ethLoader").show();
      this._userSerivce.buyEthers(this.userObject.token, this.ether_address).subscribe(a => {


        if (a.code == 200) {
          $(".send-btn").show();
          $(".ethLoader").hide();
          this.ether_address = undefined;

          setTimeout(() => {
            $(".btc-ltc-div,.eth-form").hide();
            $(".div-changer").addClass("offset-md-3 offset-lg-3 offset-sm-3");
            $(".div-expander").hide();

          }, 2000);

          $("#snackbar").html("Transaction Successful!");
          this.myFunction();

        }
      })
    }
  }

<<<<<<< HEAD

  myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")

=======

  myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")

>>>>>>> 064e4ea2ca8f98101cf3a03bb55a12687e7f4f68
    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  ngOnInit() {
    var self = this;
    $(".image-rows li").click(function () {
      $(".image-rows li").removeClass("active");
      $(this).addClass("active");
      $(".eth-form,.btc-ltc-div").hide();
      self.calculate_now();

    })

    

    new Clipboard('#copyAddress');
    new Clipboard('#copyAddress3');


  }
  searchResult(): void {
    this.router.navigate(['/app', 'extra', 'search']);
  }
}
