'use client'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo, { LogoMobile } from '@/components/Logo'
import { ModeToggle } from '@/components/ModeToggle'
import { Button, buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

function Navbar() {
	return (
		<>
			<DesktopNavbar />
			<MobileNavbar />
		</>
	)
}

const links = [
	{ label: 'Dashboard', href: '/' },
	{ label: 'Transactions', href: '/transactions' },
	{ label: 'Manage', href: '/manage' }
]

function MobileNavbar() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='bg-background block border-separate md:hidden'>
			<nav className='container flex items-center justify-between px-8'>
				<Sheet
					open={isOpen}
					onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button
							variant={'ghost'}
							size={'icon'}>
							<MenuIcon />
						</Button>
					</SheetTrigger>
					<SheetContent
						className='w-[400px] sm:w-[540px]'
						side='left'>
						<Logo />
						<div className='flex flex-col gap-1 pt-4'>
							{links.map((link) => (
								<NavbarLink
									key={link.label}
									link={link.href}
									label={link.label}
									clickCallback={() => setIsOpen((prev) => !prev)}
								/>
							))}
						</div>
					</SheetContent>
				</Sheet>
				<div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
					<LogoMobile />
				</div>
				<div className='flex items-center gap-2'>
					<ModeToggle />
					<UserButton />
				</div>
			</nav>
		</div>
	)
}

function DesktopNavbar() {
	return (
		<div className='bg-background hidden border-separate border-b md:block'>
			<nav className='container flex items-center justify-between px-8'>
				<div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
					<Logo />
					<div className='flex h-full'>
						{links.map((link) => (
							<NavbarLink
								key={link.label}
								link={link.href}
								label={link.label}
							/>
						))}
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<ModeToggle />
					<UserButton />
				</div>
			</nav>
		</div>
	)
}

function NavbarLink({
	link,
	label,
	clickCallback
}: {
	link: string
	label: string
	clickCallback?: () => void
}) {
	const pathname = usePathname()
	const isActive = pathname === link

	return (
		<div className='relative flex items-center'>
			<Link
				href={link}
				className={cn(
					buttonVariants({ variant: 'ghost' }),
					'text-muted-foreground hover:text-foreground w-full justify-start text-lg',
					isActive && 'text-foreground'
				)}
				onClick={() => {
					if (clickCallback) clickCallback()
				}}>
				{label}
			</Link>
			{isActive && (
				<div className='bg-foreground absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl md:block' />
			)}
		</div>
	)
}

export default Navbar
