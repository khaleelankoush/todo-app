import { Component, Input } from '@angular/core';
import { Status } from 'src/app/interfaces';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  constructor() {
    this.statuses = [];
    this.statusId = '';
  }

  temp: any;
  @Input() statuses: Status[];
  @Input() statusId: string;

  ngOnInit() {}
}
