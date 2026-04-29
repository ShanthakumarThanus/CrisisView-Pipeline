import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Home from '../../app/page';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe('Tests de Snapshot - Home Page', () => {
  test('la page d\'accueil correspond au snapshot', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});