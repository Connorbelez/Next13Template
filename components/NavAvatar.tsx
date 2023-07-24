"use client"
import {  DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,} from "@nextui-org/react";

import {NavbarContent, NavbarItem} from "@nextui-org/navbar";

import {useSession} from "next-auth/react";
import {Link} from "@nextui-org/link";
import {signIn, signOut} from "next-auth/react";
import {Button} from "@nextui-org/button";
export function NavAvatar() {
	const {data: session} = useSession();
	const user = session?.user;
	const username = user?.name;
	const userEmail = user?.email;
	const userImage = user?.image;

	if (!session) {
		return (
			<NavbarContent justify="end">
				<NavbarItem>
					<Button
						onPress={() => signIn("google")}
						variant="flat" color="primary"
					>
						Sign In
					</Button>
				</NavbarItem>
			</NavbarContent>
		)
	}

	return (
		<NavbarContent justify="end">
			<Dropdown placement="bottom-end">
				<NavbarItem >
					<DropdownTrigger>
						<Avatar
							isBordered
							as="button"
							className="transition-transform"
							color="secondary"
							name={username || ""}
							size="sm"
							src={userImage || ""}
						/>
					</DropdownTrigger>
				</NavbarItem>
				<DropdownMenu aria-label="Profile Actions" variant="flat">
					<DropdownItem key="profile" className="h-14 gap-2">
						<p className="font-semibold">Signed in as</p>
						<p className="font-semibold">{userEmail}</p>
					</DropdownItem>
					<DropdownItem key="settings">My Settings</DropdownItem>
					<DropdownItem key="logout" color="danger" onClick={() => signOut()}>
						<Link color={"danger"} onClick={() => signOut()}>
							Log Out
						</Link>

					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</NavbarContent>
	)
}