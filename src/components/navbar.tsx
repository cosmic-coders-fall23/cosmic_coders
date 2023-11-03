"use client";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Avatar,
    Select,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {Button} from "@nextui-org/button";
import {useContext} from "react";
import { UserContext } from '@/components/usercontext';
import AuthService from "@/services/authservice";

function CustomNavbar() {
    const {user} = useContext(UserContext);

    const logout = async () => {
        await AuthService.logout()
        window.location.reload()
    }

    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">COSMIC CODERS</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/game">
                        Game
                    </Link>
                </NavbarItem>
            </NavbarContent>
            
            {user.username !== "" ? (
                <NavbarContent justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <div className="flex gap-3 items-center">
                                <Avatar
                                    isBordered
                                    size="sm"
                                    as="button"
                                    className="transition-transform"
                                    name={user.username}
                                />
                                <p className="font-semibold cursor-pointer">{user.username}</p>
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{user.email}</p>
                            </DropdownItem>
                            <DropdownItem onClick={() => logout()} key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            ) : (
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link href="/login">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/signup" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            )}
        </Navbar>
    )
}

export default CustomNavbar;