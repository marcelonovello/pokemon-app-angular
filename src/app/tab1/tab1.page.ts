import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonAvatar, 
  IonImg,
  IonButton,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSearchbar,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { heart, heartOutline, search } from 'ionicons/icons';

import { PokemonService } from '../services/pokemon.service';
import { FavoritesService } from '../services/favorite.service';
import { PokemonDetails } from '../models/pokemon.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonAvatar, 
    IonImg,
    IonButton,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSearchbar,
    IonSpinner,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonFab,
    IonFabButton
  ],
})
export class Tab1Page implements OnInit {
  pokemons: PokemonDetails[] = [];
  filteredPokemons: PokemonDetails[] = [];
  isLoading = false;
  currentOffset = 0;
  pageSize = 20;
  searchTerm = '';

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {
    addIcons({ heart, heartOutline, search });
  }

  ngOnInit() {
    this.loadPokemons();
  }

  /**
   * Carrega a lista inicial de Pokémons
   */
  loadPokemons() {
    this.isLoading = true;
    this.pokemonService.getPokemonListWithDetails(this.currentOffset, this.pageSize)
      .subscribe({
        next: (pokemons) => {
          this.pokemons = [...this.pokemons, ...pokemons];
          this.filterPokemons();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar Pokémons:', error);
          this.isLoading = false;
        }
      });
  }

  /**
   * Carrega mais Pokémons para paginação infinita
   */
  loadMorePokemons(event: any) {
    this.currentOffset += this.pageSize;
    this.pokemonService.getPokemonListWithDetails(this.currentOffset, this.pageSize)
      .subscribe({
        next: (pokemons) => {
          this.pokemons = [...this.pokemons, ...pokemons];
          this.filterPokemons();
          event.target.complete();
        },
        error: (error) => {
          console.error('Erro ao carregar mais Pokémons:', error);
          event.target.complete();
        }
      });
  }

  /**
   * Filtra os Pokémons baseado no termo de busca
   */
  filterPokemons() {
    if (this.searchTerm.trim() === '') {
      this.filteredPokemons = this.pokemons;
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  /**
   * Manipula a busca
   */
  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.filterPokemons();
  }

  /**
   * Navega para a página de detalhes do Pokémon
   */
  goToPokemonDetails(pokemon: PokemonDetails) {
    this.router.navigate(['/tabs/tab2', pokemon.id]);
  }

  /**
   * Alterna o status de favorito do Pokémon
   */
  toggleFavorite(pokemon: PokemonDetails, event: Event) {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(pokemon);
  }

  /**
   * Verifica se o Pokémon é favorito
   */
  isFavorite(pokemonId: number): boolean {
    return this.favoritesService.isFavorite(pokemonId);
  }

  /**
   * Obtém a cor do tipo do Pokémon
   */
  getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return typeColors[type] || '#68A090';
  }

  /**
   * Capitaliza a primeira letra
   */
  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
