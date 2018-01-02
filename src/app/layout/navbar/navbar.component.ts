import { Component, EventEmitter, OnInit, ElementRef, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../app.config';
import {UserModel} from '../../../models/user.Model';
import {UserService} from '../../../services/userService';
import { DashboardModel } from '../../../models/dashboard.Model';
declare var jQuery: any;

@Component({
  selector: '[navbar]',
  templateUrl: './navbar.template.html',
  providers:[UserService]
})
export class Navbar implements OnInit {
  @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleChatEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;
  router: Router;

  public userObject:UserModel;
  public thisUserName:string;
  public dashboardData:DashboardModel;
  public dashboardDataFetched:boolean = false;
  public GXYtoDollar:any;

  constructor(el: ElementRef, config: AppConfig, router: Router,public _userService:UserService) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.router = router;

     if(JSON.parse(localStorage.getItem('userObject')) == null){

      this.router.navigate(['/login']);

    }else{

      this.userObject = JSON.parse(localStorage.getItem('userObject'));

      this.thisUserName = this.userObject.user.name;

      console.log(this.userObject);

      this._userService.getDashboardData(this.userObject.token).subscribe(a=>{
        console.log(a);
        this.dashboardData = a.data;
        this.GXYtoDollar = this.dashboardData.gixelyRate.rate / this.dashboardData.btcRate;
        this.GXYtoDollar = this.GXYtoDollar.toFixed(5); 
        this.dashboardDataFetched = true;
      })

    } 



  }


  logout(){

   localStorage.setItem('userObject',null); 
   setTimeout(() => {
    this.router.navigate(['/login']);
  }, 1000);


  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  toggleChat(): void {
    this.toggleChatEvent.emit(null);
  }

  onDashboardSearch(f): void {
    this.router.navigate(['/app', 'extra', 'search'], { queryParams: { search: f.value.search } });
  }

  ngOnInit(): void {
    setTimeout(() => {
      let $chatNotification = jQuery('#chat-notification');
      $chatNotification.removeClass('hide').addClass('animated fadeIn')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
          $chatNotification.removeClass('animated fadeIn');
          setTimeout(() => {
            $chatNotification.addClass('animated fadeOut')
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd' +
                ' oanimationend animationend', () => {
                $chatNotification.addClass('hide');
              });
          }, 8000);
        });
      $chatNotification.siblings('#toggle-chat')
        .append('<i class="chat-notification-sing animated bounceIn"></i>');
    }, 4000);

    this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')
        [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }
}
