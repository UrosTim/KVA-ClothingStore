import {Component, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {Category} from "../../../types/category";
import {Brand} from "../../../types/brand";
import {CategoryService} from "../../../services/category.service";
import {BrandService} from "../../../services/brand.service";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AdminSidebarComponent} from "../admin-sidebar/admin-sidebar.component";


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelectModule,
    MatCheckboxModule,
    AdminSidebarComponent,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit{
  formBuilder = inject(FormBuilder);
  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(20)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeatured: [false],
    isFresh: [false],
  });

  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  brandService = inject(BrandService);

  router = inject(Router);
  route = inject(ActivatedRoute);
  id!: string;

  categories: Category[] = [];
  brands: Brand[] = [];

  ngOnInit() {
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.productService.getProductById(this.id)
        .subscribe((result) => {
          for (let index = 0; index < result.images.length; index++) {
            this.addImage();
          }
          this.productForm.patchValue(result as any);
        });
    } else {
      this.addImage();
    }
  }

  addProduct() {
    let value = this.productForm.value;
    this.productService.addProduct(value as any)
      .subscribe((result) => {
        alert("Product added.");
        this.router.navigateByUrl('/admin/products');
      });
  }

  addImage() {
    this.images.push(this.formBuilder.control(null));
  }

  removeImage() {
    this.images.removeAt(this.images.controls.length - 1);
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }

  updateProduct() {
    let value = this.productForm.value;
    this.productService.updateProduct(this.id, value as any)
      .subscribe((result) => {
        alert("Product updated.");
        this.router.navigateByUrl('/admin/products');
      });
  }
}
