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
