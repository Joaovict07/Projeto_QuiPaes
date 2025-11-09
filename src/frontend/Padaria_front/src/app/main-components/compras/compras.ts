import { Component, OnInit } from '@angular/core';
import {Compra, itemCarrinho} from '../../../services/compras/compra';
import {Router, RouterLink} from '@angular/router';
import {UsuarioService} from '../../../services/user/user';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import {PedidosRequest} from '../../models/pedidos.model';

@Component({
  selector: 'app-compras',
  imports: [
    RouterLink
  ],
  templateUrl: './compras.html',
  styleUrl: './compras.css'
})
export class Compras implements OnInit{
  itensCarrinho: itemCarrinho[] = [];
  deliveryFee = 5.00;
  cpfCnpj = '';
  endereco = '';

  constructor (private cartService: Compra, private usuarioService: UsuarioService, private router: Router, private toastService: ToastrService) {}

  ngOnInit() {
    // Se inscreve no observable para receber atualizações
    this.cartService.cart$.subscribe(items => {
      this.itensCarrinho = items;
    });

    if (!this.usuarioService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  increaseQuantity(itemId: number): void {
    this.cartService.increaseQuantity(itemId);
  }

  decreaseQuantity(itemId: number): void {
    this.cartService.decreaseQuantity(itemId);
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId);
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  getSubtotal(): number {
    return this.cartService.getSubtotal();
  }

  getTotal(): number {
    return this.getSubtotal() + this.deliveryFee;
  }

  async checkout() {
    const result = await Swal.fire({
      title: "Finalizar pedido?",
      text: "Tem certeza que deseja finalizar este pedido?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Finalizar pedido",
      cancelButtonText: "Cancelar"
    })
    if (result.isConfirmed) {
      this.toastService.success("Compra finalizada com sucesso!", "Sucesso!")
      this.cpfCnpj = this.usuarioService.getUsuario().cpfCnpj
      this.endereco = this.usuarioService.getUsuario().endereco
      const produtosComprados: Record<string, number> = {}
      this.itensCarrinho.forEach(item => {
        produtosComprados[JSON.stringify(item.cdProduto)] = item.quantity
      })
      const pedido: PedidosRequest = {
        produtosComprados: produtosComprados,
        cpfCliente: this.cpfCnpj,
        dataHora: '',
        statusCompra: "Pendente",
        enderecoEntrega: this.endereco,
        valorEntrega: this.deliveryFee,
        totalPedido: this.getTotal()
      }
      this.cartService.postPedidos(pedido).subscribe({
        next: (response) => {
          this.toastService.success("Pedido foi criado com sucesso!", "Sucesso!")
        },
        error: (error) => {
          console.log("Erro ao criar pedido", error)
          this.toastService.error("Erro ao criar o pedido!", "Erro!")
        }
      })
      this.cartService.clearCart();
    }
  }
}
