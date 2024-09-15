import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {AdminSidebarComponent} from "../admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    AdminSidebarComponent,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit{
  name!: string;
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.categoryService.getCategoryById(this.id)
        .subscribe((result: any) => {
          this.name = result.name;
        });
    }
  }

  add() {
    this.categoryService.addCategory(this.name)
      .subscribe((result: any) => {
        alert("Category added.");
        this.router.navigateByUrl('/admin/categories');
      });
  }

  update() {
    this.categoryService.updateCategory(this.id, this.name)
      .subscribe((result: any) => {
        alert("Category updated.");
        this.router.navigateByUrl('/admin/categories');
      });
  }
}
