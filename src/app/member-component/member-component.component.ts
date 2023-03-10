import { Component, Input, OnInit } from '@angular/core';
import { member } from 'src/model/exam';

@Component({
  selector: 'app-member-component',
  templateUrl: './member-component.component.html',
  styleUrls: ['./member-component.component.scss']
})
export class MemberComponentComponent implements OnInit {
  @Input() memberdata: member = new member();
  constructor() { }

  ngOnInit(): void {
  }

}
