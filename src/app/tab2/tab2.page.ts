import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonSpinner,
  IonProgressBar,
  IonChip,
  IonAvatar,
  IonList,
  IonListHeader,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { heart, heartOutline, arrowBack, statsChart, information, images, colorPalette } from 'ionicons/icons';

import { PokemonService } from '../services/pokemon.service';
import { FavoritesService } from '../services/favorite.service';
import { PokemonDetails, PokemonSpecies } from '../models/pokemon.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonSpinner,
    IonProgressBar,
    IonChip,
    IonAvatar,
    IonList,
    IonListHeader,
    IonBackButton,
    IonButtons
  ]
})
export class Tab2Page implements OnInit {
  pokemon: PokemonDetails | null = null;
  pokemonSpecies: PokemonSpecies | null = null;
  isLoading = false;
  pokemonId: string | null = null;
  selectedImageIndex = 0;
  availableImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService
  ) {
    addIcons({ heart, heartOutline, arrowBack, statsChart, information, images, colorPalette });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.pokemonId = params.get('id');
      if (this.pokemonId) {
        this.loadPokemonDetails(this.pokemonId);
      }
    });
  }

  /**
   * Carrega os detalhes completos do Pokémon
   */
  loadPokemonDetails(id: string) {
    this.isLoading = true;
    this.pokemonService.getCompletePokemonInfo(id).subscribe({
      next: (data) => {
        this.pokemon = data.details;
        this.pokemonSpecies = data.species;
        this.setupImages();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes do Pokémon:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Configura as imagens disponíveis do Pokémon
   */
  setupImages() {
    if (!this.pokemon) return;
    
    this.availableImages = [];
    const sprites = this.pokemon.sprites;
    
    // Imagem oficial
    if (sprites.other['official-artwork'].front_default) {
      this.availableImages.push(sprites.other['official-artwork'].front_default);
    }
    
    // Dream World
    if (sprites.other.dream_world.front_default) {
      this.availableImages.push(sprites.other.dream_world.front_default);
    }
    
    // Sprites normais
    if (sprites.front_default) this.availableImages.push(sprites.front_default);
    if (sprites.back_default) this.availableImages.push(sprites.back_default);
    if (sprites.front_shiny) this.availableImages.push(sprites.front_shiny);
    if (sprites.back_shiny) this.availableImages.push(sprites.back_shiny);
  }

  /**
   * Navega entre as imagens
   */
  changeImage(direction: number) {
    this.selectedImageIndex += direction;
    if (this.selectedImageIndex < 0) {
      this.selectedImageIndex = this.availableImages.length - 1;
    } else if (this.selectedImageIndex >= this.availableImages.length) {
      this.selectedImageIndex = 0;
    }
  }

  /**
   * Volta para a tela anterior
   */
  goBack() {
    this.location.back();
  }

  /**
   * Alterna o status de favorito
   */
  toggleFavorite() {
    if (this.pokemon) {
      this.favoritesService.toggleFavorite(this.pokemon);
    }
  }

  /**
   * Verifica se é favorito
   */
  isFavorite(): boolean {
    return this.pokemon ? this.favoritesService.isFavorite(this.pokemon.id) : false;
  }

  /**
   * Obtém a cor do tipo
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
   * Capitaliza texto
   */
  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /**
   * Obtém a descrição em português
   */
  getPortugueseDescription(): string {
    if (!this.pokemonSpecies) return '';
    
    const ptEntry = this.pokemonSpecies.flavor_text_entries.find(
      entry => entry.language.name === 'pt' || entry.language.name === 'pt-BR'
    );
    
    if (ptEntry) {
      return ptEntry.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ');
    }
    
    // Fallback para inglês
    const enEntry = this.pokemonSpecies.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    
    return enEntry ? enEntry.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ') : '';
  }

  /**
   * Obtém o gênero em português
   */
  getPortugueseGenus(): string {
    if (!this.pokemonSpecies) return '';
    
    const ptGenus = this.pokemonSpecies.genera.find(
      genus => genus.language.name === 'pt' || genus.language.name === 'pt-BR'
    );
    
    if (ptGenus) {
      return ptGenus.genus;
    }
    
    // Fallback para inglês
    const enGenus = this.pokemonSpecies.genera.find(
      genus => genus.language.name === 'en'
    );
    
    return enGenus ? enGenus.genus : '';
  }

  /**
   * Calcula a porcentagem de um stat
   */
  getStatPercentage(statValue: number): number {
    return Math.min((statValue / 255) * 100, 100);
  }

  /**
   * Obtém a cor da barra de stat
   */
  getStatColor(statValue: number): string {
    if (statValue >= 100) return 'success';
    if (statValue >= 70) return 'warning';
    return 'danger';
  }
}
