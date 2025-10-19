import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../../services/produtos/produtosService';

interface Product {
  id: number;
  cdProduto: string;
  nomeProduto: string;
  descProduto: string;
  precoProduto: number;
  dataValidade: string;
  flagPromocao: boolean;
  urlFoto: string;
}

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-8">
      <div class="max-w-5xl mx-auto">
        <h1 class="text-4xl font-bold text-center text-amber-900 mb-2">
          Nossos Produtos
        </h1>
        <p class="text-center text-amber-700 mb-12">
          Produtos frescos direto do forno
        </p>

        <!-- Carrossel Principal -->
        <div class="relative bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div class="relative h-96 bg-gray-200">
            <img
              [src]="products[currentIndex].urlFoto"
              [alt]="products[currentIndex].nomeProduto"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          <!-- Botões de Navegação -->
          <button
            (click)="prev()"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-amber-900 p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            (click)="next()"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-amber-900 p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <!-- Informações do Produto -->
          <div class="p-8 bg-white">
            <h2 class="text-3xl font-bold text-amber-900 mb-2">
              {{ products[currentIndex].nomeProduto }}
            </h2>
            <p class="text-amber-700 text-lg mb-4">
              {{ products[currentIndex].descProduto }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-orange-600">
                R$ {{ formatarPreco(products[currentIndex].precoProduto)  }}
              </span>
              <button class="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>

        <!-- Indicadores -->
        <div class="flex justify-center items-center gap-3">
          @for (product of products; track product.id; let i = $index) {
            <button
              (click)="setIndex(i)"
              [class]="'h-3 rounded-full transition-all duration-300 ' +
                (i === currentIndex ? 'bg-orange-500 w-8' : 'bg-amber-200 w-3 hover:bg-amber-300')"
            ></button>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})

export class ProductCarousel implements OnInit{
    loading = false;
    error = '';

    constructor(private userService: ProdutosService) { }
    products: Product[] = [];

    ngOnInit(): void {
      this.loadUsers();
    }

    loadUsers(): void {
      this.loading = true;
      this.userService.getPromos().subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao carregar usuários';
          this.loading = false;
          console.error(err);
        }
      });
    }

    formatarPreco(preco: number): string {
      return preco.toFixed(2).replace('.', ',');
    }

  currentIndex = 0;

  // products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Pão Francês',
  //     price: 'R$ 0,80',
  //     image: 'assets/Imagens/paofrances.jpg',
  //     description: 'Crocante e quentinho'
  //   },
  //   {
  //     id: 2,
  //     name: 'Pão de Queijo',
  //     price: 'R$ 8,00',
  //     image: 'assets/Imagens/paodequeijo.jpg',
  //     description: 'Crocante e macio por dentro'
  //   },
  //   {
  //     id: 3,
  //     name: 'Bolo de Chocolate',
  //     price: 'R$ 28,00',
  //     image: 'assets/Imagens/bolo.jpg',
  //     description: 'Receita tradicional'
  //   },
  //   {
  //     id: 4,
  //     name: 'Doce',
  //     price: 'R$ 6,00',
  //     image: 'assets/Imagens/doce.png',
  //     description: 'Macia e nutritiva'
  //   },
  //   {
  //     id: 5,
  //     name: 'Risole de batata',
  //     price: 'R$ 4,00',
  //     image: 'assets/Imagens/Risole_de_Batata.png',
  //     description: 'Delicioso'
  //   }
  // ];

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.products.length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.products.length) % this.products.length;
  }

  setIndex(index: number): void {
    this.currentIndex = index;
  }
}
