import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {

}
