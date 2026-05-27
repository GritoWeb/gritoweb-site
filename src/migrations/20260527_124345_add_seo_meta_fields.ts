import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_locales\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`pages_locales\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_locales\` ADD \`version_meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_locales\` ADD \`version_meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`portfolios_meta_meta_image_idx\` ON \`portfolios\` (\`meta_image_id\`);`)
  await db.run(sql`ALTER TABLE \`portfolios_locales\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`portfolios_locales\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_meta_version_meta_image_idx\` ON \`_portfolios_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_portfolios_v_locales\` ADD \`version_meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v_locales\` ADD \`version_meta_description\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_type\` text DEFAULT 'defaultHero',
  	\`hero_title_max_width\` text DEFAULT 'none',
  	\`hero_cta1_href\` text,
  	\`hero_cta2_href\` text,
  	\`hero_hero_image_id\` integer,
  	\`published_at\` text,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages\`("id", "hero_type", "hero_title_max_width", "hero_cta1_href", "hero_cta2_href", "hero_hero_image_id", "published_at", "slug", "updated_at", "created_at", "_status") SELECT "id", "hero_type", "hero_title_max_width", "hero_cta1_href", "hero_cta2_href", "hero_hero_image_id", "published_at", "slug", "updated_at", "created_at", "_status" FROM \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_hero_image_idx\` ON \`pages\` (\`hero_hero_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_hero_type\` text DEFAULT 'defaultHero',
  	\`version_hero_title_max_width\` text DEFAULT 'none',
  	\`version_hero_cta1_href\` text,
  	\`version_hero_cta2_href\` text,
  	\`version_hero_hero_image_id\` integer,
  	\`version_published_at\` text,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v\`("id", "parent_id", "version_hero_type", "version_hero_title_max_width", "version_hero_cta1_href", "version_hero_cta2_href", "version_hero_hero_image_id", "version_published_at", "version_slug", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_hero_type", "version_hero_title_max_width", "version_hero_cta1_href", "version_hero_cta2_href", "version_hero_hero_image_id", "version_published_at", "version_slug", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v\` RENAME TO \`_pages_v\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_version_hero_hero_image_idx\` ON \`_pages_v\` (\`version_hero_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`__new_portfolios\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`client\` text,
  	\`image_id\` integer,
  	\`tag_id\` integer,
  	\`tag_variant\` text DEFAULT 'blue',
  	\`accent\` text DEFAULT 'blue',
  	\`year\` text,
  	\`result\` text,
  	\`site_url\` text,
  	\`next_project_href\` text,
  	\`published_at\` text,
  	\`sector\` text,
  	\`deliverables\` text,
  	\`duration\` text,
  	\`challenge_title\` text,
  	\`challenge_body\` text,
  	\`quote_text\` text,
  	\`quote_author\` text,
  	\`quote_role\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tag_id\`) REFERENCES \`portfolio_tags\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_portfolios\`("id", "client", "image_id", "tag_id", "tag_variant", "accent", "year", "result", "site_url", "next_project_href", "published_at", "sector", "deliverables", "duration", "challenge_title", "challenge_body", "quote_text", "quote_author", "quote_role", "generate_slug", "slug", "updated_at", "created_at", "_status") SELECT "id", "client", "image_id", "tag_id", "tag_variant", "accent", "year", "result", "site_url", "next_project_href", "published_at", "sector", "deliverables", "duration", "challenge_title", "challenge_body", "quote_text", "quote_author", "quote_role", "generate_slug", "slug", "updated_at", "created_at", "_status" FROM \`portfolios\`;`)
  await db.run(sql`DROP TABLE \`portfolios\`;`)
  await db.run(sql`ALTER TABLE \`__new_portfolios\` RENAME TO \`portfolios\`;`)
  await db.run(sql`CREATE INDEX \`portfolios_image_idx\` ON \`portfolios\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_tag_idx\` ON \`portfolios\` (\`tag_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`portfolios_slug_idx\` ON \`portfolios\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_updated_at_idx\` ON \`portfolios\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_created_at_idx\` ON \`portfolios\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`portfolios__status_idx\` ON \`portfolios\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__portfolios_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_client\` text,
  	\`version_image_id\` integer,
  	\`version_tag_id\` integer,
  	\`version_tag_variant\` text DEFAULT 'blue',
  	\`version_accent\` text DEFAULT 'blue',
  	\`version_year\` text,
  	\`version_result\` text,
  	\`version_site_url\` text,
  	\`version_next_project_href\` text,
  	\`version_published_at\` text,
  	\`version_sector\` text,
  	\`version_deliverables\` text,
  	\`version_duration\` text,
  	\`version_challenge_title\` text,
  	\`version_challenge_body\` text,
  	\`version_quote_text\` text,
  	\`version_quote_author\` text,
  	\`version_quote_role\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`portfolios\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tag_id\`) REFERENCES \`portfolio_tags\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__portfolios_v\`("id", "parent_id", "version_client", "version_image_id", "version_tag_id", "version_tag_variant", "version_accent", "version_year", "version_result", "version_site_url", "version_next_project_href", "version_published_at", "version_sector", "version_deliverables", "version_duration", "version_challenge_title", "version_challenge_body", "version_quote_text", "version_quote_author", "version_quote_role", "version_generate_slug", "version_slug", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_client", "version_image_id", "version_tag_id", "version_tag_variant", "version_accent", "version_year", "version_result", "version_site_url", "version_next_project_href", "version_published_at", "version_sector", "version_deliverables", "version_duration", "version_challenge_title", "version_challenge_body", "version_quote_text", "version_quote_author", "version_quote_role", "version_generate_slug", "version_slug", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_portfolios_v\`;`)
  await db.run(sql`DROP TABLE \`_portfolios_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__portfolios_v\` RENAME TO \`_portfolios_v\`;`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_parent_idx\` ON \`_portfolios_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_version_image_idx\` ON \`_portfolios_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_version_tag_idx\` ON \`_portfolios_v\` (\`version_tag_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_version_slug_idx\` ON \`_portfolios_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_version_updated_at_idx\` ON \`_portfolios_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_version_created_at_idx\` ON \`_portfolios_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_version__status_idx\` ON \`_portfolios_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_created_at_idx\` ON \`_portfolios_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_updated_at_idx\` ON \`_portfolios_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_snapshot_idx\` ON \`_portfolios_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_published_locale_idx\` ON \`_portfolios_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_latest_idx\` ON \`_portfolios_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_autosave_idx\` ON \`_portfolios_v\` (\`autosave\`);`)
  await db.run(sql`ALTER TABLE \`pages_locales\` DROP COLUMN \`meta_title\`;`)
  await db.run(sql`ALTER TABLE \`pages_locales\` DROP COLUMN \`meta_description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_locales\` DROP COLUMN \`version_meta_title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_locales\` DROP COLUMN \`version_meta_description\`;`)
  await db.run(sql`ALTER TABLE \`portfolios_locales\` DROP COLUMN \`meta_title\`;`)
  await db.run(sql`ALTER TABLE \`portfolios_locales\` DROP COLUMN \`meta_description\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v_locales\` DROP COLUMN \`version_meta_title\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v_locales\` DROP COLUMN \`version_meta_description\`;`)
}
