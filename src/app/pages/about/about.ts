import { Component } from '@angular/core';
import { AboutCard } from '../../ui/about-card/about-card';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutCard],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {}