import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [CategoryComponent, CategoryDialogComponent],
  imports: [CommonModule, CategoryRoutingModule, SharedModule],
  providers: [CategoryService],
  exports: [],
})
export class CategoryModule {}
