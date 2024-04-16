import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-searchbooks',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterModule],
  templateUrl: './searchbooks.component.html',
  styleUrl: './searchbooks.component.css'
})
export class SearchbooksComponent {

  data: any[] = [];
  searchObj: Search;
  isSearching: boolean = false;

  constructor(private httpClient: HttpClient) {
    this.searchObj = new Search();

    this.fetchData();
  }

  wichIsBeingUsed() {
    if (this.searchObj.search == '') {
      this.isSearching = false;
      this.fetchData();
    } else if (this.searchObj.search != '') {
      this.isSearching = true;
      this.data = [];
      this.searchBook();
    }
  }

  fetchData() {
    this.httpClient.get('http://127.0.0.1:8000/api/books').subscribe((data: any) =>
    {
      console.log(data);
      this.data = data;
    });
  }

  searchBook() {
    this.httpClient.get(`http://127.0.0.1:8000/api/searchbooks/${this.searchObj.search}`).subscribe((data: any) =>
    {
      console.log(data);
      this.data = data;
    });
  }

  bookDetail(book: any) {
    console.log(book);
  
    const bookId = parseInt(book.id, 10);
  
    const bookDetails: any = {
      id: bookId,
      image: book.image,
      title: book.title,
      author: book.author,
      genre: book.gender,
      synopsis: book.synopsis,
      price: book.price,
      stock: 1,
      availableStock: book.stock,
    };
  
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

export class Search {
  search: string = ''

  constructor() {
    this.search = ''
  }
}
