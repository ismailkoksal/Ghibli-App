export interface People {
  id: string;
  name: string;
  gender: Gender;
  age: string;
  eyeColor: string;
  hairColor: string;
  films: string[];
  species: string;
  url: string;
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Na = 'NA',
}
