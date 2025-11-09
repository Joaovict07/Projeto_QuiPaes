import {Pedido} from '../main-components/pedidos/pedidos';

export interface PedidoResponse {
  mensagem: string;
  dados?: Pedido[];
}

export interface RespostaApi<T> {
  mensagem: string;
  dados: T;
}

export interface PedidosRequest {
  produtosComprados: Record<string, number>,
  "cpfCliente": string,
  "dataHora": string,
  "statusCompra": string,
  "enderecoEntrega": string,
  "valorEntrega": number,
  "totalPedido": number
}
