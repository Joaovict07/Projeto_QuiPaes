export interface Produto {
  id: number;
  cdProduto: string;
  nomeProduto: string;
  descProduto: string;
  precoProduto: number;
  dataValidade: string;
  flagPromocao: boolean;
  urlFoto: string;
}

export interface ProdutoResponse {
  mensagem: string;
  dados: Produto[];
}
