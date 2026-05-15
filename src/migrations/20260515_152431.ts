import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add unified title column
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` ADD \`title\` text;`)

  // Migrate existing data: combine titleMain + titleSecondary into *secondary* syntax
  await db.run(
    sql`UPDATE \`pages_blocks_home_section_cta\` SET \`title\` = \`title_main\` || '\n' || '*' || \`title_secondary\` || '*' WHERE \`title_main\` IS NOT NULL AND \`title_secondary\` IS NOT NULL;`,
  )
  await db.run(
    sql`UPDATE \`pages_blocks_home_section_cta\` SET \`title\` = \`title_main\` WHERE \`title_main\` IS NOT NULL AND \`title_secondary\` IS NULL;`,
  )
  await db.run(
    sql`UPDATE \`_pages_v_blocks_home_section_cta\` SET \`title\` = \`title_main\` || '\n' || '*' || \`title_secondary\` || '*' WHERE \`title_main\` IS NOT NULL AND \`title_secondary\` IS NOT NULL;`,
  )
  await db.run(
    sql`UPDATE \`_pages_v_blocks_home_section_cta\` SET \`title\` = \`title_main\` WHERE \`title_main\` IS NOT NULL AND \`title_secondary\` IS NULL;`,
  )

  // Drop old columns
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` DROP COLUMN \`title_main\`;`)
  await db.run(
    sql`ALTER TABLE \`pages_blocks_home_section_cta\` DROP COLUMN \`title_secondary\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`pages_blocks_home_section_cta\` DROP COLUMN \`title_secondary_color\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` DROP COLUMN \`title_main\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` DROP COLUMN \`title_secondary\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` DROP COLUMN \`title_secondary_color\`;`,
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` ADD \`title_main\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` ADD \`title_secondary\` text;`)
  await db.run(
    sql`ALTER TABLE \`pages_blocks_home_section_cta\` ADD \`title_secondary_color\` text DEFAULT 'blue';`,
  )
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` ADD \`title_main\` text;`)
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` ADD \`title_secondary\` text;`,
  )
  await db.run(
    sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` ADD \`title_secondary_color\` text DEFAULT 'blue';`,
  )
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` DROP COLUMN \`title\`;`)
}
