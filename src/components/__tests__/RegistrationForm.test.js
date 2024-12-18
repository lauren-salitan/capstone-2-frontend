import { render, fireEvent, screen } from '@testing-library/react';
import RegistrationForm from '../RegistrationForm';
import axios from 'axios';

jest.mock('axios');

test('renders registration form and validates empty fields', () => {
    render(<RegistrationForm setIsLoggedIn={() => {}} />);

    fireEvent.click(screen.getByText('Register'));

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

test('registers a user successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { token: 'test-token' } });

    render(<RegistrationForm setIsLoggedIn={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'StrongPass123!' } });
    fireEvent.click(screen.getByText('Register'));

    expect(axios.post).toHaveBeenCalledWith('/api/users/register', {
        username: 'testuser',
        password: 'StrongPass123!',
    });
});
