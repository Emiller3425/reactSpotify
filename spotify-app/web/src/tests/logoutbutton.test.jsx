import {render, screen} from "@testing-library/react";
import LogoutButton from "../components/logoutbutton.jsx";
import { CookiesProvider } from "react-cookie";

test('displays logout button', () => {
    render(
    <CookiesProvider>
        <LogoutButton displayText="Logout"/>
    </CookiesProvider>
    )
    expect(screen.getByText('Logout')).toBeInDocument;
})