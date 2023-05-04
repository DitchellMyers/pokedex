interface PokemonSearchResponse {
  count: number
  results: PokemonBasic[]
}

interface PokemonBasic {
  name: string
  url: string
}
