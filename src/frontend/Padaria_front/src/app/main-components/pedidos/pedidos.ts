import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Compra, itemCarrinho } from '../../../services/compras/compra'

export interface itemPedido {
  id: number;
  cdProduto: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Pedido {
  id: number;
  date: Date;
  status: 'Pendente' | 'Entregue' | 'Cancelado';
  items: itemPedido[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  deliveryAddress?: string;
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

  constructor(private toastService: ToastrService, private compraService: Compra) {}

  ngOnInit() {
    this.compraService.getPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos || []
      },
      error: (error) => {
        this.toastService.error("Erro ao carregar os pedidos!", "Erro!")
      }
    })
  }

  getFilteredOrders(): Pedido[] {
    if (this.filterStatus === 'all') {
      return this.pedidos;
    }
    return this.pedidos.filter(pedido => pedido.status === this.filterStatus);
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

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  async cancelOrder(pedidoId: number) {
    const pedido = this.pedidos.find(o => o.id === pedidoId);
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
      pedido.status = 'Cancelado';
      this.toastService.success("Pedido Cancelado com sucesso", "Sucesso")
    }
  }

  async deliveredOrder(pedidoId: number){
    const pedido = this.pedidos.find(o => o.id === pedidoId);
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
      pedido.status = 'Entregue';
      this.toastService.success("O status do pedido foi atualizado para entregue", "Sucesso")
    }
  }

  reorder(pedidoId: number): void {
    const pedido = this.pedidos.find(o => o.id === pedidoId);
    if (pedido) {
      pedido.items.forEach(item => {
        const itemCarrinho: itemCarrinho = {
          id: item.id,
          cdProduto: item.cdProduto,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
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
}
