import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_section_channels\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`label\` text,
  	\`value\` text,
  	\`hint\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_section_channels_order_idx\` ON \`pages_blocks_contact_section_channels\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_section_channels_parent_id_idx\` ON \`pages_blocks_contact_section_channels\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`sidebar_eyebrow\` text DEFAULT 'Fale direto',
  	\`success_title\` text DEFAULT 'Mensagem enviada',
  	\`success_message\` text DEFAULT 'Recebemos sua mensagem. Em até 3 dias úteis um de nós entra em contato.',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_section_order_idx\` ON \`pages_blocks_contact_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_section_parent_id_idx\` ON \`pages_blocks_contact_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_section_path_idx\` ON \`pages_blocks_contact_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email\` text DEFAULT 'contato@exemplo.com',
  	\`email_href\` text DEFAULT 'mailto:contato@exemplo.com',
  	\`phone\` text DEFAULT '(11) 99999-9999',
  	\`phone_href\` text DEFAULT 'tel:+5511999999999',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_contact_order_idx\` ON \`pages_blocks_home_section_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_contact_parent_id_idx\` ON \`pages_blocks_home_section_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_contact_path_idx\` ON \`pages_blocks_home_section_contact\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_section_channels\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`label\` text,
  	\`value\` text,
  	\`hint\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contact_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_section_channels_order_idx\` ON \`_pages_v_blocks_contact_section_channels\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_section_channels_parent_id_idx\` ON \`_pages_v_blocks_contact_section_channels\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`sidebar_eyebrow\` text DEFAULT 'Fale direto',
  	\`success_title\` text DEFAULT 'Mensagem enviada',
  	\`success_message\` text DEFAULT 'Recebemos sua mensagem. Em até 3 dias úteis um de nós entra em contato.',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_section_order_idx\` ON \`_pages_v_blocks_contact_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_section_parent_id_idx\` ON \`_pages_v_blocks_contact_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_section_path_idx\` ON \`_pages_v_blocks_contact_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_contact\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`email\` text DEFAULT 'contato@exemplo.com',
  	\`email_href\` text DEFAULT 'mailto:contato@exemplo.com',
  	\`phone\` text DEFAULT '(11) 99999-9999',
  	\`phone_href\` text DEFAULT 'tel:+5511999999999',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_contact_order_idx\` ON \`_pages_v_blocks_home_section_contact\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_contact_parent_id_idx\` ON \`_pages_v_blocks_home_section_contact\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_contact_path_idx\` ON \`_pages_v_blocks_home_section_contact\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_contact_section_channels\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_contact\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_section_channels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_section\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_contact\`;`)
}
