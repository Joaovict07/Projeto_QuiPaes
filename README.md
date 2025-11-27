# 🥖 *Qui Pães – Sistema Web da Padaria*

Este projeto tem como objetivo introduzir a Padaria *Qui Pães* ao ambiente digital por meio do desenvolvimento de um *site moderno e responsivo*.
A plataforma apresenta os produtos, facilita a comunicação com os clientes e amplia a presença da padaria online, servindo também como base para futuras funcionalidades, como pagamentos via web.

---

## 🛠 *Sobre a Modernização*

Este repositório é uma *reconstrução completa* de um sistema anterior antes feito com Python + Tkinter + SQLite  (disponível em: https://github.com/Chr1sti0n18/SMS ). 
<br>O objetivo da migração foi atualizar a arquitetura para tecnologias amplamente usadas no mercado, tornando o sistema:

* mais fácil de manter
* mais simples de evoluir e escalar
* mais seguro
* acessível via navegador por qualquer dispositivo

A nova versão utilizou:

* *Java + Spring Boot* (API)
* *Angular* (Frontend)
* Azure SQL Database (Banco de Dados)
* *Docker* (Containerização)
* *Render* (Deploy da API)
* *Vercel* (Deploy do Frontend)

---

## 🌐 *Acesse o site*

🔗 https://projeto-qui-paes.vercel.app/home

#### Obs: A API entra em estado de inatividade após ficar sem requests por um tempo. Caso não carregue nenhuma imagem ao acessar o site, espere alguns minutos e tente novamente.

---

# 🚀 *Principais Funcionalidades*

## ✔ *Implementadas*

### 🥐 *Catálogo de Produtos*

* Página dedicada com imagens, descrição e valores
* Layout leve e responsivo
* Seção institucional “Sobre Nós”

### 🛒 *Pedidos Online*

* O cliente pode montar e enviar o pedido pela plataforma

### 👤 *Cadastro de Clientes*

* API permite criar e armazenar dados de clientes

### 📱 *Integração com WhatsApp*

* Botão direto para contato
* Ícone estilizado no rodapé e na seção institucional

### 🖥 *Design e Navegação*

* Interface moderna
* Estrutura responsiva para desktop e mobile
* Paleta visual alinhada com identidade da padaria

---

## 🔒 *Segurança*

O backend utiliza:

* *Spring Security*
* *JWT (JSON Web Token)*

  * garante autenticação segura
  * rotas protegidas para funcionalidades sensíveis
  * comunicação stateless entre frontend e backend

---

# 🧩 *Arquitetura e Deploy*

### 🖥 *Backend – API Java/Spring Boot*

Hospedado no Render

* Endpoints REST
* Sistema de clientes
* Preparado para pedidos e autenticação
* Conteinerizado com Docker

### 🌐 *Frontend – Angular*

Hospedado na Vercel

* Consumo da API
* Interface da loja
* Responsivo 

---

# 🗂 *Tecnologias Utilizadas*

### *Frontend*

* Angular
* TypeScript
* HTML / CSS
* TailWindCSS
* Responsividade nativa / Media Queries

### *Backend*

* Java 17
* Spring Boot
* Spring Security
* JWT
* JPA / Hibernate

### *Infraestrutura*

* Docker
* Render
* Vercel
* Git/GitHub
* Azure SQL Database

---

### 💳 Futuras melhorias:

* Painel administrativo da padaria
* Controle de pedidos

* Pagamento online 
* Notificações de atualização do pedido
* Sistema de entregas

---

