import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_block_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq_block_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_faq_block_items_locales_locale_parent_id_unique\` ON \`pages_blocks_faq_block_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_block_locales\` (
  	\`eyebrow\` text,
  	\`title\` text DEFAULT 'Perguntas *frequentes*',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_faq_block_locales_locale_parent_id_unique\` ON \`pages_blocks_faq_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_about_features_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_about_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_home_section_about_features_locales_locale_pare\` ON \`pages_blocks_home_section_about_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_about_locales\` (
  	\`eyebrow\` text DEFAULT 'Sobre nós',
  	\`title\` text DEFAULT 'Um estúdio *pequeno* com
  entregas *de gente grande*.',
  	\`description\` text,
  	\`cta_label\` text DEFAULT 'Conheça o time',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_home_section_about_locales_locale_parent_id_uni\` ON \`pages_blocks_home_section_about_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_logo_cloud_locales\` (
  	\`eyebrow\` text DEFAULT 'Clientes',
  	\`title\` text DEFAULT 'Empresas que *confiam* na gente',
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_logo_cloud\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_home_section_logo_cloud_locales_locale_parent_i\` ON \`pages_blocks_home_section_logo_cloud_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_process_steps_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_process_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_home_section_process_steps_locales_locale_paren\` ON \`pages_blocks_home_section_process_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_process_locales\` (
  	\`eyebrow\` text DEFAULT 'Como trabalhamos',
  	\`title\` text DEFAULT 'Um *processo claro*, do briefing ao go-live',
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_home_section_process_locales_locale_parent_id_u\` ON \`pages_blocks_home_section_process_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_projects_projects_locales\` (
  	\`tag\` text,
  	\`title\` text,
  	\`result\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_projects_projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_home_section_projects_projects_locales_locale_p\` ON \`pages_blocks_home_section_projects_projects_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_projects_locales\` (
  	\`eyebrow\` text DEFAULT 'Trabalhos recentes',
  	\`title\` text DEFAULT 'Projetos que *colocamos pra rodar*',
  	\`portfolio_label\` text DEFAULT 'Ver portfólio completo',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_home_section_projects_locales_locale_parent_id_\` ON \`pages_blocks_home_section_projects_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_services_services_bullets_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_services_services_bullets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_home_section_services_services_bullets_locales_\` ON \`pages_blocks_home_section_services_services_bullets_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_services_services_locales\` (
  	\`name\` text,
  	\`description\` text,
  	\`cta_label\` text DEFAULT 'Conheça',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_services_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_home_section_services_services_locales_locale_p\` ON \`pages_blocks_home_section_services_services_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_services_locales\` (
  	\`eyebrow\` text DEFAULT 'Serviços',
  	\`title\` text DEFAULT 'Soluções *inteligentes*
  para o seu negócio',
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_home_section_services_locales_locale_parent_id_\` ON \`pages_blocks_home_section_services_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_stats_stats_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_stats_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_home_section_stats_stats_locales_locale_parent_\` ON \`pages_blocks_home_section_stats_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`hst_testimonials_locales\` (
  	\`quote\` text,
  	\`author\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`hst_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`hst_testimonials_locales_locale_parent_id_unique\` ON \`hst_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`hst_locales\` (
  	\`eyebrow\` text DEFAULT 'Depoimentos',
  	\`title\` text DEFAULT 'Quem trabalhou com a gente *volta*',
  	\`description\` text,
  	\`review_count\` text DEFAULT '47 avaliações no Google',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`hst\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`hst_locales_locale_parent_id_unique\` ON \`hst_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_home_section_cta_locales\` (
  	\`eyebrow\` text DEFAULT 'Próximo passo',
  	\`title\` text DEFAULT 'Tem um projeto *em mente?*',
  	\`description\` text,
  	\`cta1_label\` text DEFAULT 'Agendar uma call',
  	\`cta2_label\` text DEFAULT 'Baixar portfólio (PDF)',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_section_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_home_section_cta_locales_locale_parent_id_uniqu\` ON \`pages_blocks_home_section_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_section_channels_locales\` (
  	\`label\` text,
  	\`value\` text,
  	\`hint\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_section_channels\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_contact_section_channels_locales_locale_parent_\` ON \`pages_blocks_contact_section_channels_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_section_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`sidebar_eyebrow\` text DEFAULT 'Fale direto',
  	\`success_title\` text DEFAULT 'Mensagem enviada',
  	\`success_message\` text DEFAULT 'Recebemos sua mensagem. Em até 3 dias úteis um de nós entra em contato.',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_contact_section_locales_locale_parent_id_unique\` ON \`pages_blocks_contact_section_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_checklist_grid_items_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_checklist_grid_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_checklist_grid_items_locales_locale_parent_id_u\` ON \`pages_blocks_checklist_grid_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_checklist_grid_locales\` (
  	\`eyebrow\` text,
  	\`title\` text DEFAULT 'Por que *a diferença* nessa parceria',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_checklist_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_checklist_grid_locales_locale_parent_id_unique\` ON \`pages_blocks_checklist_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_pull_quote_locales\` (
  	\`eyebrow\` text,
  	\`quote\` text,
  	\`author\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_pull_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_pull_quote_locales_locale_parent_id_unique\` ON \`pages_blocks_pull_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_portfolio_listing_locales\` (
  	\`eyebrow\` text DEFAULT 'Portfólio',
  	\`title\` text DEFAULT '*Projetos* que colocamos pra rodar',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_portfolio_listing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_portfolio_listing_locales_locale_parent_id_uniq\` ON \`pages_blocks_portfolio_listing_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_blog_listing_locales\` (
  	\`eyebrow\` text DEFAULT 'Arquivo',
  	\`title\` text DEFAULT '*Últimos posts*',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_blog_listing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_blog_listing_locales_locale_parent_id_unique\` ON \`pages_blocks_blog_listing_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales\` (
  	\`title\` text,
  	\`hero_eyebrow\` text,
  	\`hero_hero_title\` text DEFAULT 'Sites que *gritam*,
  negócios que *escalam*.',
  	\`hero_hero_description\` text,
  	\`hero_cta1_label\` text,
  	\`hero_cta2_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq_block_items_locales\` (
  	\`question\` text,
  	\`answer\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_faq_block_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_faq_block_items_locales_locale_parent_id_uni\` ON \`_pages_v_blocks_faq_block_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq_block_locales\` (
  	\`eyebrow\` text,
  	\`title\` text DEFAULT 'Perguntas *frequentes*',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_faq_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_faq_block_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_faq_block_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_about_features_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_about_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_home_section_about_features_locales_locale_p\` ON \`_pages_v_blocks_home_section_about_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_about_locales\` (
  	\`eyebrow\` text DEFAULT 'Sobre nós',
  	\`title\` text DEFAULT 'Um estúdio *pequeno* com
  entregas *de gente grande*.',
  	\`description\` text,
  	\`cta_label\` text DEFAULT 'Conheça o time',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_home_section_about_locales_locale_parent_id_\` ON \`_pages_v_blocks_home_section_about_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_logo_cloud_locales\` (
  	\`eyebrow\` text DEFAULT 'Clientes',
  	\`title\` text DEFAULT 'Empresas que *confiam* na gente',
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_logo_cloud\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_home_section_logo_cloud_locales_locale_paren\` ON \`_pages_v_blocks_home_section_logo_cloud_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_process_steps_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_process_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_home_section_process_steps_locales_locale_pa\` ON \`_pages_v_blocks_home_section_process_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_process_locales\` (
  	\`eyebrow\` text DEFAULT 'Como trabalhamos',
  	\`title\` text DEFAULT 'Um *processo claro*, do briefing ao go-live',
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_home_section_process_locales_locale_parent_i\` ON \`_pages_v_blocks_home_section_process_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_projects_projects_locales\` (
  	\`tag\` text,
  	\`title\` text,
  	\`result\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_projects_projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_home_section_projects_projects_locales_local\` ON \`_pages_v_blocks_home_section_projects_projects_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_projects_locales\` (
  	\`eyebrow\` text DEFAULT 'Trabalhos recentes',
  	\`title\` text DEFAULT 'Projetos que *colocamos pra rodar*',
  	\`portfolio_label\` text DEFAULT 'Ver portfólio completo',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_home_section_projects_locales_locale_parent_\` ON \`_pages_v_blocks_home_section_projects_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_services_services_bullets_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_services_services_bullets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_home_section_services_services_bullets_local\` ON \`_pages_v_blocks_home_section_services_services_bullets_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_services_services_locales\` (
  	\`name\` text,
  	\`description\` text,
  	\`cta_label\` text DEFAULT 'Conheça',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_services_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_home_section_services_services_locales_local\` ON \`_pages_v_blocks_home_section_services_services_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_services_locales\` (
  	\`eyebrow\` text DEFAULT 'Serviços',
  	\`title\` text DEFAULT 'Soluções *inteligentes*
  para o seu negócio',
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_home_section_services_locales_locale_parent_\` ON \`_pages_v_blocks_home_section_services_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_stats_stats_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_stats_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_home_section_stats_stats_locales_locale_pare\` ON \`_pages_v_blocks_home_section_stats_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_hst_v_testimonials_locales\` (
  	\`quote\` text,
  	\`author\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_hst_v_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_hst_v_testimonials_locales_locale_parent_id_unique\` ON \`_hst_v_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_hst_v_locales\` (
  	\`eyebrow\` text DEFAULT 'Depoimentos',
  	\`title\` text DEFAULT 'Quem trabalhou com a gente *volta*',
  	\`description\` text,
  	\`review_count\` text DEFAULT '47 avaliações no Google',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_hst_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_hst_v_locales_locale_parent_id_unique\` ON \`_hst_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_home_section_cta_locales\` (
  	\`eyebrow\` text DEFAULT 'Próximo passo',
  	\`title\` text DEFAULT 'Tem um projeto *em mente?*',
  	\`description\` text,
  	\`cta1_label\` text DEFAULT 'Agendar uma call',
  	\`cta2_label\` text DEFAULT 'Baixar portfólio (PDF)',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_home_section_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_home_section_cta_locales_locale_parent_id_un\` ON \`_pages_v_blocks_home_section_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_section_channels_locales\` (
  	\`label\` text,
  	\`value\` text,
  	\`hint\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contact_section_channels\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_contact_section_channels_locales_locale_pare\` ON \`_pages_v_blocks_contact_section_channels_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_section_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`sidebar_eyebrow\` text DEFAULT 'Fale direto',
  	\`success_title\` text DEFAULT 'Mensagem enviada',
  	\`success_message\` text DEFAULT 'Recebemos sua mensagem. Em até 3 dias úteis um de nós entra em contato.',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contact_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_contact_section_locales_locale_parent_id_uni\` ON \`_pages_v_blocks_contact_section_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_checklist_grid_items_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_checklist_grid_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_checklist_grid_items_locales_locale_parent_i\` ON \`_pages_v_blocks_checklist_grid_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_checklist_grid_locales\` (
  	\`eyebrow\` text,
  	\`title\` text DEFAULT 'Por que *a diferença* nessa parceria',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_checklist_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_checklist_grid_locales_locale_parent_id_uniq\` ON \`_pages_v_blocks_checklist_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_pull_quote_locales\` (
  	\`eyebrow\` text,
  	\`quote\` text,
  	\`author\` text,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_pull_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_pull_quote_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_pull_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_portfolio_listing_locales\` (
  	\`eyebrow\` text DEFAULT 'Portfólio',
  	\`title\` text DEFAULT '*Projetos* que colocamos pra rodar',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_portfolio_listing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_portfolio_listing_locales_locale_parent_id_u\` ON \`_pages_v_blocks_portfolio_listing_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_blog_listing_locales\` (
  	\`eyebrow\` text DEFAULT 'Arquivo',
  	\`title\` text DEFAULT '*Últimos posts*',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_blog_listing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_blog_listing_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_blog_listing_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_locales\` (
  	\`version_title\` text,
  	\`version_hero_eyebrow\` text,
  	\`version_hero_hero_title\` text DEFAULT 'Sites que *gritam*,
  negócios que *escalam*.',
  	\`version_hero_hero_description\` text,
  	\`version_hero_cta1_label\` text,
  	\`version_hero_cta2_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_locales_locale_parent_id_unique\` ON \`_pages_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`portfolios_locales\` (
  	\`title\` text,
  	\`summary\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`portfolios\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`portfolios_locales_locale_parent_id_unique\` ON \`portfolios_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_portfolios_v_locales\` (
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_portfolios_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_portfolios_v_locales_locale_parent_id_unique\` ON \`_portfolios_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_locales\` (
  	\`title\` text,
  	\`excerpt\` text,
  	\`content\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_locales\` (
  	\`version_title\` text,
  	\`version_excerpt\` text,
  	\`version_content\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items_locales\` (
  	\`link_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_nav_items_locales_locale_parent_id_unique\` ON \`header_nav_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_nav_items_locales\` (
  	\`link_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_nav_items_locales_locale_parent_id_unique\` ON \`footer_nav_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_hero_title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_hero_description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_cta1_label\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_cta2_label\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_snapshot_idx\` ON \`_portfolios_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_portfolios_v_published_locale_idx\` ON \`_portfolios_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`version_title\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`version_summary\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`published_locale\` text;`)
  await db.run(sql`CREATE INDEX \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_title\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_excerpt\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_content\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_meta_title\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_meta_description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq_block_items\` DROP COLUMN \`question\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq_block_items\` DROP COLUMN \`answer\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq_block\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq_block\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_about_features\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_about_features\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_about\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_about\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_about\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_about\` DROP COLUMN \`cta_label\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_process_steps\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_process_steps\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_process\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_process\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_process\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_projects_projects\` DROP COLUMN \`tag\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_projects_projects\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_projects_projects\` DROP COLUMN \`result\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_projects\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_projects\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_projects\` DROP COLUMN \`portfolio_label\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services_services_bullets\` DROP COLUMN \`text\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services_services\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services_services\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services_services\` DROP COLUMN \`cta_label\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_stats_stats\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`hst_testimonials\` DROP COLUMN \`quote\`;`)
  await db.run(sql`ALTER TABLE \`hst_testimonials\` DROP COLUMN \`author\`;`)
  await db.run(sql`ALTER TABLE \`hst_testimonials\` DROP COLUMN \`role\`;`)
  await db.run(sql`ALTER TABLE \`hst\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`hst\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`hst\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`hst\` DROP COLUMN \`review_count\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` DROP COLUMN \`cta1_label\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` DROP COLUMN \`cta2_label\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section_channels\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section_channels\` DROP COLUMN \`value\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section_channels\` DROP COLUMN \`hint\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` DROP COLUMN \`sidebar_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` DROP COLUMN \`success_title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` DROP COLUMN \`success_message\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_checklist_grid_items\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_checklist_grid_items\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_checklist_grid\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_checklist_grid\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pull_quote\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pull_quote\` DROP COLUMN \`quote\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pull_quote\` DROP COLUMN \`author\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pull_quote\` DROP COLUMN \`role\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_portfolio_listing\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_portfolio_listing\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog_listing\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog_listing\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_hero_title\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_hero_description\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_cta1_label\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_cta2_label\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq_block_items\` DROP COLUMN \`question\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq_block_items\` DROP COLUMN \`answer\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq_block\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq_block\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_about_features\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_about_features\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_about\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_about\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_about\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_about\` DROP COLUMN \`cta_label\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_process_steps\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_process_steps\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_process\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_process\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_process\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_projects_projects\` DROP COLUMN \`tag\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_projects_projects\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_projects_projects\` DROP COLUMN \`result\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_projects\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_projects\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_projects\` DROP COLUMN \`portfolio_label\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services_services_bullets\` DROP COLUMN \`text\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services_services\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services_services\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services_services\` DROP COLUMN \`cta_label\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_stats_stats\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`_hst_v_testimonials\` DROP COLUMN \`quote\`;`)
  await db.run(sql`ALTER TABLE \`_hst_v_testimonials\` DROP COLUMN \`author\`;`)
  await db.run(sql`ALTER TABLE \`_hst_v_testimonials\` DROP COLUMN \`role\`;`)
  await db.run(sql`ALTER TABLE \`_hst_v\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_hst_v\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_hst_v\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_hst_v\` DROP COLUMN \`review_count\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` DROP COLUMN \`cta1_label\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` DROP COLUMN \`cta2_label\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section_channels\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section_channels\` DROP COLUMN \`value\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section_channels\` DROP COLUMN \`hint\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section\` DROP COLUMN \`sidebar_eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section\` DROP COLUMN \`success_title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section\` DROP COLUMN \`success_message\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_checklist_grid_items\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_checklist_grid_items\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_checklist_grid\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_checklist_grid\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pull_quote\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pull_quote\` DROP COLUMN \`quote\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pull_quote\` DROP COLUMN \`author\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pull_quote\` DROP COLUMN \`role\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_portfolio_listing\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_portfolio_listing\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog_listing\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog_listing\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`portfolios\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`portfolios\` DROP COLUMN \`summary\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`excerpt\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`content\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`meta_title\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`meta_description\`;`)
  await db.run(sql`ALTER TABLE \`header_nav_items\` DROP COLUMN \`link_label\`;`)
  await db.run(sql`ALTER TABLE \`footer_nav_items\` DROP COLUMN \`link_label\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_faq_block_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_block_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_about_features_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_about_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_logo_cloud_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_process_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_process_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_projects_projects_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_projects_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_services_services_bullets_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_services_services_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_services_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_stats_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`hst_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`hst_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_section_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_section_channels_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_section_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_checklist_grid_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_checklist_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_pull_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_portfolio_listing_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_blog_listing_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq_block_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq_block_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_about_features_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_about_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_logo_cloud_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_process_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_process_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_projects_projects_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_projects_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_services_services_bullets_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_services_services_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_services_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_stats_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`_hst_v_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`_hst_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_home_section_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_section_channels_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_section_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_checklist_grid_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_checklist_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_pull_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_portfolio_listing_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_blog_listing_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_locales\`;`)
  await db.run(sql`DROP TABLE \`portfolios_locales\`;`)
  await db.run(sql`DROP TABLE \`_portfolios_v_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_locales\`;`)
  await db.run(sql`DROP TABLE \`footer_nav_items_locales\`;`)
  await db.run(sql`DROP INDEX \`_pages_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_pages_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_title\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_hero_title\` text DEFAULT 'Sites que *gritam*,
  negócios que *escalam*.';`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_hero_description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_cta1_label\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_cta2_label\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`DROP INDEX \`_portfolios_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_portfolios_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_title\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` ADD \`version_summary\` text;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_portfolios_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_title\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_content\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq_block_items\` ADD \`question\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq_block_items\` ADD \`answer\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq_block\` ADD \`eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq_block\` ADD \`title\` text DEFAULT 'Perguntas *frequentes*';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_about_features\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_about_features\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_about\` ADD \`eyebrow\` text DEFAULT 'Sobre nós';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_about\` ADD \`title\` text DEFAULT 'Um estúdio *pequeno* com
  entregas *de gente grande*.';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_about\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_about\` ADD \`cta_label\` text DEFAULT 'Conheça o time';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud\` ADD \`eyebrow\` text DEFAULT 'Clientes';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud\` ADD \`title\` text DEFAULT 'Empresas que *confiam* na gente';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_logo_cloud\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_process_steps\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_process_steps\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_process\` ADD \`eyebrow\` text DEFAULT 'Como trabalhamos';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_process\` ADD \`title\` text DEFAULT 'Um *processo claro*, do briefing ao go-live';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_process\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_projects_projects\` ADD \`tag\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_projects_projects\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_projects_projects\` ADD \`result\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_projects\` ADD \`eyebrow\` text DEFAULT 'Trabalhos recentes';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_projects\` ADD \`title\` text DEFAULT 'Projetos que *colocamos pra rodar*';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_projects\` ADD \`portfolio_label\` text DEFAULT 'Ver portfólio completo';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services_services_bullets\` ADD \`text\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services_services\` ADD \`name\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services_services\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services_services\` ADD \`cta_label\` text DEFAULT 'Conheça';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services\` ADD \`eyebrow\` text DEFAULT 'Serviços';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services\` ADD \`title\` text DEFAULT 'Soluções *inteligentes*
  para o seu negócio';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_services\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_stats_stats\` ADD \`label\` text;`)
  await db.run(sql`ALTER TABLE \`hst_testimonials\` ADD \`quote\` text;`)
  await db.run(sql`ALTER TABLE \`hst_testimonials\` ADD \`author\` text;`)
  await db.run(sql`ALTER TABLE \`hst_testimonials\` ADD \`role\` text;`)
  await db.run(sql`ALTER TABLE \`hst\` ADD \`eyebrow\` text DEFAULT 'Depoimentos';`)
  await db.run(sql`ALTER TABLE \`hst\` ADD \`title\` text DEFAULT 'Quem trabalhou com a gente *volta*';`)
  await db.run(sql`ALTER TABLE \`hst\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`hst\` ADD \`review_count\` text DEFAULT '47 avaliações no Google';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` ADD \`eyebrow\` text DEFAULT 'Próximo passo';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` ADD \`cta1_label\` text DEFAULT 'Agendar uma call';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_section_cta\` ADD \`cta2_label\` text DEFAULT 'Baixar portfólio (PDF)';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section_channels\` ADD \`label\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section_channels\` ADD \`value\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section_channels\` ADD \`hint\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` ADD \`eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` ADD \`heading\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` ADD \`sidebar_eyebrow\` text DEFAULT 'Fale direto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` ADD \`success_title\` text DEFAULT 'Mensagem enviada';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_section\` ADD \`success_message\` text DEFAULT 'Recebemos sua mensagem. Em até 3 dias úteis um de nós entra em contato.';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_checklist_grid_items\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_checklist_grid_items\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_checklist_grid\` ADD \`eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_checklist_grid\` ADD \`title\` text DEFAULT 'Por que *a diferença* nessa parceria';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pull_quote\` ADD \`eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pull_quote\` ADD \`quote\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pull_quote\` ADD \`author\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_pull_quote\` ADD \`role\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_portfolio_listing\` ADD \`eyebrow\` text DEFAULT 'Portfólio';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_portfolio_listing\` ADD \`title\` text DEFAULT '*Projetos* que colocamos pra rodar';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog_listing\` ADD \`eyebrow\` text DEFAULT 'Arquivo';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_blog_listing\` ADD \`title\` text DEFAULT '*Últimos posts*';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_hero_title\` text DEFAULT 'Sites que *gritam*,
  negócios que *escalam*.';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_hero_description\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_cta1_label\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_cta2_label\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq_block_items\` ADD \`question\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq_block_items\` ADD \`answer\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq_block\` ADD \`eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq_block\` ADD \`title\` text DEFAULT 'Perguntas *frequentes*';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_about_features\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_about_features\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_about\` ADD \`eyebrow\` text DEFAULT 'Sobre nós';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_about\` ADD \`title\` text DEFAULT 'Um estúdio *pequeno* com
  entregas *de gente grande*.';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_about\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_about\` ADD \`cta_label\` text DEFAULT 'Conheça o time';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud\` ADD \`eyebrow\` text DEFAULT 'Clientes';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud\` ADD \`title\` text DEFAULT 'Empresas que *confiam* na gente';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_logo_cloud\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_process_steps\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_process_steps\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_process\` ADD \`eyebrow\` text DEFAULT 'Como trabalhamos';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_process\` ADD \`title\` text DEFAULT 'Um *processo claro*, do briefing ao go-live';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_process\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_projects_projects\` ADD \`tag\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_projects_projects\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_projects_projects\` ADD \`result\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_projects\` ADD \`eyebrow\` text DEFAULT 'Trabalhos recentes';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_projects\` ADD \`title\` text DEFAULT 'Projetos que *colocamos pra rodar*';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_projects\` ADD \`portfolio_label\` text DEFAULT 'Ver portfólio completo';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services_services_bullets\` ADD \`text\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services_services\` ADD \`name\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services_services\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services_services\` ADD \`cta_label\` text DEFAULT 'Conheça';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services\` ADD \`eyebrow\` text DEFAULT 'Serviços';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services\` ADD \`title\` text DEFAULT 'Soluções *inteligentes*
  para o seu negócio';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_services\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_stats_stats\` ADD \`label\` text;`)
  await db.run(sql`ALTER TABLE \`_hst_v_testimonials\` ADD \`quote\` text;`)
  await db.run(sql`ALTER TABLE \`_hst_v_testimonials\` ADD \`author\` text;`)
  await db.run(sql`ALTER TABLE \`_hst_v_testimonials\` ADD \`role\` text;`)
  await db.run(sql`ALTER TABLE \`_hst_v\` ADD \`eyebrow\` text DEFAULT 'Depoimentos';`)
  await db.run(sql`ALTER TABLE \`_hst_v\` ADD \`title\` text DEFAULT 'Quem trabalhou com a gente *volta*';`)
  await db.run(sql`ALTER TABLE \`_hst_v\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_hst_v\` ADD \`review_count\` text DEFAULT '47 avaliações no Google';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` ADD \`eyebrow\` text DEFAULT 'Próximo passo';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` ADD \`cta1_label\` text DEFAULT 'Agendar uma call';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_home_section_cta\` ADD \`cta2_label\` text DEFAULT 'Baixar portfólio (PDF)';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section_channels\` ADD \`label\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section_channels\` ADD \`value\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section_channels\` ADD \`hint\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section\` ADD \`eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section\` ADD \`heading\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section\` ADD \`sidebar_eyebrow\` text DEFAULT 'Fale direto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section\` ADD \`success_title\` text DEFAULT 'Mensagem enviada';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_section\` ADD \`success_message\` text DEFAULT 'Recebemos sua mensagem. Em até 3 dias úteis um de nós entra em contato.';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_checklist_grid_items\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_checklist_grid_items\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_checklist_grid\` ADD \`eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_checklist_grid\` ADD \`title\` text DEFAULT 'Por que *a diferença* nessa parceria';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pull_quote\` ADD \`eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pull_quote\` ADD \`quote\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pull_quote\` ADD \`author\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_pull_quote\` ADD \`role\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_portfolio_listing\` ADD \`eyebrow\` text DEFAULT 'Portfólio';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_portfolio_listing\` ADD \`title\` text DEFAULT '*Projetos* que colocamos pra rodar';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog_listing\` ADD \`eyebrow\` text DEFAULT 'Arquivo';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_blog_listing\` ADD \`title\` text DEFAULT '*Últimos posts*';`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`portfolios\` ADD \`summary\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`content\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`header_nav_items\` ADD \`link_label\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`footer_nav_items\` ADD \`link_label\` text NOT NULL;`)
}
