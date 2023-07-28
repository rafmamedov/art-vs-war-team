export interface Artist {
  aboutMe: string;
  city: string;
  cognitoSubject: string;
  country: string;
  fullName: string;
  imageUrl: string;
  prettyId: string;
  styles: string[];
}

export interface ArtistsCollection {
  total: number;
  content: Artist[];
}