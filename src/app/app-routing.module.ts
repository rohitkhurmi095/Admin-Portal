import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ContentRoutes } from './shared/routes/content.routes';

//AuthGuard
import { authGuard } from './components/auth/auth.guard';

const routes: Routes = [
  {path:'',component:LayoutComponent, children:ContentRoutes, canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }