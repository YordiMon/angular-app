import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookdetail',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './bookdetail.component.html',
  styleUrl: './bookdetail.component.css'
})
export class BookdetailComponent implements OnInit {
  
  httpClient = inject(HttpClient);
  data: any[] = [];
  commentObj: Comment;

  constructor(private router: Router) {
    this.commentObj = new Comment();
  }

  selectedBookId: number | null = null;
  selectedBookTitle: string = '';
  selectedBookImage: string = '';
  selectedBookAuthor: string = '';
  selectedBookSynopsis: string = '';
  selectedBookStock: string = '';
  selectedBookPrice: string = '';
  selectedBookGenre: string = '';
  userIdentificator: number | null = null;

  ngOnInit(): void {
    const storedId = localStorage.getItem('selectedBookId');
    const storeTitle = localStorage.getItem('selectedBookTitle');
    const storeImage = localStorage.getItem('selectedBookImage');
    const storeAuthor = localStorage.getItem('selectedBookAuthor');
    const storeGenre = localStorage.getItem('selectedBookGenre');
    const storeSynopsis = localStorage.getItem('selectedBookSynopsis');
    const storePrice = localStorage.getItem('selectedBookPrice');
    const storeStock = localStorage.getItem('selectedBookStock');
    const storeUserId = localStorage.getItem('profileId');
    if (storedId) {
      this.selectedBookId = parseInt(storedId, 10);
      this.userIdentificator = parseInt(storeUserId!, 10);
      this.selectedBookTitle = storeTitle!.toString();
      this.selectedBookImage = storeImage!.toString();
      this.selectedBookAuthor = storeAuthor!.toString();
      this.selectedBookGenre = storeGenre!.toString();
      this.selectedBookSynopsis = storeSynopsis!.toString();
      this.selectedBookPrice = storePrice!.toString();
      this.selectedBookStock = storeStock!.toString();
    }
    this.fetchData();
  }

  fetchData() {
    if (this.selectedBookId !== null) {
      this.httpClient.get(`http://127.0.0.1:8000/api/comments/${this.selectedBookId}`).subscribe((data: any) => {
        console.log(data);
        this.data = data;
      });
    }
  }

  doReview() {

    const url = 'http://127.0.0.1:8000/api/comment';
    this.httpClient.post(url, {
      "user_id": this.userIdentificator,
      "book_id": this.selectedBookId,
      "ratings": this.commentObj.ratings,
      "comment": this.commentObj.comment
    }).subscribe(
      (response: any) => {
        console.log('Comentario: ', response);
        this.fetchData()
        alert('Comentario realizado exitosamente.');
      },
      (error: any) => {
        console.log('Error: ', error)
      }
    );
  }
}

export class Comment {
  ratings: number | null;
  comment: string = '';
  
  constructor() {
    this.ratings = null;
    this.comment = '';
  }
}