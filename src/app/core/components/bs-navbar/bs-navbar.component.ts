
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
    ) {}

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appuser => this.appUser = appuser);
    const cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(temp => {
      let data: any;
      data = temp.payload.child('/items').val();
      // tslint:disable-next-line:prefer-const
      let cart = new ShoppingCart(data);
      // console.log(cart.items);
      this.shoppingCartItemCount = cart.totalItemsCount;
    });
  }

}
