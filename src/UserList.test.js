//1 - Shows one line per user
//2 - Shows the correct name and email for each user

import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

const users = [
    {name: 'Jane', email: 'jane@mail.com'},
    {name: 'Sam', email: 'sam@mail.com'}
];

function componentRender () {
    // Render the component
    render(<UserList users={users} />);
}

// runs before each test
beforeEach(()=> {});

test('render one row per use', () => {
    componentRender();

    // Find all the rows in the table
    //screen.logTestingPlaygroundURL(); - presents a link to inspect the HTML and get suggested queries

    const rows = within(screen.getByTestId('users')).getAllByRole('row');

    // Assertion: correct number of rows in the table
    expect(rows).toHaveLength(2);
});

test('render the email and the name of each user', () => {
    componentRender();

    for(let user of users){
        const name = screen.getByRole('cell', {name: user.name});
        const email = screen.getByRole('cell', {name: user.email});

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }

});