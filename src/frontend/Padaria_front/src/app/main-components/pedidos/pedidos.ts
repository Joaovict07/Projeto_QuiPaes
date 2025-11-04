import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Compra, itemCarrinho } from '../../../services/compras/compra'

interface itemPedido {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Pedido {
  id: number;
  date: Date;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
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
  filterStatus: 'all' | 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled' = 'all';
  expandedOrders: Set<number> = new Set();

  constructor(private toastService: ToastrService, private compraService: Compra) {}

  ngOnInit() {
    this.pedidos = [
      {
        id: 1001,
        date: new Date('2025-10-25T10:30:00'),
        status: 'pending',
        items: [
          {
            id: 1,
            name: 'Pão Francês',
            price: 0.80,
            quantity: 10,
            image: 'https://images.unsplash.com/photo-1585080873515-13671bcce976?w=400&h=300&fit=crop'
          },
          {
            id: 2,
            name: 'Bolo de Chocolate',
            price: 28.00,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'
          }
        ],
        subtotal: 36.00,
        deliveryFee: 5.00,
        total: 41.00,
        paymentMethod: 'PIX',
        deliveryAddress: 'Rua das Flores, 123 - Centro'
      },
      {
        id: 1002,
        date: new Date('2025-10-24T15:20:00'),
        status: 'delivered',
        items: [
          {
            id: 3,
            name: 'Croissant',
            price: 5.50,
            quantity: 4,
            image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop'
          }
        ],
        subtotal: 22.00,
        deliveryFee: 5.00,
        total: 27.00,
        paymentMethod: 'Cartão de Crédito',
        deliveryAddress: 'Av. Principal, 456 - Jardim'
      }
    ];
  }

  getFilteredOrders(): Pedido[] {
    if (this.filterStatus === 'all') {
      return this.pedidos;
    }
    return this.pedidos.filter(pedido => pedido.status === this.filterStatus);
  }

  getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'pending': 'Aguardando',
      'delivered': 'Entregue',
      'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
  }

  getStatusClass(status: string): string {
    const classMap: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'delivered': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800'
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
      pedido.status = 'cancelled';
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
      pedido.status = 'delivered';
      this.toastService.success("O status do pedido foi atualizado para entregue", "Sucesso")
    }
  }

  reorder(pedidoId: number): void {
    const pedido = this.pedidos.find(o => o.id === pedidoId);
    if (pedido) {
      pedido.items.forEach(item => {
        const itemCarrinho: itemCarrinho = {
          id: item.id,
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
