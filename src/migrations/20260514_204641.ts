import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_type\` text DEFAULT 'defaultHero';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_hero_title\` text DEFAULT 'Sites que *gritam*,
  negócios que *escalam*.';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_hero_description\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_cta1_label\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_cta1_href\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_cta2_label\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_cta2_href\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_hero_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_type\` text DEFAULT 'defaultHero';`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_hero_title\` text DEFAULT 'Sites que *gritam*,
  negócios que *escalam*.';`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_hero_description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_cta1_label\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_cta1_href\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_cta2_label\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_cta2_href\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_hero_image_id\` integer REFERENCES media(id);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
}
