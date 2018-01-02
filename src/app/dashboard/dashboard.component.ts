import { Component, ViewEncapsulation,ViewChild} from '@angular/core';
import { AppConfig } from '../app.config';
import {UserModel} from '../../models/user.Model';
import {UserService} from '../../services/userService';
import { DashboardModel } from '../../models/dashboard.Model';
import {RateGraphModel} from '../../models/rateGraph.Model';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.style.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[UserService]
})
export class Dashboard {
  config: any;
  month: any;
  year: any;
  public thisUserName:string;
  public userObject:UserModel;
  public dashboardData:DashboardModel;
  public dashboardDataFetched:boolean = false;
  public lineChartLabels=[];
  public lineChartData=[];
  public rateGraphData:RateGraphModel[] = [] ;
  public userBalance:any;
  public balanceFetched:boolean = false;

  @ViewChild(BaseChartDirective)  public chart: BaseChartDirective;

  constructor(config: AppConfig,public _userService:UserService) {

    this.config = config.getConfig();

    this.userObject = JSON.parse(localStorage.getItem('userObject'));

    this.thisUserName = this.userObject.user.name;

    this._userService.getDashboardData(this.userObject.token).subscribe(a=>{

      this.dashboardData = a.data;
      this.dashboardDataFetched = true;
    })
    
    var transactionType = "TRANSACTION";

    this._userService.getGixelyBalance(this.userObject.token,transactionType).subscribe(a=>{

      if( a.code == 200 ){
          this.userBalance = a.data.coinBalance;
          this.balanceFetched = true;
      }
    })


   
    
  }

  
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';
 
  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
 
  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
 
  public chartClicked(e:any):void {

  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


  forceChartRefresh() {
    setTimeout(() => {
        this.chart.refresh();
    }, 10);
}

  ngOnInit(): void {

    
    let now = new Date();
    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();
    this.dashboardData = new DashboardModel();

    this._userService.getGraphPoints(this.userObject.token).subscribe(a=>{
 
      this.rateGraphData  = a.data.graphpoints;


      for(var i = 0; i < this.rateGraphData.length; i++){

     
        
     

        var d = new Date(this.rateGraphData[i].time);
        this.lineChartLabels.push((d.toLocaleTimeString()));
        this.lineChartData.push(this.rateGraphData[i].rate);
      }

      this.forceChartRefresh();
      
    })
  }
}
