import { Favorites, Place } from '../../app/types';
import Filter from '../filter';

const favorites: Favorites = [
  {
    id: 1,
    attraction: 'Jewish museum',
    address: '123 abc street',
    website: 'museum website',
    phone: '123-456-7890',
    userId: 6,
  },
  {
    id: 2,
    attraction: 'soccer stadium',
    address: '44 Green Bay Trail',
    website: 'soccer website',
    phone: '987-654-3210',
    userId: 8,
  },
];

const places: Place[] = [
  {
    name: 'Amusement park',
    latitude: '22.9419',
    longitude: '40.6689',
    address: '33 george street',
    website: 'ameuse website',
    web_url: 'expedia amuse',
    phone: '123-456-1190',
    isClicked: true,
    photo: {
      images: {
        large: {
          url: 'amuse photo',
        },
      },
    },
  },
  {
    name: 'Jewish museum',
    latitude: '22.9419',
    longitude: '40.6689',
    address: '123 abc street',
    website: 'museum website',
    web_url: 'expedia museum',
    phone: '123-456-7890',
    isClicked: true,
    photo: {
      images: {
        large: {
          url: 'museum photo',
        },
      },
    },
  },
  {
    name: 'basketball hall',
    latitude: '71.9419',
    longitude: '10.6689',
    address: '89 def street',
    website: 'bb website',
    web_url: 'expedia bb',
    phone: '123-456-3890',
    isClicked: true,
    photo: {
      images: {
        large: {
          url: 'bb photo',
        },
      },
    },
  },
];

const notAMatch = Filter(places, [
  {
    id: 1,
    attraction: 'Hot Dog Stand',
    address: '124 abc street',
    website: 'hot dog website',
    phone: '123-996-7890',
    userId: 6,
  },
]);

test('Filter function', () => {
  // test if returns place that's in favorites
  expect(Filter(places, favorites)).toEqual([
    {
      name: 'Jewish museum',
      latitude: '22.9419',
      longitude: '40.6689',
      address: '123 abc street',
      website: 'museum website',
      web_url: 'expedia museum',
      phone: '123-456-7890',
      isClicked: true,
      photo: {
        images: {
          large: {
            url: 'museum photo',
          },
        },
      },
    },
  ]);

  // test that doesn't return wrong place
  expect(Filter(places, favorites)).not.toEqual([
    {
      name: 'Amusement park',
      latitude: '22.9419',
      longitude: '40.6689',
      address: '33 george street',
      website: 'ameuse website',
      web_url: 'expedia amuse',
      phone: '123-456-1190',
      isClicked: true,
      photo: {
        images: {
          large: {
            url: 'amuse photo',
          },
        },
      },
    },
  ]);

  // test if returns empty array if no match

  expect(notAMatch).toEqual([]);
});
