"use client";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
  } from "@nextui-org/react";
  import { Link } from "@nextui-org/link";
  import { Button } from "@nextui-org/button";
  
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
          <NavbarContent justify="end">
            <NavbarBrand>
              <Link href="/login" className="cool-link">
                Login
              </Link>
            </NavbarBrand>
            <NavbarBrand>
              <Button as={Link} color="primary" href="/signup" variant="flat" className="cool-button">
                Sign Up
              </Button>
            </NavbarBrand>
          </NavbarContent>
        </NavbarContent>
      </Navbar>
    );
  }
  
  export default CustomNavbar;
  