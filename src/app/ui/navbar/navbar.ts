import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  constructor(private router: Router) {}

  onSearch(event: Event, query: string) {

    event.preventDefault();

    const trimmed = query.trim();

    if (trimmed) {
      this.router.navigate(['/search'], { queryParams: { q: trimmed } });
    }

  }

}