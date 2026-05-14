import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_portfolio_listing\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Portfólio',
  	\`title\` text DEFAULT '*Projetos* que colocamos pra rodar',
  	\`show_filters\` integer DEFAULT true,
  	\`show_view_toggle\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_portfolio_listing_order_idx\` ON \`pages_blocks_portfolio_listing\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_portfolio_listing_parent_id_idx\` ON \`pages_blocks_portfolio_listing\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_portfolio_listing_path_idx\` ON \`pages_blocks_portfolio_listing\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_portfolio_listing\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Portfólio',
  	\`title\` text DEFAULT '*Projetos* que colocamos pra rodar',
  	\`show_filters\` integer DEFAULT true,
  	\`show_view_toggle\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_portfolio_listing_order_idx\` ON \`_pages_v_blocks_portfolio_listing\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_portfolio_listing_parent_id_idx\` ON \`_pages_v_blocks_portfolio_listing\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_portfolio_listing_path_idx\` ON \`_pages_v_blocks_portfolio_listing\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`portfolios\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`client\` text,
  	\`summary\` text,
  	\`image_id\` integer,
  	\`tag_id\` integer,
  	\`tag_variant\` text DEFAULT 'blue',
  	\`accent\` text DEFAULT 'blue',
  	\`year\` text,
  	\`result\` text,
  	\`published_at\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tag_id\`) REFERENCES \`portfolio_tags\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolios_image_idx\` ON \`portfolios\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_tag_idx\` ON \`portfolios\` (\`tag_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`portfolios_slug_idx\` ON \`portfolios\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_updated_at_idx\` ON \`portfolios\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`portfolios_created_at_idx\` ON \`portfolios\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`portfolios__status_idx\` ON \`portfolios\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_portfolios_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_client\` text,
  	\`version_summary\` text,
  	\`version_image_id\` integer,
  	\`version_tag_id\` integer,
  	\`version_tag_variant\` text DEFAULT 'blue',
  	\`version_accent\` text DEFAULT 'blue',
  	\`version_year\` text,
  	\`version_result\` text,
  	\`version_published_at\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`portfolios\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tag_id\`) REFERENCES \`portfolio_tags\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_portfolios_v_parent_idx\` ON \`_portfolios_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_version_image_idx\` ON \`_portfolios_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_version_tag_idx\` ON \`_portfolios_v\` (\`version_tag_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_version_slug_idx\` ON \`_portfolios_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_version_updated_at_idx\` ON \`_portfolios_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_version_created_at_idx\` ON \`_portfolios_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_version_version__status_idx\` ON \`_portfolios_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_created_at_idx\` ON \`_portfolios_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_updated_at_idx\` ON \`_portfolios_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_latest_idx\` ON \`_portfolios_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_autosave_idx\` ON \`_portfolios_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`portfolio_tags\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`portfolio_tags_slug_idx\` ON \`portfolio_tags\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_tags_updated_at_idx\` ON \`portfolio_tags\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_tags_created_at_idx\` ON \`portfolio_tags\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`portfolios_id\` integer REFERENCES portfolios(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`portfolio_tags_id\` integer REFERENCES portfolio_tags(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_portfolios_id_idx\` ON \`payload_locked_documents_rels\` (\`portfolios_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_portfolio_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`portfolio_tags_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_portfolio_listing\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_portfolio_listing\`;`)
  await db.run(sql`DROP TABLE \`portfolios\`;`)
  await db.run(sql`DROP TABLE \`_portfolios_v\`;`)
  await db.run(sql`DROP TABLE \`portfolio_tags\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "pages_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "pages_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
}
