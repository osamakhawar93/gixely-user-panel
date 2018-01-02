import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'lending',
  styleUrls: [ './lending.style.scss','./animate.css'],
  templateUrl: './lending.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'lending-page app'
  },
})
export class LendingComponent {
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
