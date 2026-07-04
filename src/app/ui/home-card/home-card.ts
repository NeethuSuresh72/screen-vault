import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './home-card.html',
  styleUrl: './home-card.css'
})
export class HomeCard {

  @Input({ required: true }) movie!: any;

  imageUrl = environment.imageUrl;

}