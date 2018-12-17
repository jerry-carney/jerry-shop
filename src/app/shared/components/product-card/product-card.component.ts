import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { Product } from './../../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart; 

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    // console.log('Add to cart: ' + this.product);
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    // console.log('Remove from cart: ' + this.product);
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) { return 0; }

    // console.log('this.shoppingCart:' + this.shoppingCart);
    const item = this.shoppingCart.itemsMap[this.product.key];
    return item ? item.quantity : 0;
  }

}
