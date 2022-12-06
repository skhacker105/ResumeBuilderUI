import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InformationComponent } from './components/information/information.component';
import { PreviewComponent } from './components/preview/preview.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'information',
    component: InformationComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'preview/:id',
    component: PreviewComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'preview/:id/:view',
    component: PreviewComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
