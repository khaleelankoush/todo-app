import { Component } from '@angular/core';
import {
  ChartConfiguration,
  ChartType,
  ChartData,
  Chart,
  ChartItem,
} from 'chart.js';
import { GetStatusesService } from 'src/app/services/statuses/get-statuses.service';
import { GetTasksService } from 'src/app/services/tasks/get-tasks.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-marketing-plan',
  templateUrl: './marketing-plan.component.html',
  styleUrls: ['./marketing-plan.component.scss'],
})
export class MarketingPlanComponent {
  constructor(
    private getStatusesService: GetStatusesService,
    private getTasksService: GetTasksService,
    private detector: ChangeDetectorRef
  ) {}

  temp: any = [];
  tmp: any = [];

  async ngOnInit() {
    const tasks = [] as any;
    let statuses = [] as any;
    const color = [] as any;
    this.getStatusesService.getStatuses().subscribe((data) => {
      this.temp = data;

      statuses = this.temp.map((element: any, index: number) => {
        color.push(element.color);
        this.getTasksService.getTask(element._id).subscribe((dt) => {
          this.tmp = dt;
          tasks[index] = this.tmp.length;
        });
        return element.title;
      });

      this.barChartData.labels = statuses;
      this.barChartData.datasets[0].data = tasks;
      this.barChartData.datasets[0].backgroundColor = color;
    });

    const config = {
      type: 'bar',
      data: {
        labels: statuses,
        datasets: [
          {
            label: 'Title label',
            data: tasks,
            backgroundColor: color,
          },
        ],
      },
    };

    const chartItem = (<HTMLCanvasElement>(
      document.getElementById('chart')
    )).getContext('2d');

    const myChart = new Chart(
      chartItem as ChartItem,
      config as ChartConfiguration
    );

    setTimeout(() => {
      myChart.update();
    }, 3000);

    this.detector.markForCheck();
  }

  public barChartType: ChartType = 'bar';
  public barChartLabels: string[] = [];
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        label: 'Title label',
        data: [],
        backgroundColor: [],
      },
    ],
  };
}
