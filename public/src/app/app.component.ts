import { Component, OnInit } from '@angular/core';
import { NumService } from './num.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lucky Number';
  lnum = 0;
  logs = [];
  total = 0;
  range = {};
  error : boolean;
  success: boolean;
  constructor(private service: NumService) { }
  submitted = false;
  entryLnum(num) {
     this.service.submitLuckyNumber(num)
     .then(data => {
       this.logs = data.data
       this.total = data.count
       this.success = this.setSuccess()
     })
     .catch(err => {
       this.error = true;
     })
  }
  onSubmit() { this.submitted = true; }

  ngOnInit() {
    this.service.getDefaults()
    .then(data => {
      // if(!localStorage.getItem('req_id')) localStorage.setItem('req_id', data['req_id'])
      this.range = { min: data.range.min, max: data.range.max }
      this.logs = data.data.data
      this.total = data.data.count
    })
    .catch(e => console.log(e))
  }
  private setSuccess(): boolean {
    let t;
    this.logs.map(itr => {
      if(itr.status == 200)
        t = true;
    })
    return t;
  };
}
