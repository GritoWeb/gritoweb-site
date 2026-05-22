import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_latest_posts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Blog',
  	\`title\` text DEFAULT '*Últimos posts* do blog',
  	\`button_label\` text DEFAULT 'Ver todos os posts',
  	\`button_href\` text DEFAULT '/posts',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_posts_order_idx\` ON \`pages_blocks_latest_posts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_posts_parent_id_idx\` ON \`pages_blocks_latest_posts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_posts_path_idx\` ON \`pages_blocks_latest_posts\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_latest_portfolios\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Portfólio',
  	\`title\` text DEFAULT '*Últimos projetos* que entregamos',
  	\`button_label\` text DEFAULT 'Ver portfólio completo',
  	\`button_href\` text DEFAULT '/portfolio',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_portfolios_order_idx\` ON \`pages_blocks_latest_portfolios\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_portfolios_parent_id_idx\` ON \`pages_blocks_latest_portfolios\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_portfolios_path_idx\` ON \`pages_blocks_latest_portfolios\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_latest_posts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Blog',
  	\`title\` text DEFAULT '*Últimos posts* do blog',
  	\`button_label\` text DEFAULT 'Ver todos os posts',
  	\`button_href\` text DEFAULT '/posts',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_latest_posts_order_idx\` ON \`_pages_v_blocks_latest_posts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_latest_posts_parent_id_idx\` ON \`_pages_v_blocks_latest_posts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_latest_posts_path_idx\` ON \`_pages_v_blocks_latest_posts\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_latest_portfolios\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Portfólio',
  	\`title\` text DEFAULT '*Últimos projetos* que entregamos',
  	\`button_label\` text DEFAULT 'Ver portfólio completo',
  	\`button_href\` text DEFAULT '/portfolio',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_latest_portfolios_order_idx\` ON \`_pages_v_blocks_latest_portfolios\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_latest_portfolios_parent_id_idx\` ON \`_pages_v_blocks_latest_portfolios\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_latest_portfolios_path_idx\` ON \`_pages_v_blocks_latest_portfolios\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`portfolios_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`portfolios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolios_process_steps_order_idx\` ON \`portfolios_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_process_steps_parent_id_idx\` ON \`portfolios_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`portfolios_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`label\` text,
  	\`accent\` text DEFAULT 'blue',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`portfolios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolios_gallery_order_idx\` ON \`portfolios_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_gallery_parent_id_idx\` ON \`portfolios_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_gallery_image_idx\` ON \`portfolios_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`portfolios_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`portfolios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolios_stats_order_idx\` ON \`portfolios_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_stats_parent_id_idx\` ON \`portfolios_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`portfolios_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`role\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`portfolios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolios_team_order_idx\` ON \`portfolios_team\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_team_parent_id_idx\` ON \`portfolios_team\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`portfolios_stack\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tool\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`portfolios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolios_stack_order_idx\` ON \`portfolios_stack\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_stack_parent_id_idx\` ON \`portfolios_stack\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`portfolios_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`portfolios_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`portfolios\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`portfolios_id\`) REFERENCES \`portfolios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolios_rels_order_idx\` ON \`portfolios_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_rels_parent_idx\` ON \`portfolios_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_rels_path_idx\` ON \`portfolios_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_rels_portfolios_id_idx\` ON \`portfolios_rels\` (\`portfolios_id\`);`)
  await db.run(sql`CREATE TABLE \`_portfolios_v_version_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_portfolios_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_process_steps_order_idx\` ON \`_portfolios_v_version_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_process_steps_parent_id_idx\` ON \`_portfolios_v_version_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_portfolios_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`label\` text,
  	\`accent\` text DEFAULT 'blue',
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_portfolios_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_gallery_order_idx\` ON \`_portfolios_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_gallery_parent_id_idx\` ON \`_portfolios_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_gallery_image_idx\` ON \`_portfolios_v_version_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_portfolios_v_version_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_portfolios_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_stats_order_idx\` ON \`_portfolios_v_version_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_stats_parent_id_idx\` ON \`_portfolios_v_version_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_portfolios_v_version_team\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`role\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_portfolios_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_team_order_idx\` ON \`_portfolios_v_version_team\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_team_parent_id_idx\` ON \`_portfolios_v_version_team\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_portfolios_v_version_stack\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tool\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_portfolios_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_stack_order_idx\` ON \`_portfolios_v_version_stack\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_stack_parent_id_idx\` ON \`_portfolios_v_version_stack\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_portfolios_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`portfolios_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_portfolios_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`portfolios_id\`) REFERENCES \`portfolios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_portfolios_v_rels_order_idx\` ON \`_portfolios_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_rels_parent_idx\` ON \`_portfolios_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_rels_path_idx\` ON \`_portfolios_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_rels_portfolios_id_idx\` ON \`_portfolios_v_rels\` (\`portfolios_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud_partners\` ADD \`logo_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_logo_cloud_partners_logo_idx\` ON \`pages_blocks_home_section_logo_cloud_partners\` (\`logo_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud_partners\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud_partners\` DROP COLUMN \`glyph\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud_partners\` ADD \`logo_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_logo_cloud_partners_logo_idx\` ON \`_pages_v_blocks_home_section_logo_cloud_partners\` (\`logo_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud_partners\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud_partners\` DROP COLUMN \`glyph\`;`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`site_url\` text;`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`next_project_href\` text;`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`sector\` text;`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`deliverables\` text;`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`duration\` text;`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`challenge_title\` text;`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`challenge_body\` text;`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`quote_text\` text;`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`quote_author\` text;`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`quote_role\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_site_url\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_next_project_href\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_sector\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_deliverables\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_duration\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_challenge_title\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_challenge_body\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_quote_text\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_quote_author\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_quote_role\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud_locales\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud_locales\` DROP COLUMN \`title\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_latest_posts\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_latest_portfolios\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_latest_posts\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_latest_portfolios\`;`)
  await db.run(sql`DROP TABLE \`portfolios_process_steps\`;`)
  await db.run(sql`DROP TABLE \`portfolios_gallery\`;`)
  await db.run(sql`DROP TABLE \`portfolios_stats\`;`)
  await db.run(sql`DROP TABLE \`portfolios_team\`;`)
  await db.run(sql`DROP TABLE \`portfolios_stack\`;`)
  await db.run(sql`DROP TABLE \`portfolios_rels\`;`)
  await db.run(sql`DROP TABLE \`_portfolios_v_version_process_steps\`;`)
  await db.run(sql`DROP TABLE \`_portfolios_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_portfolios_v_version_stats\`;`)
  await db.run(sql`DROP TABLE \`_portfolios_v_version_team\`;`)
  await db.run(sql`DROP TABLE \`_portfolios_v_version_stack\`;`)
  await db.run(sql`DROP TABLE \`_portfolios_v_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_home_section_logo_cloud_partners\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`glyph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_logo_cloud\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_home_section_logo_cloud_partners\`("_order", "_parent_id", "id", "name", "glyph") SELECT "_order", "_parent_id", "id", "name", "glyph" FROM \`pages_blocks_home_section_logo_cloud_partners\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_logo_cloud_partners\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_home_section_logo_cloud_partners\` RENAME TO \`pages_blocks_home_section_logo_cloud_partners\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_logo_cloud_partners_order_idx\` ON \`pages_blocks_home_section_logo_cloud_partners\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_logo_cloud_partners_parent_id_idx\` ON \`pages_blocks_home_section_logo_cloud_partners\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_home_section_logo_cloud_partners\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`glyph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_logo_cloud\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_home_section_logo_cloud_partners\`("_order", "_parent_id", "id", "name", "glyph", "_uuid") SELECT "_order", "_parent_id", "id", "name", "glyph", "_uuid" FROM \`_pages_v_blocks_home_section_logo_cloud_partners\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_logo_cloud_partners\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_home_section_logo_cloud_partners\` RENAME TO \`_pages_v_blocks_home_section_logo_cloud_partners\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_logo_cloud_partners_order_idx\` ON \`_pages_v_blocks_home_section_logo_cloud_partners\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_logo_cloud_partners_parent_id_idx\` ON \`_pages_v_blocks_home_section_logo_cloud_partners\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud_locales\` ADD \`title\` text DEFAULT 'Empresas que *confiam* na gente';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud_locales\` ADD \`title\` text DEFAULT 'Empresas que *confiam* na gente';`)
  await db.run(sql`ALTER TABLE \`portfolios\` DROP COLUMN \`site_url\`;`)
  await db.run(sql`ALTER TABLE \`portfolios\` DROP COLUMN \`next_project_href\`;`)
  await db.run(sql`ALTER TABLE \`portfolios\` DROP COLUMN \`sector\`;`)
  await db.run(sql`ALTER TABLE \`portfolios\` DROP COLUMN \`deliverables\`;`)
  await db.run(sql`ALTER TABLE \`portfolios\` DROP COLUMN \`duration\`;`)
  await db.run(sql`ALTER TABLE \`portfolios\` DROP COLUMN \`challenge_title\`;`)
  await db.run(sql`ALTER TABLE \`portfolios\` DROP COLUMN \`challenge_body\`;`)
  await db.run(sql`ALTER TABLE \`portfolios\` DROP COLUMN \`quote_text\`;`)
  await db.run(sql`ALTER TABLE \`portfolios\` DROP COLUMN \`quote_author\`;`)
  await db.run(sql`ALTER TABLE \`portfolios\` DROP COLUMN \`quote_role\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`version_site_url\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`version_next_project_href\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`version_sector\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`version_deliverables\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`version_duration\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`version_challenge_title\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`version_challenge_body\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`version_quote_text\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`version_quote_author\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`version_quote_role\`;`)
}
