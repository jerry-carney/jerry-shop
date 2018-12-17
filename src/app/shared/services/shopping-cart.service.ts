import { AngularFireDatabase } from 'angularfire2/database';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Product } from './../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges();
  }

  async clearCart() {
    // tslint:disable-next-line:prefer-const
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);

    item.snapshotChanges().pipe(take(1))
    .subscribe(data => {
      const quantity = (data.payload.child('/quantity').val() || 0) + change ;
      if (quantity === 0) {
        item.remove();
      } else {
        item.update({product: product, quantity: quantity});
      }
    });
  }

}
