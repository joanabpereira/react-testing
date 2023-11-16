import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

test('can receive a new user and show it on a list', async () => {
    render(<App />);

    const nameInput = screen.getByRole('textbox', {
        name: /name/i
    });

    const emailInput = screen.getByRole('textbox', {
        name: /e-mail/i
    });

    const button = screen.getByRole('button');

    await user.click(nameInput);
    await user.keyboard('jane');

    await user.click(emailInput);
    await user.keyboard('jane@mail.com');

    await user.click(button);

    //screen.debug();

    const name = screen.getByRole('cell', {name: 'jane'});
    const email = screen.getByRole('cell', {name: 'jane@mail.com'});

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();

})
