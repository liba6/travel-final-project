export type Place = {
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  website: string;
  web_url: string;
  phone: string;
  isClicked: boolean;
  photo: {
    images: {
      large: {
        url: string;
      };
    };
  };
};

export type WeatherData = {
  current: {
    temp: number;
    weather: {
      icon: string;
    }[];
  };
};

export type Favorites = {
  id: number;
  attraction: string;
  address: string;
  website: string;
  phone: string;
  userId: number;
}[];

export type User = {
  id: number;
  username: string;
};
