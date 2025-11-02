import { Component } from '@angular/core';
import { ProductCarousel} from '../../components/product-carousel/product-carousel';
import { Produtos } from '../../components/produtos/produtos';
import { Sobre } from '../../components/sobre/sobre';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ProductCarousel, Produtos, Sobre, RouterLink],
  templateUrl: './home.html',
  standalone: true,
  styleUrl: './home.css'
})
export class Home {

}
