import { Component } from '@angular/core';
import { ProductCarousel} from '../../components/product-carousel/product-carousel';
import { Produtos } from '../../components/produtos/produtos';
import { Sobre } from '../../components/sobre/sobre';

@Component({
  selector: 'app-home',
  imports: [ProductCarousel, Produtos, Sobre],
  templateUrl: './home.html',
  standalone: true,
  styleUrl: './home.css'
})
export class Home {

}
