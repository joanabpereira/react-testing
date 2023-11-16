import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";


// 1 - Show two inputs & one button
test('it show two inputs and one button', () => {
    // render the component
    render(<UserForm />);

    // manipulate the component or find an element in it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    // make an assertion - make sure the component is doing what we excpect it to do
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
});

// 2 - Entering a name & e-mail then submitting the form causes the "onUserAdd" callback to be called
test('it calls onUserAdd when the form is submitted', async () => {
    const mock = jest.fn();

    // try to render the component
    render(<UserForm onUserAdd={mock}/>);

    // find the two inputs
    // this test is brittle - easy to break - if we swap the order, this breaks
    //const [nameInput, emailInput] = screen.getAllByRole('textbox');

    const nameInput = screen.getByRole('textbox', {
        name: /name/i
    });

    const emailInput = screen.getByRole('textbox', {
        name: /e-mail/i
    });

    // simulate typing the name
    await user.click(nameInput);
    await user.keyboard('jane');

    // simulate typing the email
    await user.click(emailInput);
    await user.keyboard('jane@mail.com');

    // Find the button
    const button = screen.getByRole('button');

    // simulate clicking the button
    await user.click(button);

    //assertion to make sure 'onUserAdd' gets called with name/email
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({name: 'jane', email:'jane@mail.com'});
});

test('empties the two inputs when form is submitted', async ()=>{
    render(<UserForm onUserAdd={()=>{}}/>);

    const nameInput = screen.getByRole('textbox', {
        name: /name/i
    });
    const emailInput = screen.getByRole('textbox', {
        name: /e-mail/i
    });

    await user.click(nameInput);
    await user.keyboard('jane');

    await user.click(emailInput);
    await user.keyboard('jane@mail.com');

    const button = screen.getByRole('button');
    await user.click(button);

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');

})