import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  createForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '/products';
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authentication: AuthenticationService
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    });
  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }

    this.loading = true;
    this.authentication.currentUser.subscribe(x => this.currentUser = x);
    const headers = new HttpHeaders().set('Content-type', 'application/json')
      .set('Authorization', this.currentUser['tokenType'] + ' ' + this.currentUser['accessToken']);
    console.log(this.f.name.value);
    this.http.post<any>('http://localhost:5000/products',
      { name: this.f.name.value, price: this.f.price.value, description: this.f.description.value }, {headers}).subscribe(
        data => {
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        }
      );
  }

}
