import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonAlert,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { heart, heartDislike, trash, eye, refresh, sad } from 'ionicons/icons';

import { FavoritesService } from '../services/favorite.service';
import { PokemonDetails } from '../models/pokemon.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonAlert,
    IonFab,
    IonFabButton
  ],
})
export class Tab3Page implements OnInit, OnDestroy {
  favorites: PokemonDetails[] = [];
  private favoritesSubscription: Subscription = new Subscription();
  isAlertOpen = false;
  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Limpar',
      role: 'confirm',
      handler: () => {
        this.clearAllFavorites();
      },
    },
  ];

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {
    addIcons({ heart, heartDislike, trash, eye, refresh, sad });
  }

  ngOnInit() {
    this.favoritesSubscription = this.favoritesService.favorites$.subscribe(
      favorites => {
        this.favorites = favorites;
      }
    );
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
  }

  /**
   * Navega para os detalhes do Pokémon
   */
  goToPokemonDetails(pokemon: PokemonDetails) {
    this.router.navigate(['/tabs/tab2', pokemon.id]);
  }

  /**
   * Remove um Pokémon dos favoritos
   */
  removeFromFavorites(pokemon: PokemonDetails) {
    this.favoritesService.removeFromFavorites(pokemon.id);
  }

  /**
   * Limpa todos os favoritos
   */
  clearAllFavorites() {
    this.favoritesService.clearFavorites();
  }

  /**
   * Abre o alerta de confirmação para limpar favoritos
   */
  openClearAlert() {
    this.isAlertOpen = true;
  }

  /**
   * Navega para a tela principal
   */
  goToMainPage() {
    this.router.navigate(['/tabs/tab1']);
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

  /**
   * Obtém estatísticas dos favoritos
   */
  getFavoritesStats() {
    if (this.favorites.length === 0) return null;

    const types: string[] = [];
    this.favorites.forEach((pokemon: PokemonDetails) => {
      pokemon.types.forEach((type: any) => {
        types.push(type.type.name);
      });
    });
    
    const typeCount: { [key: string]: number } = {};
    types.forEach((type: string) => {
      typeCount[type] = (typeCount[type] || 0) + 1;
    });

    const mostCommonType = Object.entries(typeCount)
      .sort(([,a], [,b]) => b - a)[0];

    const averageHeight = this.favorites.reduce((sum: number, pokemon: PokemonDetails) => 
      sum + pokemon.height, 0) / this.favorites.length / 10;

    const averageWeight = this.favorites.reduce((sum: number, pokemon: PokemonDetails) => 
      sum + pokemon.weight, 0) / this.favorites.length / 10;

    return {
      total: this.favorites.length,
      mostCommonType: mostCommonType ? {
        name: mostCommonType[0],
        count: mostCommonType[1]
      } : null,
      averageHeight: Math.round(averageHeight * 10) / 10,
      averageWeight: Math.round(averageWeight * 10) / 10
    };
  }
}
