import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud_partners\` ADD \`logo_id\` integer;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_logo_cloud_partners_logo_idx\` ON \`pages_blocks_home_section_logo_cloud_partners\` (\`logo_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud_partners\` DROP COLUMN \`glyph\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud\` DROP COLUMN \`title\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud\` ADD \`title\` text DEFAULT 'Empresas que *confiam* na gente';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud_partners\` ADD \`glyph\` text;`)
  await db.run(sql`DROP INDEX IF EXISTS \`pages_blocks_home_section_logo_cloud_partners_logo_idx\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud_partners\` DROP COLUMN \`logo_id\`;`)
}
