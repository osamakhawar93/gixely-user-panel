import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService';

declare var $: any;
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
  constructor(router: Router, public _userSerivce: UserService) {
    this.router = router;
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

    var eth_text = eth_final ;
    var btc_text = ((PriceUSd / this.priceBTC) * in_val).toFixed(4) + ' BTC';

    var usd_final = (PriceUSd) * in_val;
    var usd_text = usd_final;

    var ltc_text = ltc_final;
    var calc_res = bonus * in_val;

    jQuery('.currency_selected').text(btc_text);
    jQuery('.currency_selected').text(eth_text);
    jQuery('.currency_selected').text(ltc_text);
    jQuery('.currency_selected').text(usd_text);

    jQuery("currency").text(jQuery('.selected').text());

    jQuery('.selectric .label').text(jQuery('.selected').text());


    var currency = jQuery(".selectric-wrapper .selectric-items .selectric-scroll ul li.selected").text();
    jQuery("#currency").val(currency);

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



  ngOnInit() {
    var self = this;
    $(".image-rows li").click(function(){
      $(".image-rows li").removeClass("active");
       $(this).addClass("active");
    
    })

    new Clipboard('#copyAddress');
    



  }
  searchResult(): void {
    this.router.navigate(['/app', 'extra', 'search']);
  }
}
