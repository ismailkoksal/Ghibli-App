export interface People {
  id: string;
  name: string;
  gender: Gender;
  age: string;
  eye_color: string;
  hair_color: string;
  films: string[];
  species: string;
  url: string;
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Na = 'NA',
}
