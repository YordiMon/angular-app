import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-buydone',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './buydone.component.html',
  styleUrl: './buydone.component.css'
})
export class BuydoneComponent implements OnInit {

  constructor(private router: Router) { }

  itemCartList: any[] | undefined; 
  newAddress: string = '';
  userName: string = '';
    
  ngOnInit(): void {
    let cartStorage = localStorage.getItem('cart') as string;
    let cart = JSON.parse(cartStorage);
    this.itemCartList = cart;

    const storeNewAddress = localStorage.getItem('profileAddress');
    const storeUserName = localStorage.getItem('profileName');
    this.newAddress = storeNewAddress!;
    this.userName = storeUserName!;
  }

  calculateTotal(): number {
    let total = 0;
    for (const book of this.itemCartList!) {
      total += book.price! * book.stock!;
    }
    return total;
  }

  cancel() {
    if (confirm('¿Desea cancelar la compra?')) {
      alert('Compra cancelada exitosamente.')
      this.router.navigate(['/cart'])
    } else {
      alert('Compra NO cancelada.')
    }
  }

  home() {
    const cartStorage = localStorage.getItem('cart') as string;
    const cart = JSON.parse(cartStorage);
  
    this.itemCartList = [];
    localStorage.setItem('cart', JSON.stringify(this.itemCartList));

    this.router.navigate(['/home'])
  }
}
