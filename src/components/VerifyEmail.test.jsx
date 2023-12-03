import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import VeifyEmail from "./VeifyEmail";

import store from "../context/Index.jsx";
import { Provider } from "react-redux";

describe("<VerifyEmail>", () => {
  test("ve component test", () => {
    render(
      <Provider store={store}>
        <VeifyEmail />
      </Provider>
    );
    const helloWorldElement = screen.getByText("Send Link", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });
});
