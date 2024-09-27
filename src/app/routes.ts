import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'tasks' },
    {
      path: 'tasks',
      loadChildren: () =>
        import('./tasks/tasks.module').then((m) => m.TasksModule),
    }
  ];