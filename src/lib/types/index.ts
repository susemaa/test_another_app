type Service = {
  id: number,
  head: number | null,
  name: string,
  node: 0 | 1,
  price: number,
  sorthead: number,
}

interface Data {
  services: Array<Service>;
}

type Tree = Service & {
  children?: Tree[];
}

export type { Data, Service, Tree };
