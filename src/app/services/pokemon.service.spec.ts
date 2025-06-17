import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { PokemonDetails, PokemonListResponse, PokemonSpecies } from '../models/pokemon.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  const mockPokemonListResponse: PokemonListResponse = {
    count: 1302,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
    ]
  };

  const mockPokemonDetails: PokemonDetails = {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    base_experience: 64,
    order: 1,
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
      back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        },
        dream_world: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
        }
      }
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'grass',
          url: 'https://pokeapi.co/api/v2/type/12/'
        }
      },
      {
        slot: 2,
        type: {
          name: 'poison',
          url: 'https://pokeapi.co/api/v2/type/4/'
        }
      }
    ],
    abilities: [
      {
        ability: {
          name: 'overgrow',
          url: 'https://pokeapi.co/api/v2/ability/65/'
        },
        is_hidden: false,
        slot: 1
      }
    ],
    stats: [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      },
      {
        base_stat: 49,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/'
        }
      }
    ],
    species: {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
    }
  };

  const mockPokemonSpecies: PokemonSpecies = {
    id: 1,
    name: 'bulbasaur',
    flavor_text_entries: [
      {
        flavor_text: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
        language: {
          name: 'en',
          url: 'https://pokeapi.co/api/v2/language/9/'
        }
      }
    ],
    genera: [
      {
        genus: 'Seed Pokémon',
        language: {
          name: 'en',
          url: 'https://pokeapi.co/api/v2/language/9/'
        }
      }
    ],
    habitat: {
      name: 'grassland',
      url: 'https://pokeapi.co/api/v2/pokemon-habitat/3/'
    },
    color: {
      name: 'green',
      url: 'https://pokeapi.co/api/v2/pokemon-color/5/'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPokemonList', () => {
    it('should return pokemon list with default parameters', () => {
      service.getPokemonList().subscribe(response => {
        expect(response).toEqual(mockPokemonListResponse);
        expect(response.results.length).toBe(2);
        expect(response.results[0].name).toBe('bulbasaur');
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemonListResponse);
    });

    it('should return pokemon list with custom parameters', () => {
      const offset = 40;
      const limit = 10;

      service.getPokemonList(offset, limit).subscribe(response => {
        expect(response).toEqual(mockPokemonListResponse);
      });

      const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemonListResponse);
    });
  });

  describe('getPokemonDetails', () => {
    it('should return pokemon details by name', () => {
      const pokemonName = 'bulbasaur';

      service.getPokemonDetails(pokemonName).subscribe(pokemon => {
        expect(pokemon).toEqual(mockPokemonDetails);
        expect(pokemon.name).toBe('bulbasaur');
        expect(pokemon.id).toBe(1);
        expect(pokemon.types.length).toBe(2);
      });

      const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemonDetails);
    });

    it('should return pokemon details by id', () => {
      const pokemonId = 1;

      service.getPokemonDetails(pokemonId).subscribe(pokemon => {
        expect(pokemon).toEqual(mockPokemonDetails);
        expect(pokemon.id).toBe(pokemonId);
      });

      const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemonDetails);
    });
  });

  describe('getPokemonSpecies', () => {
    it('should return pokemon species information', () => {
      const pokemonId = 1;

      service.getPokemonSpecies(pokemonId).subscribe(species => {
        expect(species).toEqual(mockPokemonSpecies);
        expect(species.name).toBe('bulbasaur');
        expect(species.habitat?.name).toBe('grassland');
      });

      const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemonSpecies);
    });
  });

  describe('getCompletePokemonInfo', () => {
    it('should return combined pokemon details and species', () => {
      const pokemonId = 1;

      service.getCompletePokemonInfo(pokemonId).subscribe(result => {
        expect(result.details).toEqual(mockPokemonDetails);
        expect(result.species).toEqual(mockPokemonSpecies);
      });

      const detailsReq = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const speciesReq = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);

      expect(detailsReq.request.method).toBe('GET');
      expect(speciesReq.request.method).toBe('GET');

      detailsReq.flush(mockPokemonDetails);
      speciesReq.flush(mockPokemonSpecies);
    });
  });

  describe('extractPokemonId', () => {
    it('should extract pokemon id from url', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/25/';
      const id = service.extractPokemonId(url);
      expect(id).toBe(25);
    });

    it('should return 0 for invalid url', () => {
      const url = 'invalid-url';
      const id = service.extractPokemonId(url);
      expect(id).toBe(0);
    });
  });

  describe('getPokemonListWithDetails', () => {
    it('should return pokemon list with details', () => {
      service.getPokemonListWithDetails(0, 2).subscribe(pokemons => {
        expect(pokemons.length).toBe(2);
        expect(pokemons[0]).toEqual(mockPokemonDetails);
      });

      // Expect list request
      const listReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=2');
      listReq.flush(mockPokemonListResponse);

      // Expect details requests for each pokemon
      const detailsReq1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
      const detailsReq2 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/ivysaur');

      detailsReq1.flush(mockPokemonDetails);
      detailsReq2.flush({ ...mockPokemonDetails, id: 2, name: 'ivysaur' });
    });
  });

  describe('error handling', () => {
    it('should handle HTTP errors gracefully', () => {
      service.getPokemonDetails('nonexistent').subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/nonexistent');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });
});

