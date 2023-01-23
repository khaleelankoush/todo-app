import { Component, Input, Renderer2 } from '@angular/core';
import { GetStatusesService } from 'src/app/services/statuses/get-statuses.service';
import { GetTasksService } from 'src/app/services/tasks/get-tasks.service';
import { Status } from 'src/app/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private renderer: Renderer2,
    private getStatusesService: GetStatusesService,
    private getTasksService: GetTasksService
  ) {
    this.statuses = [];
  }

  title = '';
  description = '';
  status = '';
  subtasks = [] as any[];

  createTask() {
    const subtasks = [] as any;
    const input = document.querySelectorAll(
      '.sub-task-input'
    ) as NodeListOf<HTMLInputElement>;
    input.forEach((val) => {
      subtasks.push({
        complete: false,
        title: val.value,
      });
    });
    const select = document.getElementById('create-task-status') as any;
    this.status = select.options[select.selectedIndex].value;
    const data = {
      title: this.title,
      description: this.description,
      status: this.status,
      subtasks,
    };
    this.getTasksService.createTask(data);

    location.reload();
  }

  @Input() statuses: Status[];

  temp: any;

  ngOnInit() {
    this.getStatusesService.getStatuses().subscribe((data) => {
      this.temp = data;
      this.statuses = this.temp;
    });
  }

  showDelete = [true, true];

  showDeleteButton(inputNumber: number) {
    this.showDelete[inputNumber] = true;
  }

  deleteInput(inputNumber: number) {
    this.showDelete[inputNumber] = false;
  }

  addSubTaskInput() {
    const content = document.querySelector('.sub-task');

    const newElement = this.renderer.createElement('div');
    newElement.classList.add('sub-task-div', 'mb-3');

    const newInput = this.renderer.createElement('input');
    newInput.classList.add('form-control', 'sub-task-input');
    this.renderer.setAttribute(
      newInput,
      'placeholder',
      'e.g. Drink coffee & smile'
    );
    this.renderer.setAttribute(newInput, 'name', 'subtasks');

    const newSpan = this.renderer.createElement('span');
    newSpan.classList.add('sub-task-span');
    newSpan.innerHTML = '&times;';

    this.renderer.setAttribute(newSpan, 'onclick', 'this.parentNode.remove()');

    newElement.appendChild(newSpan);
    newElement.appendChild(newInput);

    content?.appendChild(newElement);
  }
}
