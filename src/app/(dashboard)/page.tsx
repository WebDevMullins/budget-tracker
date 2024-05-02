import { getUser } from '@/actions/userActions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Page() {
	const user = await currentUser()

	if (!user) {
		redirect('/sign-in')
	}

	const data = await getUser()

	return (
		<main className='flex min-h-screen flex-col items-center justify-center '>
			<h1 className='text-3xl'>{user?.firstName}</h1>
			<h2>{data.map((user) => user.currency)}</h2>
		</main>
	)
}
