import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [NgFor, RouterModule, FormsModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent implements OnInit {
  
  itemCartList: any[] | undefined;
  addressObj: Address;

  constructor(private router: Router) { 
    this.addressObj = new Address();
  }

  userName: string ='';
  userEmail: string ='';
  userAddress: string ='';
    
  ngOnInit(): void {
    let cartStorage = localStorage.getItem('cart') as string;
    let cart = JSON.parse(cartStorage);
    this.itemCartList = cart;

    const storeUserName = localStorage.getItem('profileName')
    const storeUserEmail = localStorage.getItem('profileEmail')
    const storeUserAddress = localStorage.getItem('profileAddress')

    this.userName = storeUserName!.toString();
    this.userEmail = storeUserEmail!.toString();
    this.userAddress = storeUserAddress!.toString();

    this.addressObj.address = this.userAddress;
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

  buy() {
    if (confirm('¿Desea finalizar la compra?')) {
      localStorage.setItem('profileAddress', this.addressObj.address)
      this.router.navigate(['/buydone'])
    } else {
      alert('Compra NO realizada.')
    }
  }
}

export class Address {
  address: string = '';

  constructor() {
    this.address = '';
  }
}
