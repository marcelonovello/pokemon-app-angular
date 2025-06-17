import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonDetails } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly FAVORITES_KEY = 'pokemon-favorites';
  private favoritesSubject = new BehaviorSubject<PokemonDetails[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  /* Carrega os favoritos do localStorage */
  private loadFavorites(): void {
    try {
      const stored = localStorage.getItem(this.FAVORITES_KEY);
      if (stored) {
        const favorites = JSON.parse(stored);
        this.favoritesSubject.next(favorites);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
      this.favoritesSubject.next([]);
    }
  }

  /* Salva os favoritos no localStorage */
  private saveFavorites(favorites: PokemonDetails[]): void {
    try {
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  }

  /**
   * Adiciona um Pokémon aos favoritos
   * @param pokemon Pokémon para adicionar aos favoritos
   */
  addToFavorites(pokemon: PokemonDetails): void {
    const currentFavorites = this.favoritesSubject.value;
    const isAlreadyFavorite = currentFavorites.some(fav => fav.id === pokemon.id);
    
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...currentFavorites, pokemon];
      this.saveFavorites(updatedFavorites);
    }
  }

  /**
   * Remove um Pokémon dos favoritos
   * @param pokemonId ID do Pokémon para remover
   */
  removeFromFavorites(pokemonId: number): void {
    const currentFavorites = this.favoritesSubject.value;
    const updatedFavorites = currentFavorites.filter(fav => fav.id !== pokemonId);
    this.saveFavorites(updatedFavorites);
  }

  /**
   * Verifica se um Pokémon está nos favoritos
   * @param pokemonId ID do Pokémon
   */
  isFavorite(pokemonId: number): boolean {
    return this.favoritesSubject.value.some(fav => fav.id === pokemonId);
  }

  /**
   * Alterna o status de favorito de um Pokémon
   * @param pokemon Pokémon para alternar o status
   */
  toggleFavorite(pokemon: PokemonDetails): void {
    if (this.isFavorite(pokemon.id)) {
      this.removeFromFavorites(pokemon.id);
    } else {
      this.addToFavorites(pokemon);
    }
  }

  /* Obtém todos os favoritos */
  getFavorites(): PokemonDetails[] {
    return this.favoritesSubject.value;
  }

  /* Limpa todos os favoritos */
  clearFavorites(): void {
    this.saveFavorites([]);
  }

  /* Obtém o número de favoritos */
  getFavoritesCount(): number {
    return this.favoritesSubject.value.length;
  }
}

