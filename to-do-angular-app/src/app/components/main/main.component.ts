import { Component, Input } from '@angular/core';
import { Status } from 'src/app/interfaces';
import { GetStatusesService } from 'src/app/services/statuses/get-statuses.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private getStatusesService: GetStatusesService) {
    this.statuses = [];
  }

  @Input() statuses: Status[];

  temp: any;

  title: string = '';
  color: any = '';

  ngOnInit() {
    this.getStatusesService.getStatuses().subscribe((data) => {
      this.temp = data;
      this.statuses = this.temp;
    });
  }

  createStatus() {
    this.getStatusesService.postStatuses({
      title: this.title,
      color: this.color,
    });
    location.reload();
  }
}
