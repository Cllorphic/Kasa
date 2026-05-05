import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FavoritesProvider, useFavorites } from './FavoritesContext';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value; },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Composant de test
function TestComponent() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  return (
    <div>
      <p data-testid="count">{favorites.length}</p>
      <p data-testid="is-fav-1">{isFavorite('prop-1') ? 'oui' : 'non'}</p>
      <p data-testid="is-fav-2">{isFavorite('prop-2') ? 'oui' : 'non'}</p>
      <button onClick={() => toggleFavorite('prop-1')}>Toggle 1</button>
      <button onClick={() => toggleFavorite('prop-2')}>Toggle 2</button>
    </div>
  );
}

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('commence avec aucun favori', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('non');
  });

  it('ajoute un favori quand on clique', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    fireEvent.click(screen.getByText('Toggle 1'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('oui');
  });

  it('retire un favori quand on reclique', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    fireEvent.click(screen.getByText('Toggle 1'));
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('oui');
    fireEvent.click(screen.getByText('Toggle 1'));
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('non');
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('gère plusieurs favoris', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    fireEvent.click(screen.getByText('Toggle 1'));
    fireEvent.click(screen.getByText('Toggle 2'));
    expect(screen.getByTestId('count')).toHaveTextContent('2');
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('oui');
    expect(screen.getByTestId('is-fav-2')).toHaveTextContent('oui');
  });

  it('sauvegarde les favoris dans localStorage', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    fireEvent.click(screen.getByText('Toggle 1'));
    const saved = JSON.parse(localStorageMock.getItem('favorites'));
    expect(saved).toContain('prop-1');
  });

  it('charge les favoris depuis localStorage', () => {
    localStorageMock.setItem('favorites', JSON.stringify(['prop-1', 'prop-2']));
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    expect(screen.getByTestId('count')).toHaveTextContent('2');
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('oui');
    expect(screen.getByTestId('is-fav-2')).toHaveTextContent('oui');
  });
});