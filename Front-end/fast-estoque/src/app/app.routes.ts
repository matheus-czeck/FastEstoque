import { Routes } from '@angular/router';
import { ShowCaseComponent } from './pages/show-case/show-case.component';
import { LoginComponent } from './pages/login/login.component';
import { PanelComponent } from './pages/panel/panel.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: ShowCaseComponent },
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: PanelComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: '' },
];
