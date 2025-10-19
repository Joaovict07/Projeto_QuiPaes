import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../../services/produtos/produtosService';
import {Produto} from './produtos_interface';
import {CommonModule} from '@angular/common';

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

  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.loadProdutos();
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
