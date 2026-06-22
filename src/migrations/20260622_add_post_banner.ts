import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` ADD \`post_banner_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`posts_post_banner_idx\` ON \`posts\` (\`post_banner_id\`);`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_post_banner_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_post_banner_idx\` ON \`_posts_v\` (\`version_post_banner_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX IF EXISTS \`posts_post_banner_idx\`;`)
  await db.run(sql`DROP INDEX IF EXISTS \`_posts_v_version_post_banner_idx\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`post_banner_id\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_post_banner_id\`;`)
}
