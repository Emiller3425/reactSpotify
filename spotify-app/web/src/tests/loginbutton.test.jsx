import {render, screen} from "@testing-library/react";
import LoginButton from "../components/loginbutton";

test('displays login button', () => {
    render(<LoginButton displayText="Login"/>)
    expect(screen.getByText('Login')).toBeInDocument;
})