import {Component, inject, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faSignOut, faUser, faSignIn, faChartLine} from '@fortawesome/free-solid-svg-icons';
import {Category} from "../../types/category";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {CustomerService} from "../../services/customer.service";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLink,
    MatIconModule,
    NgIf,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  faUser = faUser;
  protected readonly faSignOut = faSignOut;
  protected readonly faChartLine = faChartLine;

  searchTerm!: string;

  customerService = inject(CustomerService);
  categoryList: Category[] = [];

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    // setTimeout(() => {
      this.customerService.getCategories().subscribe((result: any) => {
        this.categoryList = result;
      });
    // },100);
  }

  onSearch(e: any) {
    if (e.target.value) {
      this.router.navigateByUrl('/products?search=' + e.target.value);
    }
  }

  searchCategory(id: string) {
    this.searchTerm = "";
    this.router.navigateByUrl('/products?categoryId=' + id!);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
