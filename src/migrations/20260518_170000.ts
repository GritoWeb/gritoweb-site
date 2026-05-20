import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud_partners\` ADD \`logo_id\` integer;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_logo_cloud_partners_logo_idx\` ON \`_pages_v_blocks_home_section_logo_cloud_partners\` (\`logo_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud_partners\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud_partners\` DROP COLUMN \`glyph\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud\` DROP COLUMN \`title\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud\` ADD \`title\` text DEFAULT 'Empresas que *confiam* na gente';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud_partners\` ADD \`glyph\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud_partners\` ADD \`name\` text;`)
  await db.run(sql`DROP INDEX IF EXISTS \`_pages_v_blocks_home_section_logo_cloud_partners_logo_idx\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud_partners\` DROP COLUMN \`logo_id\`;`)
}
