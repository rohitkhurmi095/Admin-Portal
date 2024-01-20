import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ContentRoutes } from './shared/routes/content.routes';

//AuthGuard
import { authGuard } from './components/auth/auth.guard';
import { Error404pageComponent } from './shared/components/error404page/error404page.component';

const routes: Routes = [
  {path:'',component:LayoutComponent, children:ContentRoutes, canActivate:[authGuard]},
  
  //If no route matches -> load error404 page
  {path:'**',component:Error404pageComponent, title:'404 Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }