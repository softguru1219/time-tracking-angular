import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

export interface Food {
  value: string;
  viewValue: string;
}

export interface WeekDate {
  "value": string, 
  "start_date": string;
  "end_date": string;
}

@Component({
  selector: 'app-timetracker',
  templateUrl: './timetracker.component.html',
  styleUrls: ['./timetracker.component.scss']
})
export class TimetrackerComponent implements OnInit {
  view_1: object = {};
  view_2: object = {};
  view_3: object = {};

  weeks: any;
  lastWeek: any;
  selectedWeek: any;
  selectedComment: any;
  start_day: number;
  seleted_weekStart: any;
  seleted_weekEnd: any;

  days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  constructor(public userservice:UserService) {}

  ngOnInit() {
    this.userservice.checkLogin();
    this.weekRange()
  }
  
  timeManager(current_week, view_number){
    this.userservice.getManager(current_week, view_number).pipe(first())
      .subscribe(
        res => {
          if (view_number == '1'){
            this.view_1 = res
          }else if(view_number == '2'){
            this.view_2 = res
          }else if(view_number == '3'){
            this.view_3 = res
          }
        },
        error => {
          return error
      }
    )
  }

  onWeek(start_date, end_date) {
    this.seleted_weekStart = start_date;
    this.seleted_weekEnd = end_date;

    this.start_day = start_date.split('-')[2]
    this.start_day = Number(this.start_day)

    this.timeManager(start_date, '1');
    this.timeManager(start_date, '2');
    this.timeManager(start_date, '3');
  }

  commentClick(comment){
    this.selectedComment = comment;
  }
  
  weekRange(){
    this.userservice.weekRange().pipe(first())
      .subscribe(
        res => {
          this.weeks = res
          this.current_weeks(res)
        },
        error => {
      }
    )
  }

  current_weeks(weeks){
    this.lastWeek = weeks[weeks.length - 1];
    this.selectedWeek = this.lastWeek.value;
    var current_start_date = this.lastWeek.start_date;
    
    this.start_day = current_start_date.split('-')[2]
    this.start_day = Number(this.start_day)

    // Current Week
    this.seleted_weekStart = this.lastWeek.start_date;
    this.seleted_weekEnd = this.lastWeek.end_date;

    // Call Manager API for current week
    this.timeManager(current_start_date, '1')
    this.timeManager(current_start_date, '2')
    this.timeManager(current_start_date, '3')
  }
}
