import { ClerkProvider } from '@clerk/nextjs'

import RootProviders from '@/components/providers/RootProviders'

import '@/styles/globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans'
})

export const metadata = {
	title: 'Budget Tracker',
	description: 'Keep track of your finances',
	icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html
				lang='en'
				className='dark'
				style={{ colorScheme: 'dark' }}>
				<body className={`font-sans ${inter.variable}`}>
					<RootProviders>{children}</RootProviders>
				</body>
			</html>
		</ClerkProvider>
	)
}
