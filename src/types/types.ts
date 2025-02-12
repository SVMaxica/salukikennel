// src/types/types.ts
export interface Parent {
  name: string;
  titles: string[];
}

export interface Puppy {
  name: string;
  image: string[];
  titles: string[];
  owners: string;
  hometown: string;
  results: string[];
}

export interface Litter {
  litter: string;
  image: string[];
  date_of_birth: string;
  bitches: number;
  dog_puppies: number;
  parents: {
    sire: Parent;
    dam: Parent;
  };
  puppies: Puppy[];
}

export interface Testimonial {
  id: number;
  image: string;
  name: string;
  message: string;
}

export interface Data {
  testimonials: Testimonial[];
  litters: Litter[];
}

export interface Dog {
  name: string;
  titles: string[];
  images: string[];
  birthdate: string;
  link_to_posts: string;
  parents: {
    sire: {
      name: string;
      titles: string[];
    };
    dam: {
      name: string;
      titles: string[];
    };
  };
  health: string[];
  results: string[];
  about: string;
}
