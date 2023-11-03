"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.image && session.user?.name && <Avatar src={session.user.image} /> }
        <button color="foreground" onClick={() => signOut()}>
          Sign Out
        </button>
      </>
    );
  }
  return (
    <>
      <button color="foreground"onClick={() => signIn()}>
        Sign In
      </button>
    </>
  );
}

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
            <div>
              <AuthButton />
            </div>
        </NavbarContent>
      </Navbar>
    );
  }

export default CustomNavbar;
