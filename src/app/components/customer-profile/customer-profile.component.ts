import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatCard, MatCardTitle, MatCardSubtitle, MatCardActions, MatCardHeader} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent {

  authService = inject(AuthService);
}
