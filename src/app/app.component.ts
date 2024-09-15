import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {CustomerService} from "./services/customer.service";
import {AuthService} from "./services/auth.service";
import {CartService} from "./services/cart.service";
import {CategoryService} from "./services/category.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ClothingStore';

  constructor(public router: Router) {
  }

  authService = inject(AuthService)
  cartService = inject(CartService);

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.cartService.init();
    }
  }
}
