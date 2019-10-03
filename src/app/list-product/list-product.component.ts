import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { User } from '../model/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[];
  currentUser: User;

  constructor(
    private authentication: AuthenticationService,
    private http: HttpClient
  ) {
    this.authentication.currentUser.subscribe(x => this.currentUser = x);
    const headers = new HttpHeaders().set('Content-type', 'application/json')
      .set('Authorization', this.currentUser['tokenType'] + ' ' + this.currentUser['accessToken']);
    this.http.get<any>('http://localhost:5000/products', { headers }).subscribe(
      data => {
        this.products = data;
        console.log(this.products);
      },
      error => {
        console.log(error);
      }
    );

  }

  ngOnInit() {
  }

  delete(id) {
    const headers = new HttpHeaders().set('Content-type', 'application/json')
      .set('Authorization', this.currentUser['tokenType'] + ' ' + this.currentUser['accessToken']);
    this.http.delete<any>('http://localhost:5000/products/' + id, {headers}).subscribe(
      data => {
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

}
