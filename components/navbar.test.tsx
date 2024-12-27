import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './navbar';
import getCategories from '../actions/get-categories';

// Define the specific type for categories
type Category = {
  id: number;
  name: string;
};

// Mock dependencies
jest.mock('../actions/get-categories', () => jest.fn());

jest.mock('./main-nav', () => {
  const MainNav = ({ data }: { data: Category[] }) => <nav>{data ? data.map((cat) => <span key={cat.id}>{cat.name}</span>) : null}</nav>;
  MainNav.displayName = 'MainNav';
  return MainNav;
});

jest.mock('./navbar-actions', () => {
  const NavbarActions = () => <div>Navbar Actions</div>;
  NavbarActions.displayName = 'NavbarActions';
  return NavbarActions;
});

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders fallback UI when fetch fails', async () => {
    (getCategories as jest.Mock).mockRejectedValue(new Error('Failed to fetch categories'));

    render(<Navbar />);

    // Ensure the component renders without crashing
    expect(screen.getByText('Store')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith('Failed to fetch categories:', expect.any(Error));
  });

  it('handles empty categories gracefully', async () => {
    (getCategories as jest.Mock).mockResolvedValue([]);

    render(<Navbar />);

    expect(await screen.findByText('Store')).toBeInTheDocument();
    expect(screen.queryByText('Category 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Category 2')).not.toBeInTheDocument();
  });

  it('renders fallback UI when fetch fails', async () => {
    (getCategories as jest.Mock).mockRejectedValue(new Error('Failed to fetch categories'));

    render(<Navbar />);

    expect(screen.getByText('Store')).toBeInTheDocument();
    // Add any fallback content checks if applicable
  });
});
