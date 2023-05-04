interface PokemonPageProps {
  params: {
    slug: string
  }
}

async function getData(slug: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`)

  return res.json()
}

export default async function PokemonPage({ params: { slug } }: PokemonPageProps) {
  const data = await getData(slug)

  console.log(data)

  return <div>Pokemon</div>
}
