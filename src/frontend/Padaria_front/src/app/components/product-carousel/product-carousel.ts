import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para diretivas como *ngFor
import { NgxSplideModule} from 'ngx-splide'; // Módulo do carrossel
import { Options } from '@splidejs/splide';

// Interface para tipar nossos produtos
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-product-carousel',
  standalone: true, // A MÁGICA ACONTECE AQUI
  imports: [
    CommonModule,     // Importa o CommonModule diretamente aqui
    NgxSplideModule   // E também o NgxSplideModule
  ],
  templateUrl: './product-carousel.html',
  styleUrls: ['./product-carousel.css']
})
export class ProductCarouselComponent implements OnInit {

  // Lista de produtos (a lógica interna permanece a mesma)
  products: Product[] = [];

  // Configurações do Carrossel
  splideOptions: Options = {
    type       : 'loop',
    perPage    : 4,
    perMove    : 1,
    gap        : '1rem',
    pagination : false,
    arrows     : true,
    autoplay: true,
    interval: 3000,
    pauseOnHover: true,
    breakpoints: {
      992: { perPage: 3 },
      768: { perPage: 2 },
      576: { perPage: 1 }
    }
  };

  constructor() { }

  ngOnInit(): void {
    // Simulando a busca de produtos
    this.products = [
      { id: 1, name: 'Pão ', price: 9.90, imageUrl: 'assets/Imagens/baquete.jpg' },
      { id: 1, name: 'Pão ', price: 9.90, imageUrl: 'assets/Imagens/baquete.jpg' },
      { id: 1, name: 'Pão ', price: 9.90, imageUrl: 'assets/Imagens/baquete.jpg' }
    ];
  }
}
