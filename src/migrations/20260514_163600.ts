import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_about_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_about_features_order_idx\` ON \`pages_blocks_home_section_about_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_about_features_parent_id_idx\` ON \`pages_blocks_home_section_about_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_about\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Sobre nós',
  	\`title\` text DEFAULT 'Um estúdio *pequeno* com
  entregas *de gente grande*.',
  	\`description\` text,
  	\`cta_label\` text DEFAULT 'Conheça o time',
  	\`cta_href\` text DEFAULT '#',
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_about_order_idx\` ON \`pages_blocks_home_section_about\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_about_parent_id_idx\` ON \`pages_blocks_home_section_about\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_about_path_idx\` ON \`pages_blocks_home_section_about\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_about_image_idx\` ON \`pages_blocks_home_section_about\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_logo_cloud_partners\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`glyph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_logo_cloud\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_logo_cloud_partners_order_idx\` ON \`pages_blocks_home_section_logo_cloud_partners\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_logo_cloud_partners_parent_id_idx\` ON \`pages_blocks_home_section_logo_cloud_partners\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_logo_cloud\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Clientes',
  	\`title\` text DEFAULT 'Empresas que *confiam* na gente',
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_logo_cloud_order_idx\` ON \`pages_blocks_home_section_logo_cloud\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_logo_cloud_parent_id_idx\` ON \`pages_blocks_home_section_logo_cloud\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_logo_cloud_path_idx\` ON \`pages_blocks_home_section_logo_cloud\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_process_steps_order_idx\` ON \`pages_blocks_home_section_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_process_steps_parent_id_idx\` ON \`pages_blocks_home_section_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background\` text DEFAULT 'dark',
  	\`eyebrow\` text DEFAULT 'Como trabalhamos',
  	\`title\` text DEFAULT 'Um *processo claro*, do briefing ao go-live',
  	\`description\` text,
  	\`highlight_index\` numeric DEFAULT 2,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_process_order_idx\` ON \`pages_blocks_home_section_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_process_parent_id_idx\` ON \`pages_blocks_home_section_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_process_path_idx\` ON \`pages_blocks_home_section_process\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_projects_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`tag_variant\` text DEFAULT 'blue',
  	\`accent\` text DEFAULT 'blue',
  	\`client\` text,
  	\`year\` text,
  	\`title\` text,
  	\`result\` text,
  	\`motif_type\` text DEFAULT 'tagMark',
  	\`href\` text DEFAULT '#',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_projects_projects_order_idx\` ON \`pages_blocks_home_section_projects_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_projects_projects_parent_id_idx\` ON \`pages_blocks_home_section_projects_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Trabalhos recentes',
  	\`title\` text DEFAULT 'Projetos que *colocamos pra rodar*',
  	\`portfolio_label\` text DEFAULT 'Ver portfólio completo',
  	\`portfolio_href\` text DEFAULT '#',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_projects_order_idx\` ON \`pages_blocks_home_section_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_projects_parent_id_idx\` ON \`pages_blocks_home_section_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_projects_path_idx\` ON \`pages_blocks_home_section_projects\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_services_services_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_services_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_services_services_bullets_order_idx\` ON \`pages_blocks_home_section_services_services_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_services_services_bullets_parent_id_idx\` ON \`pages_blocks_home_section_services_services_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_services_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`variant\` text DEFAULT 'blue',
  	\`description\` text,
  	\`icon_type\` text,
  	\`cta_label\` text DEFAULT 'Conheça',
  	\`cta_href\` text DEFAULT '#',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_services_services_order_idx\` ON \`pages_blocks_home_section_services_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_services_services_parent_id_idx\` ON \`pages_blocks_home_section_services_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Serviços',
  	\`title\` text DEFAULT 'Soluções *inteligentes*
  para o seu negócio',
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_services_order_idx\` ON \`pages_blocks_home_section_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_services_parent_id_idx\` ON \`pages_blocks_home_section_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_services_path_idx\` ON \`pages_blocks_home_section_services\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_stats_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_stats_stats_order_idx\` ON \`pages_blocks_home_section_stats_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_stats_stats_parent_id_idx\` ON \`pages_blocks_home_section_stats_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`show_decoration\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_stats_order_idx\` ON \`pages_blocks_home_section_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_stats_parent_id_idx\` ON \`pages_blocks_home_section_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_section_stats_path_idx\` ON \`pages_blocks_home_section_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_about_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_about_features_order_idx\` ON \`_pages_v_blocks_home_section_about_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_about_features_parent_id_idx\` ON \`_pages_v_blocks_home_section_about_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_about\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Sobre nós',
  	\`title\` text DEFAULT 'Um estúdio *pequeno* com
  entregas *de gente grande*.',
  	\`description\` text,
  	\`cta_label\` text DEFAULT 'Conheça o time',
  	\`cta_href\` text DEFAULT '#',
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_about_order_idx\` ON \`_pages_v_blocks_home_section_about\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_about_parent_id_idx\` ON \`_pages_v_blocks_home_section_about\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_about_path_idx\` ON \`_pages_v_blocks_home_section_about\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_about_image_idx\` ON \`_pages_v_blocks_home_section_about\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_logo_cloud_partners\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`glyph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_logo_cloud\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_logo_cloud_partners_order_idx\` ON \`_pages_v_blocks_home_section_logo_cloud_partners\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_logo_cloud_partners_parent_id_idx\` ON \`_pages_v_blocks_home_section_logo_cloud_partners\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_logo_cloud\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Clientes',
  	\`title\` text DEFAULT 'Empresas que *confiam* na gente',
  	\`description\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_logo_cloud_order_idx\` ON \`_pages_v_blocks_home_section_logo_cloud\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_logo_cloud_parent_id_idx\` ON \`_pages_v_blocks_home_section_logo_cloud\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_logo_cloud_path_idx\` ON \`_pages_v_blocks_home_section_logo_cloud\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_process_steps_order_idx\` ON \`_pages_v_blocks_home_section_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_process_steps_parent_id_idx\` ON \`_pages_v_blocks_home_section_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`background\` text DEFAULT 'dark',
  	\`eyebrow\` text DEFAULT 'Como trabalhamos',
  	\`title\` text DEFAULT 'Um *processo claro*, do briefing ao go-live',
  	\`description\` text,
  	\`highlight_index\` numeric DEFAULT 2,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_process_order_idx\` ON \`_pages_v_blocks_home_section_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_process_parent_id_idx\` ON \`_pages_v_blocks_home_section_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_process_path_idx\` ON \`_pages_v_blocks_home_section_process\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_projects_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`tag_variant\` text DEFAULT 'blue',
  	\`accent\` text DEFAULT 'blue',
  	\`client\` text,
  	\`year\` text,
  	\`title\` text,
  	\`result\` text,
  	\`motif_type\` text DEFAULT 'tagMark',
  	\`href\` text DEFAULT '#',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_projects_projects_order_idx\` ON \`_pages_v_blocks_home_section_projects_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_projects_projects_parent_id_idx\` ON \`_pages_v_blocks_home_section_projects_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Trabalhos recentes',
  	\`title\` text DEFAULT 'Projetos que *colocamos pra rodar*',
  	\`portfolio_label\` text DEFAULT 'Ver portfólio completo',
  	\`portfolio_href\` text DEFAULT '#',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_projects_order_idx\` ON \`_pages_v_blocks_home_section_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_projects_parent_id_idx\` ON \`_pages_v_blocks_home_section_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_projects_path_idx\` ON \`_pages_v_blocks_home_section_projects\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_services_services_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_services_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_services_services_bullets_order_idx\` ON \`_pages_v_blocks_home_section_services_services_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_services_services_bullets_parent_id_idx\` ON \`_pages_v_blocks_home_section_services_services_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_services_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`variant\` text DEFAULT 'blue',
  	\`description\` text,
  	\`icon_type\` text,
  	\`cta_label\` text DEFAULT 'Conheça',
  	\`cta_href\` text DEFAULT '#',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_services_services_order_idx\` ON \`_pages_v_blocks_home_section_services_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_services_services_parent_id_idx\` ON \`_pages_v_blocks_home_section_services_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text DEFAULT 'Serviços',
  	\`title\` text DEFAULT 'Soluções *inteligentes*
  para o seu negócio',
  	\`description\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_services_order_idx\` ON \`_pages_v_blocks_home_section_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_services_parent_id_idx\` ON \`_pages_v_blocks_home_section_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_services_path_idx\` ON \`_pages_v_blocks_home_section_services\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_stats_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_stats_stats_order_idx\` ON \`_pages_v_blocks_home_section_stats_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_stats_stats_parent_id_idx\` ON \`_pages_v_blocks_home_section_stats_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`show_decoration\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_stats_order_idx\` ON \`_pages_v_blocks_home_section_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_stats_parent_id_idx\` ON \`_pages_v_blocks_home_section_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_home_section_stats_path_idx\` ON \`_pages_v_blocks_home_section_stats\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_about_features\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_about\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_logo_cloud_partners\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_logo_cloud\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_process_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_process\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_projects_projects\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_projects\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_services_services_bullets\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_services_services\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_services\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_stats_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_about_features\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_about\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_logo_cloud_partners\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_logo_cloud\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_process_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_process\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_projects_projects\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_projects\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_services_services_bullets\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_services_services\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_services\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_stats_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_stats\`;`)
}
