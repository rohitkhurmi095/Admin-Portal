import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './manage/add-product/add-product.component';
import { ProductListComponent } from './manage/product-list/product-list.component';

const routes: Routes = [
  {path:'manage/product-list',component:ProductListComponent,title:'Products List'},
  {path:'manage/add-product',component:AddProductComponent,title:'Add Product'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
