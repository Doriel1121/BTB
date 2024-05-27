interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface Resident {
  url: string; // URL of the resident character
}

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Resident[];
  url: string;
  created: string;
}

interface RickAndMortyLocationResponse {
  info: Info;
  results: Location[];
}

export default RickAndMortyLocationResponse;
