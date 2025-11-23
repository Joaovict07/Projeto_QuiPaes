import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {Compra, itemCarrinho} from '../../../services/compras/compra'
import {Produto} from '../../components/produtos/produtos_interface';
import {ProdutosService} from '../../../services/produtos/produtosService'
import {firstValueFrom} from 'rxjs';

export interface itemPedido {
  nomeProduto: string;
  cdProduto: string;
  quantidade: number;
  urlFotoProduto: string;
  precoProduto: number;
}

export interface Pedido {
  idCompra: number;
  dataHora: Date;
  statusCompra: 'Pendente' | 'Entregue' | 'Cancelado';
  produtosComprados: itemPedido[];
  cpfCliente: string;
  subtotal: number;
  valorEntrega: number;
  totalPedido: number;
  enderecoEntrega?: string;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  filterStatus: 'all' | 'Pendente' | 'Entregue' | 'Cancelado' = 'all';
  expandedOrders: Set<number> = new Set();
  produtosDetalhados: any[] = [];

  constructor(private toastService: ToastrService, private compraService: Compra, private produtoService: ProdutosService) {}

  ngOnInit() {
    this.compraService.getPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos || []
      },
      error: (error) => {
        this.toastService.error("Erro ao carregar os pedidos!", "Erro!")
      }
    })
    this.produtoService.getProdutos().subscribe({
      next: (response) => {
        this.produtosDetalhados = response
        console.log(response)
      }
    })
  }

  getFilteredOrders(): Pedido[] {
    if (this.filterStatus === 'all') {
      return this.pedidos;
    }
    return this.pedidos.filter(pedido => pedido.statusCompra === this.filterStatus);
  }

  getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'Pendente': 'Aguardando',
      'Entregue': 'Entregue',
      'Cancelado': 'Cancelado'
    };
    return statusMap[status] || status;
  }

  getStatusClass(status: string): string {
    const classMap: Record<string, string> = {
      'Pendente': 'bg-yellow-100 text-yellow-800',
      'Entregue': 'bg-gray-100 text-gray-800',
      'Cancelado': 'bg-red-100 text-red-800'
    };
    return classMap[status] || 'bg-gray-100 text-gray-800';
  }

  async cancelOrder(pedidoId: number) {
    const pedido = this.pedidos.find(o => o.idCompra === pedidoId);
    const result = await Swal.fire({
      title: "Cancelar Pedido?",
      text: "Tem certeza que deseja cancelar este pedido?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Cancelar",
      cancelButtonText: "Manter este pedido"
    })
    if (pedido && result.isConfirmed) {
      try {
        pedido.statusCompra = 'Cancelado';
        await firstValueFrom(this.compraService.updatePedidos(pedido, 'cancelar'));
        this.toastService.success("Pedido Cancelado com sucesso", "Sucesso");
      } catch (error) {
        this.toastService.error("Erro ao cancelar pedido", "Erro");
        console.error(error);
      }
    }
  }

  async deliveredOrder(pedidoId: number){
    const pedido = this.pedidos.find(o => o.idCompra === pedidoId);
    const result = await Swal.fire({
      title: "Pedido entregue?",
      text: "O seu pedido foi entregue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Foi entregue",
      cancelButtonText: "Não, foi engano"
    })

    if (pedido && result.isConfirmed) {
      try {
        pedido.statusCompra = 'Entregue';
        await firstValueFrom(this.compraService.updatePedidos(pedido, 'entregar'))
        this.toastService.success("O status do pedido foi atualizado para entregue", "Sucesso")
      }catch(error) {
        this.toastService.error("Erro ao definir o pedido como entregue", "Erro")
        console.log(error)
      }
    }
  }

  reorder(pedidoId: number): void {
    const pedido = this.pedidos.find(o => o.idCompra === pedidoId);
    if (pedido) {
      pedido.produtosComprados.forEach(item => {
        const itemCarrinho: itemCarrinho = {
          id: 0,
          cdProduto: item.cdProduto,
          name: item.nomeProduto,
          price: item.precoProduto,
          quantity: item.quantidade,
          image: item.urlFotoProduto,
          unit: 'un'
        }

        this.compraService.addToCart(itemCarrinho)
      })

      this.toastService.success("Os itens do pedido foram adicionados ao carrinho", "Sucesso")
    }
  }

  toggleOrderExpansion(pedidoId: number): void {
    if (this.expandedOrders.has(pedidoId)) {
      this.expandedOrders.delete(pedidoId);
    } else {
      this.expandedOrders.add(pedidoId);
    }
  }

  isOrderExpanded(pedidoId: number): boolean {
    return this.expandedOrders.has(pedidoId);
  }

  protected readonly JSON = JSON;
}
