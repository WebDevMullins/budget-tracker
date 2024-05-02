// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from 'drizzle-orm'
import {
	integer,
	numeric,
	pgTableCreator,
	primaryKey,
	serial,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `budget-tracker_${name}`)

export const Category = createTable('category', {
	name: varchar('name', { length: 256 }).notNull().unique(),
	icon: varchar('icon', { length: 256 }).notNull(),
	type: varchar('type', { length: 256 })
		.notNull()
		.unique()
		.default(sql`'income'::varchar`),
	userId: varchar('user_id', { length: 256 }).notNull().unique(),
	createdAt: timestamp('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
})

export const Transaction = createTable('transaction', {
	id: serial('id').primaryKey(),
	createdAt: timestamp('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),

	amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
	description: varchar('description', { length: 256 }).notNull(),
	date: varchar('date', { length: 256 }).notNull(),
	type: varchar('type', { length: 256 })
		.notNull()
		.default(sql`'income'::varchar`),
	userId: varchar('user_id', { length: 256 }).notNull(),

	category: varchar('category_id', { length: 256 }).notNull(),
	categoryIcon: varchar('category_icon', { length: 256 }).notNull()
})

export const UserSettings = createTable('user_settings', {
	userId: varchar('user_id', { length: 256 }).primaryKey(),
	currency: varchar('currency', { length: 256 }),
	createdAt: timestamp('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
})

export const MonthHistory = createTable(
	'month_history',
	{
		userId: varchar('user_id', { length: 256 }),
		day: integer('day').notNull(),
		month: integer('month').notNull(),
		year: integer('year').notNull(),
		income: numeric('income', { precision: 10, scale: 2 }).notNull(),
		expense: numeric('expense', { precision: 10, scale: 2 }).notNull()
	},
	(month) => {
		return {
			pk: primaryKey({
				columns: [month.userId, month.day, month.month, month.year]
			})
		}
	}
)

export const YearHistory = createTable(
	'year_history',
	{
		userId: varchar('user_id', { length: 256 }),
		month: integer('month').notNull(),
		year: integer('year').notNull(),
		income: numeric('income', { precision: 10, scale: 2 }).notNull(),
		expense: numeric('expense', { precision: 10, scale: 2 }).notNull()
	},
	(year) => {
		return {
			pk: primaryKey({
				columns: [year.userId, year.month, year.year]
			})
		}
	}
)
