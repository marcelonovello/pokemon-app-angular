import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon, PokemonListResponse, PokemonDetails, PokemonSpecies } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  /**
   * Busca uma lista paginada de Pokémons
   * @param offset Número de itens para pular
   * @param limit Número de itens por página
   */
  getPokemonList(offset: number = 0, limit: number = 20): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
  }

  /**
   * Busca os detalhes de um Pokémon específico
   * @param nameOrId Nome ou ID do Pokémon
   */
  getPokemonDetails(nameOrId: string | number): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/pokemon/${nameOrId}`);
  }

  /**
   * Busca informações da espécie do Pokémon (descrições, habitat, etc.)
   * @param nameOrId Nome ou ID do Pokémon
   */
  getPokemonSpecies(nameOrId: string | number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${this.baseUrl}/pokemon-species/${nameOrId}`);
  }

  /**
   * Busca detalhes completos do Pokémon incluindo informações da espécie
   * @param nameOrId Nome ou ID do Pokémon
   */
  getCompletePokemonInfo(nameOrId: string | number): Observable<{details: PokemonDetails, species: PokemonSpecies}> {
    return forkJoin({
      details: this.getPokemonDetails(nameOrId),
      species: this.getPokemonSpecies(nameOrId)
    });
  }

  /**
   * Busca uma lista de Pokémons com seus detalhes básicos
   * @param offset Número de itens para pular
   * @param limit Número de itens por página
   */
  getPokemonListWithDetails(offset: number = 0, limit: number = 20): Observable<PokemonDetails[]> {
    return this.getPokemonList(offset, limit).pipe(
      switchMap(response => {
        const detailRequests = response.results.map(pokemon => 
          this.getPokemonDetails(pokemon.name)
        );
        return forkJoin(detailRequests);
      })
    );
  }

  /**
   * Extrai o ID do Pokémon a partir da URL
   * @param url URL do Pokémon
   */
  extractPokemonId(url: string): number {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? parseInt(matches[1], 10) : 0;
  }

  /**
   * Busca Pokémons por tipo
   * @param type Tipo do Pokémon (ex: fire, water, grass)
   */
  getPokemonByType(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/type/${type}`);
  }

  /**
   * Busca informações sobre um tipo específico
   * @param type Nome do tipo
   */
  getTypeInfo(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/type/${type}`);
  }
}

