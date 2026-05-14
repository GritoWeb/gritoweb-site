import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'orange',
  	\`eyebrow\` text DEFAULT 'Próximo passo',
  	\`title_main\` text DEFAULT 'Tem um projeto',
  	\`title_secondary\` text DEFAULT 'em mente?',
  	\`title_secondary_color\` text DEFAULT 'blue',
  	\`description\` text,
  	\`cta1_label\` text DEFAULT 'Agendar uma call',
  	\`cta1_href\` text DEFAULT '#',
  	\`cta1_variant\` text DEFAULT 'blue',
  	\`cta2_label\` text DEFAULT 'Baixar portfólio (PDF)',
  	\`cta2_href\` text DEFAULT '#',
  	\`cta2_variant\` text DEFAULT 'white',
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_cta_order_idx\` ON \`pages_blocks_home_section_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_cta_parent_id_idx\` ON \`pages_blocks_home_section_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_cta_path_idx\` ON \`pages_blocks_home_section_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_cta_image_idx\` ON \`pages_blocks_home_section_cta\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'orange',
  	\`eyebrow\` text DEFAULT 'Próximo passo',
  	\`title_main\` text DEFAULT 'Tem um projeto',
  	\`title_secondary\` text DEFAULT 'em mente?',
  	\`title_secondary_color\` text DEFAULT 'blue',
  	\`description\` text,
  	\`cta1_label\` text DEFAULT 'Agendar uma call',
  	\`cta1_href\` text DEFAULT '#',
  	\`cta1_variant\` text DEFAULT 'blue',
  	\`cta2_label\` text DEFAULT 'Baixar portfólio (PDF)',
  	\`cta2_href\` text DEFAULT '#',
  	\`cta2_variant\` text DEFAULT 'white',
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_cta_order_idx\` ON \`_pages_v_blocks_home_section_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_cta_parent_id_idx\` ON \`_pages_v_blocks_home_section_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_cta_path_idx\` ON \`_pages_v_blocks_home_section_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_cta_image_idx\` ON \`_pages_v_blocks_home_section_cta\` (\`image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_cta\`;`)
}
