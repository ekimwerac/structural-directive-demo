import { Component } from '@angular/core';
import { IsAuthDirective } from './is-auth.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IsAuthDirective], // Include the directive
  template: `
    <button (click)="toggleAuth()">Toggle Auth</button>
    <p *appIsAuth="isAuthenticated">You have access to privileged information.</p>
    <p *appIsAuth="!isAuthenticated">Access denied. Please log in.</p>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated = false;

  toggleAuth() {
    this.isAuthenticated = !this.isAuthenticated;
  }
}

