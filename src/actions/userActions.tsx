'use server'

import { db } from '@/server/db'
import { UserSettings } from '@/server/db/schema'

export const getUser = async () => {
	const data = await db.select().from(UserSettings)
	return data
}
