# Pokédex - Aplicativo Ionic com Angular

Um aplicativo moderno de Pokédex desenvolvido com Ionic e Angular, consumindo a PokeAPI para fornecer informações detalhadas sobre Pokémons. O projeto demonstra boas práticas de desenvolvimento mobile, arquitetura limpa e design responsivo.

## 🚀 Funcionalidades

- **Lista de Pokémons**: Navegação paginada com scroll infinito
- **Busca Inteligente**: Filtro em tempo real por nome do Pokémon
- **Detalhes Completos**: Informações abrangentes incluindo estatísticas, habilidades, tipos e galeria de imagens
- **Sistema de Favoritos**: Marque e gerencie seus Pokémons favoritos com persistência local
- **Design Responsivo**: Interface adaptável para diferentes tamanhos de tela
- **Navegação Intuitiva**: Tabs organizadas para melhor experiência do usuário

## 🛠️ Tecnologias Utilizadas

- **Ionic 8**: Framework para desenvolvimento mobile híbrido
- **Angular 18**: Framework frontend com TypeScript
- **PokeAPI**: API RESTful para dados dos Pokémons
- **RxJS**: Programação reativa para gerenciamento de estado
- **LocalStorage**: Persistência local para favoritos
- **SCSS**: Estilização avançada com variáveis CSS

## 📱 Arquitetura e Padrões

### Injeção de Dependência
O projeto utiliza o sistema nativo de injeção de dependência do Angular, garantindo baixo acoplamento e alta testabilidade. Os serviços são registrados como singletons através do `providedIn: 'root'`, permitindo compartilhamento eficiente de estado entre componentes.

### Programação Reativa
Implementação de RxJS Observables para gerenciamento assíncrono de dados, com operadores como `switchMap`, `forkJoin` e `BehaviorSubject` para controle de fluxo e estado reativo.

### Componentização
Estrutura modular com componentes standalone do Angular, eliminando a necessidade de módulos tradicionais e simplificando a arquitetura. Cada componente é responsável por uma funcionalidade específica, seguindo o princípio da responsabilidade única.

### Responsividade
Design mobile-first com breakpoints CSS personalizados, garantindo experiência otimizada em dispositivos móveis, tablets e desktops. Utilização do sistema de grid do Ionic para layouts flexíveis.

## 🎨 Estilo de Codificação

### TypeScript
- Tipagem forte com interfaces customizadas para dados da API
- Uso de generics para reutilização de código
- Implementação de guards de tipo para validação runtime
- Documentação JSDoc para métodos públicos

### SCSS
- Variáveis CSS customizadas para temas consistentes
- Mixins para reutilização de estilos
- Estrutura BEM para nomenclatura de classes
- Animações CSS para melhor experiência do usuário

### Padrões de Design
- **Observer Pattern**: Para comunicação entre componentes via serviços
- **Strategy Pattern**: Para diferentes estratégias de carregamento de dados
- **Facade Pattern**: Simplificação da interface da PokeAPI através de serviços
- **Repository Pattern**: Abstração da camada de dados

## 🔧 Instalação e Execução

```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Navegue para o diretório
cd pokemon-app-angular

# Instale as dependências
npm install

# Execute o projeto
ionic serve
```

## 📊 Estrutura do Projeto

```
src/
├── app/
│   ├── models/           # Interfaces e tipos TypeScript
│   ├── services/         # Serviços para API e estado
│   ├── tab1/            # Tela principal (Lista de Pokémons)
│   ├── tab2/            # Tela de detalhes
│   ├── tab3/            # Tela de favoritos
│   └── tabs/            # Navegação por tabs
```

## 🧪 Testes

O projeto inclui testes unitários para componentes críticos, garantindo qualidade e confiabilidade do código. Os testes cobrem:

- Serviços de API e favoritos
- Lógica de componentes
- Transformação de dados
- Casos de erro e edge cases



