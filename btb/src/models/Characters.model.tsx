import { Character } from "./Character.model";

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface RickAndMortyCharacters {
  info: Info;
  results: Character[];
}

export default RickAndMortyCharacters;
