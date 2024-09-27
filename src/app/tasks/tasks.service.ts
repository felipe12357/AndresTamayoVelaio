import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskDto, TaskFilterEnum } from './models';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

const URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private taskListSubject = new BehaviorSubject<TaskDto[]>([
      {
        "id": 749.2854878582563,
        "title": "tarea mock",
        "limitDate": new Date('2024-09-19'),
        completed:false,
        "people": [
            {
                "name": "Andres Felipe",
                "age": 36,
                "skills": [
                    {
                        "name": "Javascript"
                    },
                    {
                        "name": "Typescript"
                    }
                ]
            },
            {
                "name": "Persona 2",
                "age": 23,
                "skills": [
                    {
                        "name": "C#"
                    }
                ]
            }
        ]
    }
  ]);

  private currentFilter:TaskFilterEnum = TaskFilterEnum.ALL;

  private taskListToDisplaySubject = new BehaviorSubject<TaskDto[]>([]);

  taskListToDisplay$ = this.taskListToDisplaySubject.asObservable();

  constructor(private http: HttpClient) {
     this.loadTasks();
   }

  async loadTasks(){
    const queryTasks = await firstValueFrom (this.http.get<TaskDto[]>(`${URL}/todos`));
    const currentValue = this.taskListSubject.getValue();

    this.taskListSubject.next([...currentValue, ...queryTasks ]);
    this.taskListToDisplaySubject.next([...currentValue, ...queryTasks])
  }

  addTask(task:TaskDto){
    this.taskListSubject.next([
       ...this.taskListSubject.getValue(),
       task
    ])
  }

  updateTaskState(id:number){
    const currentValue = this.taskListSubject.getValue();
    const position = currentValue.findIndex(task=>task.id === id);
    currentValue[position].completed = !currentValue[position].completed
    this.taskListSubject.next(currentValue);
    this.filter(this.currentFilter);
  }

  filter(typeFilter:TaskFilterEnum){
    this.currentFilter=typeFilter;
    const currentValue = this.taskListSubject.getValue();
    switch (typeFilter) {
      case TaskFilterEnum.ALL:
            this.taskListToDisplaySubject.next([...currentValue]);
        break;
      case TaskFilterEnum.COMPLETED:
          this.taskListToDisplaySubject.next([...currentValue.filter(task => task.completed)]);
      break;
      case TaskFilterEnum.PENDING:
          this.taskListToDisplaySubject.next([...currentValue.filter(task => !task.completed)]);
      break;

      default:
        break;
    }
  }
}
