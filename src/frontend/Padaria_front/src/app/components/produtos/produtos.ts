import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../../services/produtos/produtosService';
import {Produto} from './produtos_interface';
import {CommonModule} from '@angular/common';
import {Compra, itemCarrinho} from  '../../../services/compras/compra'

@Component({
  selector: 'app-produtos',
  imports: [CommonModule],
  templateUrl: './produtos.html',
  standalone: true,
  styleUrl: './produtos.css'
})

export class Produtos implements OnInit{
  produtos: Produto[] = [];
  loading = false;
  error = '';

  constructor(private produtosService: ProdutosService, private cartService: Compra) { }

  ngOnInit(): void {
    this.loadProdutos();
  }

  adicionarAoCarrinho(produto: any): void {
    const cartItem: itemCarrinho = {
      id: produto.id,
      name: produto.name,
      price: produto.price,
      quantity: 1,
      image: produto.image,
      unit: 'un'
    };

    this.cartService.addToCart(cartItem);
    alert(`${produto.name} adicionado ao carrinho!`);
  }

  loadProdutos(): void {
    this.loading = true;
    this.produtosService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar produtos';
        this.loading = false;
        console.error('❌ Erro:', err);
      }
    });
  }

  formatarPreco(preco: number): string {
    return preco.toFixed(2).replace('.', ',');
  }

}
