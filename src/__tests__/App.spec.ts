import { test, expect } from "vitest";
import { pinia, vuetify } from "@/plugins";
import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/vue";
import App from "../App.vue";
import router from "@/router";

const renderApp = (Comp) => {
  return render(Comp, {
    global: {
      plugins: [pinia, vuetify, router],
    },
  });
};

const user = userEvent.setup();

test("renders the application", async () => {
  router.push("/");
  await router.isReady();
  renderApp(App);
  expect(await screen.findByText(/WED-MIX-1/i)).toBeInTheDocument();
  expect(screen.getByText(/25%/i)).toBeInTheDocument();
  expect(screen.getByText(/De Other Koffie Place/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /itinerary/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /proceed/i })).toBeInTheDocument();
  expect(
    screen.getByText(/Jan Evertsen straat 136 1056 EK Amsterdam/i)
  ).toBeInTheDocument();
});

describe("Itenarary screen", () => {
  beforeEach(async () => {
    router.push("/");
    await router.isReady();
    renderApp(App);
    expect(await screen.findByText(/WED-MIX-1/i)).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /itinerary/i });
    await user.click(button);
    expect(await screen.findByText(/Review orders/i)).toBeInTheDocument();
  });

  test("renders screen", async () => {
    expect(
      screen.getByRole("button", { name: /next stop/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: /pickup/i }).length).toEqual(
      2
    );
  });

  test("increase or decrese the quantity", async () => {
    const parent = screen.getByTestId("koffiedrab");
    expect(parent).toBeInTheDocument();
    expect(within(parent).getByTestId("quantity-view").textContent).toEqual(
      "1"
    );

    // increase quatity
    await user.click(within(parent).getByTestId("increase-quantity-btn"));
    await user.click(within(parent).getByTestId("increase-quantity-btn"));
    expect(within(parent).getByTestId("quantity-view").textContent).toEqual(
      "3"
    );

    await user.click(within(parent).getByTestId("reduce-quantity-btn"));
    expect(within(parent).getByTestId("quantity-view").textContent).toEqual(
      "2"
    );
  });
});
