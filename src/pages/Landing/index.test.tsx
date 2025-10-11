import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import Landing from ".";
import { describe, it, beforeEach, expect } from "vitest";

const setup = () => {
  render(
    <MemoryRouter> 
      <Landing />
    </MemoryRouter>
  );
};

describe("Landing", () => {
  beforeEach(() => {
    setup();
  });

  it("renders main heading and subtitle", () => {
    expect(screen.getByText(/encuentra tu/i)).toBeInTheDocument();
    expect(
      screen.getByText(/la plataforma líder para comprar/i)
    ).toBeInTheDocument();
  });

  it("renders 'Explorar Autos' button", () => {
    expect(screen.getByRole("button", { name: /Entrá y explorá/i })).toBeInTheDocument();
  });

  it("renders all LandingCard titles and partial legends", () => {
    expect(screen.getByText("Seguridad Garantizada")).toBeInTheDocument();
    expect(screen.getByText("Red de Agencias")).toBeInTheDocument();
    expect(screen.getByText("Experiencia Premium")).toBeInTheDocument();

    expect(screen.getByText(/verificamos todos los vehículos/i)).toBeInTheDocument();
    expect(screen.getByText(/conectamos con las mejores agencias/i)).toBeInTheDocument();
    expect(screen.getByText(/interfaz intuitiva, búsqueda avanzada/i)).toBeInTheDocument();
  });

  it("renders 'Crear Cuenta Gratis' button in CTA section", () => {
    expect(screen.getByRole("button", { name: /crear cuenta gratis/i })).toBeInTheDocument();
  });

  it("renders footer with contact info and service buttons", () => {
    expect(screen.getByText(/contacto@cta.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+1 \(555\) 123-4567/i)).toBeInTheDocument();
    expect(screen.getByText(/lunes a viernes 9-18hs/i)).toBeInTheDocument();
  });
});
