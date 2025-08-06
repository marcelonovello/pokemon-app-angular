# Pokédex - Aplicativo Ionic com Angular

## 📋 Pré-requisitos:
- Node.js
- npm 9+/yarn
- Ionic CLI 8+
- Chrome/Firefox

## 🚀 Tecnologias Utilizadas:
- **Frontend:** Ionic 8, Angular 18, TypeScript 5+ RxJS 7+
- **API:** PokeAPI (https://pokeapi.co/)
- **Ferramentas:** Git, VS Code, Jest (testes) 
  
## 📁 Arquitetura:
`frontend/`: 
  - `src/`:
    - `app/`        
      - `shared/`    
      - `app.routes.ts`
    - `assets/`
    - `environments/`
    - `theme/`
  - `angular.json`
  - `ionic.config.json`
  - `package.json`
- `docs/`
- `package.json` 

## 🛠️ Funcionalidades Implementadas:
- Componentes standalone do Angular.
- Mocks para a PokeAPI.
- Integração com PokeAPI via HttpClient.
- Configuração Jest para testes unitários.

## ⚙️ Como Rodar o Projeto:
### Instalação Global:
  ```bash
  npm install -g @ionic/cli
  ```

1. Instale as dependências:
    ```bash
    npm install
    ```

2. Execute o servidor de desenvolvimento:
    ```bash
    ionic serve
    ```

3.  O servidor estará disponível em `http://localhost:8100`.

### Build - Produção:
    
  ```bash
    ionic build --prod
  ```

### Testes:
  ```bash
    npm test
  ```

### 👨‍💻 Autor:
Desenvolvido por Marcelo Novello<br>
[GitHub](https://github.com/marcelonovello) •
[LinkedIn](https://linkedin.com/in/marcelonovello)

