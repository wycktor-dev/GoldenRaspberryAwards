# Golden Raspberry Awards - Frontend

Este projeto é uma aplicação web desenvolvida em Angular para visualizar os indicados e vencedores da categoria "Pior Filme" do Golden Raspberry Awards. A aplicação consome uma API REST para buscar e exibir os dados.

## Funcionalidades

- **Dashboard:** Exibe painéis com informações analíticas:
    - Anos com mais de um vencedor.
    - Os três estúdios com mais vitórias.
    - Produtores com maior e menor intervalo entre vitórias.
    - Busca de vencedores por ano.
- **Lista de Filmes:** Exibe todos os filmes em uma tabela paginada com filtros por ano e status de vencedor (Sim/Não).
- **Navegação:** Menu superior para navegar entre as views Dashboard e Lista de Filmes.
- **Responsividade:** Interface adaptada para diferentes tamanhos de tela.

## Tecnologias Utilizadas

- **Angular:** Framework frontend principal.
- **Angular CLI:** Ferramenta de linha de comando para Angular.
- **TypeScript:** Linguagem de programação.
- **SCSS:** Pré-processador CSS para estilização.
- **Angular Material:** Biblioteca de componentes UI.
- **RxJS:** Biblioteca para programação reativa.

## Pré-requisitos

- Node.js (versão 20.x ou superior recomendada)
- npm (instalado com o Node.js)
- Angular CLI (instalado globalmente: `npm install -g @angular/cli`)

## Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd golden-raspberry-awards
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    ng serve
    ```
    Abra seu navegador e acesse `http://localhost:4200/`.

## Executando Testes Unitários

Para executar os testes unitários utilizando Karma e Jasmine, é sugerida a execução do comando:

```bash
ng test --watch=false --browsers=ChromeHeadless
```

**OBS:** A execução dos testes no ambiente de desenvolvimento atual pode falhar devido à ausência do binário do Chrome na máquina. Certifique-se de ter o Chrome instalado ou configure a variável de ambiente `CHROME_BIN` adequadamente no seu ambiente local.

# Documentação do Projeto

Uma descrição melhor detalhada do funcionamento geral da aplicação pode ser acessada neste repositório em: [Documentação do Projeto](docs/Documentação.md)

## API Utilizada

A aplicação consome a API disponível em: `https://challenge.outsera.tech/api/movies`