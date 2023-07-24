import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";

import {  DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,
} from "@nextui-org/react";



import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import {NavAvatar} from "@/components/NavAvatar";
import {NavCenterCluster} from "@/components/NavCenterCluster";

export const Navbar = () => {
	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	return (
		<NextUINavbar maxWidth="xl" position="sticky"
		// 			  classNames={{
		// 	item: [
		// 		"data-[active=true]:after:content-['']",
		// 		"data-[active=true]:after:absolute",
		// 		"data-[active=true]:after:bottom-0",
		// 		"data-[active=true]:after:left-0",
		// 		"data-[active=true]:after:right-0",
		// 		"data-[active=true]:after:h-[2px]",
		// 		"data-[active=true]:after:rounded-[2px]",
		// 		"data-[active=true]:after:bg-primary",
		// 	],
		// }}
		>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">ACME</p>
					</NextLink>
				</NavbarBrand>
				{/*<ul className="hidden lg:flex gap-4 justify-start ml-2">*/}
				{/*	{siteConfig.navItems.map((item) => (*/}
				{/*		<NavbarItem key={item.href}>*/}
				{/*			<NextLink*/}
				{/*				className={clsx(*/}
				{/*					linkStyles({ color: "foreground" }),*/}
				{/*					"data-[active=true]:text-primary data-[active=true]:font-medium"*/}
				{/*				)}*/}
				{/*				color="foreground"*/}
				{/*				href={item.href}*/}
				{/*			>*/}
				{/*				{item.label}*/}
				{/*			</NextLink>*/}
				{/*		</NavbarItem>*/}
				{/*	))}*/}
				{/*</ul>*/}
			</NavbarContent>

			<NavCenterCluster></NavCenterCluster>

			<NavbarContent className="basis-2/5 hidden sm:flex justify-end" justify="end">
				<NavbarItem>
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem>
					<NavAvatar />
				</NavbarItem>
			</NavbarContent>


			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{searchInput}
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
										? "danger"
										: "foreground"
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
