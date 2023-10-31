"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { Link } from "@nextui-org/link";

function CustomNavbar() {
  return (
      <Navbar className="space-navbar">
          <NavbarContent className="space-invaders-container">
              <NavbarBrand>
                  <Link color="foreground" href="/">
                      Home
                  </Link>
              </NavbarBrand>
              <NavbarBrand>
                  <Link color="foreground" href="/game">
                      Game
                  </Link>
              </NavbarBrand>
          </NavbarContent>
      </Navbar>
  );
}

export default CustomNavbar;
