"use client"
import {useRouter} from "next/navigation"

import {  DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import { usePathname } from 'next/navigation'
import { link as linkStyles } from "@nextui-org/theme";
import {NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {Button} from "@nextui-org/button"
import {ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale} from "./navIcons.jsx";
import {siteConfig} from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
export function NavCenterCluster() {

	// @ts-ignore
	const icons = {
		chevron: <ChevronDown fill="currentColor" size={16} />,
		scale: <Scale className="text-warning" fill="currentColor" size={30} />,
		lock: <Lock className="text-success" fill="currentColor" size={30} />,
		activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
		flash: <Flash className="text-primary" fill="currentColor" size={30} />,
		server: <Server className="text-success" fill="currentColor" size={30} />,
		user: <TagUser className="text-danger" fill="currentColor" size={30} />,
	};
	let pathname = usePathname();

	return (
		<NavbarContent className="hidden sm:flex gap-4" justify="center">
			<Dropdown>
				<NavbarItem>
					<DropdownTrigger>
						<Button
							disableRipple
							className="p-0 bg-transparent data-[hover=true]:bg-transparent"
							endContent={icons.chevron}
							radius="sm"
							variant="light"
						>
							Features
						</Button>
					</DropdownTrigger>
				</NavbarItem>
				<DropdownMenu
					aria-label="ACME features"
					className="w-[340px]"
					itemClasses={{
						base: "gap-4",
					}}
				>
					<DropdownItem
						key="autoscaling"
						description="ACME scales apps to meet user demand, automagically, based on load."
						startContent={icons.scale}
					>
						Autoscaling
					</DropdownItem>
					<DropdownItem
						key="usage_metrics"
						description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
						startContent={icons.activity}
					>
						Usage Metrics
					</DropdownItem>
					<DropdownItem
						key="production_ready"
						description="ACME runs on ACME, join us and others serving requests at web scale."
						startContent={icons.flash}
					>
						Production Ready
					</DropdownItem>
					<DropdownItem
						key="99_uptime"
						description="Applications stay on the grid with high availability and high uptime guarantees."
						startContent={icons.server}
					>
						+99% Uptime
					</DropdownItem>
					<DropdownItem
						key="supreme_support"
						description="Overcome any challenge with a supporting team ready to respond."
						startContent={icons.user}
					>
						+Supreme Support
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<ul className="hidden lg:flex gap-4 justify-start ml-2">
				{siteConfig.navItems.map((item) => (
					<NavbarItem key={item.href} isActive={pathname === item.href} className={"data-[active=true]:text-primary data-[active=true]:bg-primary data-[active=true]:rounded-[2px] data-[active=true]:h-[2px] data-[active=true]:bottom-0"}>
						<NextLink
							className={clsx(
								linkStyles({ color: "foreground" }),
								"data-[active=true]:text-primary  data-[active=true]:font-medium"
							)}

							// key={index}
							color="foreground"
							href={item.href}
						>
							{item.label}
						</NextLink>
					</NavbarItem>
				))}
			</ul>
		</NavbarContent>
	)
}