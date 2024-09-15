import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {tokenHttpInterceptor} from "./core/token-http-interceptor";
import {AuthService} from "./services/auth.service";
import {BrandService} from "./services/brand.service";
import {CategoryService} from "./services/category.service";
import {CustomerService} from "./services/customer.service";
import {ProductService} from "./services/product.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenHttpInterceptor])),
    AuthService,
    BrandService,
    CategoryService,
    CustomerService,
    ProductService,
  ]
};
