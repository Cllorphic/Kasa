import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from './Carousel';

jest.mock('next/image', () => {
  return function MockImage({ alt, ...props }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  };
});

describe('Carousel', () => {
  const multipleImages = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];
  const singleImage = ['/img1.jpg'];

  it("n'affiche rien si pas d'images valides", () => {
    render(<Carousel images={[]} title="Test" />);
    expect(screen.getByAlt('Test - photo 1 sur 1')).toBeInTheDocument();
  });

  it("affiche l'image sans flèches quand il n'y a qu'une image", () => {
    render(<Carousel images={singleImage} title="Test" />);
    expect(screen.getByAlt('Test - photo 1 sur 1')).toBeInTheDocument();
    expect(screen.queryByLabelText('Photo précédente')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Photo suivante')).not.toBeInTheDocument();
  });

  it('affiche les flèches quand il y a plusieurs images', () => {
    render(<Carousel images={multipleImages} title="Test" />);
    expect(screen.getByLabelText('Photo précédente')).toBeInTheDocument();
    expect(screen.getByLabelText('Photo suivante')).toBeInTheDocument();
  });

  it("navigue vers l'image suivante", () => {
    render(<Carousel images={multipleImages} title="Test" />);
    expect(screen.getByAlt('Test - photo 1 sur 3')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Photo suivante'));
    expect(screen.getByAlt('Test - photo 2 sur 3')).toBeInTheDocument();
  });

  it("navigue vers l'image précédente", () => {
    render(<Carousel images={multipleImages} title="Test" />);
    fireEvent.click(screen.getByLabelText('Photo précédente'));
    expect(screen.getByAlt('Test - photo 3 sur 3')).toBeInTheDocument();
  });

  it('boucle de la dernière à la première image', () => {
    render(<Carousel images={multipleImages} title="Test" />);
    fireEvent.click(screen.getByLabelText('Photo suivante'));
    fireEvent.click(screen.getByLabelText('Photo suivante'));
    fireEvent.click(screen.getByLabelText('Photo suivante'));
    expect(screen.getByAlt('Test - photo 1 sur 3')).toBeInTheDocument();
  });

  it('boucle de la première à la dernière image', () => {
    render(<Carousel images={multipleImages} title="Test" />);
    fireEvent.click(screen.getByLabelText('Photo précédente'));
    expect(screen.getByAlt('Test - photo 3 sur 3')).toBeInTheDocument();
  });

  it("affiche le compteur d'images", () => {
    render(<Carousel images={multipleImages} title="Test" />);
    expect(screen.getByText('1/3')).toBeInTheDocument();
  });
});