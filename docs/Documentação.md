# Golden Raspberry Awards - Frontend

Este documento explica de forma simples como a aplicação funciona.

## 1. Qual o Objetivo?

*   A aplicação mostra informações sobre os piores filmes indicados ao prêmio paródia Golden Raspberry Awards.
*   Os dados são buscados em uma API externa (`https://challenge.outsera.tech/api/movies`).

## 2. Como a Aplicação é Organizada?

*   É um projeto Angular padrão.
*   Possui duas telas principais (views):
    *   **Dashboard:** Mostra tabelas com curiosidades (anos com mais vencedores, estúdios com mais vitórias, produtores com maior/menor intervalo entre prêmios, vencedores de um ano específico).
    *   **Lista de Filmes:** Mostra todos os filmes em uma tabela, com páginas (paginação) e filtros por ano ou se o filme foi vencedor.
*   Tem um menu superior (`NavigationComponent`) para ir de uma tela para a outra.

## 3. Peças Principais:

*   **Componentes:** São as "telas" ou partes visuais da aplicação.
    *   `AppComponent`: O componente base, principal da aplicação.
    *   `NavigationComponent`: O menu de navegação.
    *   `DashboardComponent`: A tela do Dashboard.
    *   `MovieListComponent`: A tela da Lista de Filmes.
*   **Serviço (`MovieService`):** É o responsável pela comunicação com a API externa, fazendo a consulta dos dados solicitados pelos componentes.
*   **Modelos (`models/`):** Interfaces do TypeScript que definem a estrutura dos dados recebidos da API (ex: um filme tem `id`, `year`, `title`, `studios`, `producers`, `winner`).
*   **Roteamento (`app.routes.ts`):** Define qual componente mostrar dependendo da URL que o usuário acessa (ex: `/dashboard` mostra o `DashboardComponent`, `/list` mostra o `MovieListComponent`).

## 4. Como Funciona (Fluxo Básico):

1.  **Usuário Interage:** Clica em um link no menu, digita um ano no filtro, ou muda de página na tabela.
2.  **Componente Pede Dados:** O componente da tela ativa (Dashboard ou Lista) percebe a ação e pede os dados necessários ao `MovieService`.
3.  **Serviço Busca na API:** O `MovieService` monta e envia uma requisição HTTP (GET) para a API externa, pedindo os dados específicos (ex: filmes do ano 2000, vencedores=true).
4.  **API Responde:** A API processa a requisição e envia os dados de volta em formato JSON.
5.  **Serviço Entrega os Dados:** O `MovieService` recebe a resposta da API e a entrega para o componente que solicitou.
6.  **Componente Mostra em Tela:** O componente recebe os dados, processa-os se necessário, e atualiza a interface do usuário (HTML) para mostrar as informações.

## 5. Testes Unitários:

* O projeto inclui testes unitários para verificar se as partes menores do código (como funções dentro dos componentes e serviços) funcionam corretamente de forma isolada.
* São utilizados o Karma como executor de testes e o Jasmine como framework de testes, que são padrões no ecossistema Angular.
* Os arquivos de teste do projeto terminam com `.spec.ts` e estão localizados no mesmo diretório dos arquivos testados (ex: `movie.service.spec.ts` testa `movie.service.ts`).
* Dessa forma, eles garantem a qualidade do código, facilitam a identificação de bugs e dão mais segurança ao fazer alterações ou adicionar novas funcionalidades.

