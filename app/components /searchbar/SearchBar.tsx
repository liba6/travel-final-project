'use client';

import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PlacesAutocomplete from 'react-places-autocomplete';
import styles from './page.module.scss';

type Props = {
  address: string;
  setAddress: (address: string) => void;
  onSelect: (address: string) => void;
};

export default function SearchBar({ address, setAddress, onSelect }: Props) {
  return (
    <AppBar position="static" className={styles.appbar}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h5" className={styles.title}>
          Attractions in {`${address} `}
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={styles.title} />

          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={onSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div className={styles.searchArea}>
                <div className={styles.searchIcon}>
                  <SearchIcon />
                </div>
                <input
                  {...getInputProps({
                    placeholder: 'Search A City',
                    className: 'location-search-input',
                  })}
                  className={styles.input}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    console.log('suggestion', suggestions);
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? {
                          backgroundColor: '#b4c6e7',
                          cursor: 'pointer',
                        }
                      : { backgroundColor: '#9cb1d2', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                        key={`suggestions-${suggestion.description}`}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
