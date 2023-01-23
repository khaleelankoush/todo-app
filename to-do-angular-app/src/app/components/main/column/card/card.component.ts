import { Component, Input } from '@angular/core';
import { Task } from 'src/app/interfaces';
import { GetTasksService } from 'src/app/services/tasks/get-tasks.service';
import { GetStatusesService } from 'src/app/services/statuses/get-statuses.service';
import { SortPipe } from 'src/app/sort.pipe';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  constructor(
    private getTasksService: GetTasksService,
    private getStatusesService: GetStatusesService
  ) {
    this.tasks = [];
    this.statusId = '';
  }
  tasks: Task[];
  temp: any;
  @Input() statusId: string;

  editTask(task: Task) {
    this.getStatusesService.getStatuses().subscribe((data: any) => {
      let options = '';
      if (task.complete === task.subtasks.length) {
        this.getTasksService.editTask(task._id, {
          status: data.find((st: any) => {
            return st.title === 'DONE';
          })._id,
        });
      }
      data.forEach((dt: any) => {
        if (task.status._id === dt._id) {
          options = `${options}<option value="${dt._id}" selected>${dt.title}</option>`;
        } else {
          options = `${options}<option value="${dt._id}">${dt.title}</option>`;
        }
      });
      (
        document.getElementById('edit-task-status') as HTMLInputElement
      ).innerHTML = options;
    });

    (
      document.getElementById('task-edit-input-title') as HTMLInputElement
    ).innerHTML = task.title;

    (
      document.getElementById('task-edit-input-description') as HTMLInputElement
    ).innerHTML = task.description ? task.description : '';

    let subtasks =
      task.subtasks.length > 0
        ? `<label class="form-label">Subtasks</label> (${task.complete} of ${task.subtasks.length})`
        : '';

    task.subtasks.forEach((subtask, i) => {
      subtasks = `${subtasks}<div class="form-check">
      <input class="form-check-input" onchange="test($event)" type="checkbox" ${
        subtask.complete ? 'checked' : ''
      } id="subtask-${i}">
      <label class="form-check-label" style="${
        subtask.complete ? ' text-decoration: line-through;' : ''
      }" for="subtask-${i}">
        ${subtask.title}
      </label>
    </div>`;
    });

    const checkboxes = document.querySelectorAll('.form-check-input');

    const labels = document.querySelectorAll('.form-check-label');

    const newSubtasks = [] as any;

    checkboxes.forEach((element, i) => {
      element.addEventListener('check', () => {
        newSubtasks.push({
          complete: (element as HTMLInputElement).checked,
          title: labels[i].innerHTML,
        });

        this.getTasksService.editTask(task._id, {
          subtasks: newSubtasks,
        });
      });
    });

    (document.querySelector('.edit-sub-task') as HTMLFormElement).innerHTML =
      subtasks;
  }

  ngOnInit() {
    this.getTasksService.getTask(this.statusId).subscribe((data) => {
      this.temp = data;

      this.tasks = this.temp.map((task: any) => {
        return {
          ...task,
          complete: task.subtasks.filter((subTask: any) => {
            return subTask.complete;
          }).length,
        };
      });
      this.temp = null;
    });
  }
}
