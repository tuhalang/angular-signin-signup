import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  ngOnInit(): void { }

  constructor() {}



}
