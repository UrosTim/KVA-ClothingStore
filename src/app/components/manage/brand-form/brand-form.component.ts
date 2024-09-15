import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BrandService} from "../../../services/brand.service";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import {AdminSidebarComponent} from "../admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    RouterLink,
    AdminSidebarComponent,
  ],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent implements OnInit{
  name!: string;
  brandService = inject(BrandService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.brandService.getBrandById(this.id)
        .subscribe((result: any) => {
          this.name = result.name;
        });
    }
  }

  add() {
    this.brandService.addBrand(this.name)
      .subscribe((result: any) => {
        alert("Brand added.");
        this.router.navigateByUrl('/admin/brands');
      });
  }

  update() {
    this.brandService.updateBrand(this.id, this.name)
      .subscribe((result: any) => {
        alert("Brand updated.");
        this.router.navigateByUrl('/admin/brands');
      });
  }
}
