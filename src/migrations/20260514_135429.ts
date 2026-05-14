import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`hst_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`author\` text,
  	\`role\` text,
  	\`avatar_variant\` text DEFAULT 'blue',
  	\`surface\` text DEFAULT 'paper',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`hst\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`hst_testimonials_order_idx\` ON \`hst_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`hst_testimonials_parent_id_idx\` ON \`hst_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`hst\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Depoimentos',
  	\`title\` text DEFAULT 'Quem trabalhou com a gente *volta*',
  	\`description\` text,
  	\`rating_value\` text DEFAULT '4,9 / 5,0',
  	\`review_count\` text DEFAULT '47 avaliações no Google',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`hst_order_idx\` ON \`hst\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`hst_parent_id_idx\` ON \`hst\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`hst_path_idx\` ON \`hst\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_hst_v_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`author\` text,
  	\`role\` text,
  	\`avatar_variant\` text DEFAULT 'blue',
  	\`surface\` text DEFAULT 'paper',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_hst_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_hst_v_testimonials_order_idx\` ON \`_hst_v_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_hst_v_testimonials_parent_id_idx\` ON \`_hst_v_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_hst_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Depoimentos',
  	\`title\` text DEFAULT 'Quem trabalhou com a gente *volta*',
  	\`description\` text,
  	\`rating_value\` text DEFAULT '4,9 / 5,0',
  	\`review_count\` text DEFAULT '47 avaliações no Google',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_hst_v_order_idx\` ON \`_hst_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_hst_v_parent_id_idx\` ON \`_hst_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_hst_v_path_idx\` ON \`_hst_v\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`hst_testimonials\`;`)
  await db.run(sql`DROP TABLE \`hst\`;`)
  await db.run(sql`DROP TABLE \`_hst_v_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_hst_v\`;`)
}
