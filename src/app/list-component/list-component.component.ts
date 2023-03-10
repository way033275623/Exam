import { ExamService } from './../../service/exam.service';
import { Component, OnInit, Input } from '@angular/core';
import { examResponse } from 'src/model/exam';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss']
})
export class ListComponentComponent implements OnInit {

  searchStr = "";

  Response: examResponse = new examResponse();
  constructor(private examService: ExamService) { }

  ngOnInit(): void {
    this.getListAll()
  }

  getListAll() {
    this.examService.GetData().subscribe(res => {
      console.log(res);
      this.Response = res;
      this.sort();
    })
  }

  sort() {
    this.Response.data.sort((a, b) => {
      if (a.first_name.slice(0, 1) < b.first_name.slice(0, 1)) {
        return -1;
      }
      if (a.first_name.slice(0, 1) > b.first_name.slice(0, 1)) {
        return 1;
      }
      return 0;
    })
  }

  getList() {
    this.examService.GetData().subscribe(res => {
      console.log(res);
      this.Response = res;
      this.Response.data = this.Response.data.filter(x => x.first_name.toLowerCase().includes(this.searchStr.toLowerCase()) || x.email.toLowerCase().includes(this.searchStr.toLowerCase()));
      this.sort();
    })
  }

}
