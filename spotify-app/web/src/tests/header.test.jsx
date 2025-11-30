import {render, screen} from "@testing-library/react";
import Header from "../components/header";

test('header image is loaded', () => {
    render(<Header loggedIn={false} userData={null}></Header>)
    expect(screen.getByAltText("Spoootify Logo")).toBeInDocument;
})