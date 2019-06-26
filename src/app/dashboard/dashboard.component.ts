import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import * as $ from 'jquery';

export interface PeriodicElement {
  chargecode: string;
  monday: number;
  tuesday: number;
  Wednessday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}
export interface ChargeCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chargeCodeLists: ChargeCode[] = [
    {value: 'Charge Code Alpha', viewValue: 'Charge Code Alpha'},
    {value: 'Charge Code Bravo', viewValue: 'Charge Code Bravo'},
    {value: 'Charge Code Charlie', viewValue: 'Charge Code Charlie'}
  ];

  days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  rows = [];

  info = {};

  input_info: {};

  selectedIndex: any;
  selectedDay: any;

  commentContent;

  user_id: any;
  start_day: number;
  current_week: any;
  standard_current_week: any;

  selectedchargecode: any='';
  chargecodedetail:any='';

  chargeVal;
  editableComment = false;
  visibleCommentIcon = false;
  selectedInputId: string;

  successMsg: any;
  errMsg: any;

  constructor(
    public userservice:UserService,
  ) {}
  
  ngOnInit() {
    this.userservice.checkLogin();
    this.get_current_date();

    let that = this;
    this.showCommmentArea(that);
    this.getInfo(this.user_id, this.current_week)
  }

  // Get the tracking info from api endpoint
  getInfo(user_id, current_week){
    this.userservice.getInfo(user_id, current_week).pipe(first())
      .subscribe(
        res => {
          this.put_values(res)
        }, 
        err => {
        }
      )
  }

  put_values(data) {
    if (data) {
      this.info = data.info;
      var info_keys = Object.keys(this.info);
      this.rows = info_keys;
    }
  }

  showCommmentArea(that){
    $(document).click(function(e) {
      if (e.target.id != that.selectedInputId && e.target.id != 'comment_area') {
        that.editableComment = false;
      }
    });
  }

  // Start Date
  get_current_date(){
    var current = new Date();
    this.start_day = parseInt((current.getDate() - current.getDay() + 1).toString());
    var currentMonth = '0' + (current.getMonth() + 1).toString().slice(-2);
    var currentYear = current.getFullYear().toString();
    
    this.current_week = [this.start_day, currentMonth, currentYear].join('-');
    this.standard_current_week = [currentYear, currentMonth,  this.start_day].join('-');
    this.start_day = Number(this.start_day)
    
    var current_user = localStorage.getItem('currentUser')
    this.user_id = JSON.parse(current_user).id
  }

  // Select the charge code
  selectChargeCode(e) {
    if (!this.rows.includes(e)) {
      this.rows.push(e);
      let infoData = [
        {
          "hours" : null, 
          "comments" : null 
        },
        {
          "hours" : null, 
          "comments" : null 
        },
        {
          "hours" : null, 
          "comments" : null 
        },
        {
          "hours" : null, 
          "comments" : null 
        },
        {
          "hours" : null, 
          "comments" : null 
        },
        {
          "hours" : null, 
          "comments" : null 
        },
        {
          "hours" : null, 
          "comments" : null 
        }
      ];
      this.info[e] = infoData;
    }
  }

  // Show the comments when clicked the comment modal
  showComment(e, index, day) {
    this.commentContent = this.info[this.rows[index]][day]['comments'];
    this.selectedIndex = index;
    this.selectedDay = day;
  }

  // Save the inputed hours and comments
  saveData(){
    let postData = {
      date : this.current_week,
      user_id: this.user_id,
      info: this.info
    }
    
    this.userservice.postInfo(postData).pipe(first())
      .subscribe(
        res => {
          this.successMsg = res['status'];
        }, 
        err => {
        }
      )
  }

  // Input the hours
  inputCharge(e, index, day) {
    let value = e.target.value;
    this.selectedIndex = index;
    this.selectedDay = day;
    if (value) {
      this.chargeVal = value
      this.editableComment = true;
      this.selectedInputId = e.target.id;
      this.info[this.rows[index]][day].hours = value;
    }
    else {
      this.chargeVal = null;
      this.editableComment = false;
      this.info[this.rows[index]][day].hours = null;
      this.info[this.rows[index]][day].comments = null;
      $('#' + e.target.id).next().hide()
    }
  }

  // Input the commnets on the comment area
  inputComment(e) {
    let comment = e.target.value;
    if (comment.length > 0) {
      this.info[this.rows[this.selectedIndex]][this.selectedDay].comments = comment;
      $('#' + this.selectedInputId).next().show()
    } else {
      $('#' + this.selectedInputId).next().hide()
    }
  }

  // Update the comment saved when clicked the comment area
  updateComment(e) {
    this.info[this.rows[this.selectedIndex]][this.selectedDay].comments = e.target.value;
  }
}
