import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { API_URL } from './config/api.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('babytracker');

  showApiWarning = signal(true);

constructor(private http: HttpClient) {}

  ngOnInit() {
    setTimeout(() => {
      this.showApiWarning.set(false)
    }, 9000);

    this.wakeApi()
  }

  private wakeApi() {
    this.http.get(`${API_URL}/babies?userId=1`).subscribe({
      next: () => console.log('API acordou!'),
      error: () => console.log('API ainda demorando...')
    })
  }
}
