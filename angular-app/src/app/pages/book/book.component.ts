import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})

export class BookComponent implements OnInit {

  httpClient = inject(HttpClient);
  data: any[] = [];
  
  profileId: string | null | undefined;
  profileName: string | null | undefined;
  profileEmail: string | null | undefined;
  profileAddress: string | null | undefined;

  ngOnInit(): void {
    this.fetchData();

    this.profileId = localStorage.getItem('profileId');
    this.profileName = localStorage.getItem('profileName');
    this.profileEmail = localStorage.getItem('profileEmail');
    this.profileAddress = localStorage.getItem('profileAddress');
  }

  fetchData() {
    this.httpClient.get('http://127.0.0.1:8000/api/books').subscribe((data: any) =>
    {
      console.log(data);
      this.data = data;
    });
  }

  bookDetail(book: any) {
    console.log(book);
    const bookId = parseInt(book.id, 10);

    localStorage.setItem('selectedBookId', bookId.toString());
    localStorage.setItem('selectedBookImage', book.image.toString());
    localStorage.setItem('selectedBookTitle', book.title.toString());
    localStorage.setItem('selectedBookAuthor', book.author.toString());
    localStorage.setItem('selectedBookGenre', book.gender.toString());
    localStorage.setItem('selectedBookSynopsis', book.synopsis.toString());
    localStorage.setItem('selectedBookPrice', book.price.toString());
    localStorage.setItem('selectedBookStock', book.stock.toString());
  }
  

  addToCart(book: any) {
    console.log(book)

    let itemCart: any = {
      id: book.id,
      image: book.image,
      title: book.title,
      price: book.price,
      stock: 1,
    }

    if (localStorage.getItem('cart') === null) {
      let cart: any[] = [];
      cart.push(itemCart);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      let cartStorage = localStorage.getItem('cart') as string;
      let cart = JSON.parse(cartStorage);

      let index = -1;
      for (let i = 0; i < cart.length; i++) {
        let itemC: any = cart[i]; 
        if (itemCart.id === itemC.id) {
          index = i;
          break;
        } 
      }

      if (index === -1) {  
        cart.push(itemCart);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Libro agregado al carrito correctamente.')
      } else {
        let itemCart: any = cart[index];
        itemCart.stock!++;
        cart[index] = itemCart;
        localStorage.setItem('cart', JSON.stringify(cart)); 
        alert('Libro agregado al carrito correctamente.')
      }
    }
  }
}
