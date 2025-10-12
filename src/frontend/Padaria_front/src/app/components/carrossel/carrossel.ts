import { Component, OnInit, AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrossel.html',
  styleUrls: ['./carrossel.css']  // plural
})
export class Carrossel implements AfterViewInit {
  slideAtual = 0;

  slides = [
    { imagem: 'assets/Imagens/baquete.jpg', alt: 'Baguete' },
    { imagem: 'assets/Imagens/bolo.jpg', alt: 'Bolo' },
    { imagem: 'assets/Imagens/paofrances.jpg', alt: 'Pão Francês' },
    { imagem: 'assets/Imagens/paodequeijo.jpg', alt: 'Pão de Queijo' }
  ];

  Proximo() {
    this.slideAtual = (this.slideAtual + 1) % this.slides.length
  }

  ngAfterViewInit() {
    // setInterval(() => {
    //   this.slideAtual = (this.slideAtual + 1) % this.slides.length;
    // }, 5000);
  }
}
