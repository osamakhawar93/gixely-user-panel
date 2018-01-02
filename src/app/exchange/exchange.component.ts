import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'exchange',
  styleUrls: [ './exchange.style.scss','./animate.css'],
  templateUrl: './exchange.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'exchange-page app'
  },
})
export class ExchangeComponent {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }



  ngOnInit(){
    
  }
  searchResult(): void {
    this.router.navigate(['/app', 'extra', 'search']);
  }
}
