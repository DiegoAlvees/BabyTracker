import { Component, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('babytracker');

  showApiWarning = signal(true);

  ngOnInit() {
    setTimeout(() => {
      this.showApiWarning.set(false)
    }, 9000);
  }
}
