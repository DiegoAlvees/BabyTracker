import { Component } from '@angular/core';
import { History, House, LucideAngularModule, Syringe, User } from 'lucide-angular';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './footer.html',
})
export class Footer {
  readonly homeIcon = House
  readonly syringeIcon = Syringe;
  readonly historyIcon = History;
  readonly userIcon = User

}
