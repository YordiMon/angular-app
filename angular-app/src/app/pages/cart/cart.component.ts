import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, BookComponent, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  itemCartList: any[] | undefined; 
    
  ngOnInit(): void {
    let cartStorage = localStorage.getItem('cart') as string;
    let cart = JSON.parse(cartStorage);
    this.itemCartList = cart;
  }

  removeItemTotal(index: number) {
    if (confirm('¿Desea remover todas las unidades de este libro?')) {
      if (this.itemCartList && index >= 0 && index < this.itemCartList.length) {
        this.itemCartList.splice(index, 1);
      }
  
      localStorage.setItem('cart', JSON.stringify(this.itemCartList));
      alert('Todas las unidades de este libro han sido removidas del carrito.');
    } else {
      alert('Unidades NO removidas del carrito.');
    }

  }

  removeItem(index: number) {
    if (confirm('¿Desea remover una unidad de este libro?')) {
      if (this.itemCartList && index >= 0 && index < this.itemCartList.length) {
        const book = this.itemCartList[index];
        if (book.stock && book.stock > 0) {
          book.stock--;
        }
        if (book.stock === 0) {
          this.itemCartList.splice(index, 1);
        }
  
        localStorage.setItem('cart', JSON.stringify(this.itemCartList));
        alert('Unidad removida del carrito exitosamente.');
      }
    } else {
      alert('Unidad NO removida del carrito.');
    }
  }
  
  clearCart() {
    const cartStorage = localStorage.getItem('cart') as string;
    const cart = JSON.parse(cartStorage);
  
    if (confirm('¿Desea vaciar el carrito de compras?')) {
      this.itemCartList = [];
      localStorage.setItem('cart', JSON.stringify(this.itemCartList));
      alert('Carrito vaciado exitosamente');
    } else {
      alert('Vaciamiento del carrito cancelado.');
    }
  }
  
  
  calculateTotal(): number {
    let total = 0;
    for (const book of this.itemCartList!) {
      total += book.price! * book.stock!;
    }
    return total;
  }
}
