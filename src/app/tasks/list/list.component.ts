import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Observable } from 'rxjs';
import { TaskDto, TaskFilterEnum } from '../models';

@Component({
  selector: 'app-listar',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  taskList$!: Observable<TaskDto[]>;
  taskFilterEnum = TaskFilterEnum;

  constructor(private tasksService:TasksService){
      this.taskList$ = this.tasksService.taskListToDisplay$;
  }

  trackByTask(index: number, task: TaskDto): number {
    return task.id; 
  }

  update(id:number){
    this.tasksService.updateTaskState(id)
  }

  filter(type:TaskFilterEnum){
    this.tasksService.filter(type);
  }
}
