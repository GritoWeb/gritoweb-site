-- ============================================================
-- FIX: Version records for posts 4,5,6 and portfolios 2,3,4
-- Payload requires _v records for admin display + slug routing
-- ============================================================

-- ── Posts: version records ───────────────────────────────────

INSERT OR IGNORE INTO _posts_v (
  id, parent_id,
  version_title, version_excerpt, version_content,
  version_featured_image_id, version_published_at,
  version_slug, version_generate_slug,
  version_updated_at, version_created_at,
  version__status, created_at, updated_at,
  latest, autosave
) VALUES (
  10, 4,
  'SEO técnico sem enrolação: o checklist que usamos antes de todo lançamento',
  'Uma lista direta do que verificamos em toda migração ou novo site — sem firula e com foco no que realmente afeta o ranqueamento.',
  '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Por que checklists importam mais que ferramentas","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"SEO técnico tem um problema: a maioria dos guias lista dezenas de itens que pouco importam e ignora os três ou quatro que realmente movem o ponteiro.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"1. Core Web Vitals: o básico que todo mundo ignora","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"LCP abaixo de 2.5s, FID abaixo de 100ms e CLS abaixo de 0.1. Use o PageSpeed Insights com dados de campo (CrUX), não de laboratório.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"2. Crawlability: o Google consegue acessar o que importa?","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Cheque o coverage report no Google Search Console antes de qualquer coisa.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"3. Estrutura de links internos","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Esses três itens — performance, crawlability e links internos — são responsáveis pela maioria dos gains que vemos após auditorias.","version":1}],"direction":"ltr"}],"direction":"ltr"}}',
  3, '2026-04-28T08:00:00.000Z',
  'seo-tecnico-sem-enrolacao-checklist', 0,
  '2026-05-20T10:00:00.000Z', '2026-04-28T08:00:00.000Z',
  'published', '2026-05-20T10:00:00.000Z', '2026-05-20T10:00:00.000Z',
  1, 0
);

INSERT OR IGNORE INTO _posts_v (
  id, parent_id,
  version_title, version_excerpt, version_content,
  version_featured_image_id, version_published_at,
  version_slug, version_generate_slug,
  version_updated_at, version_created_at,
  version__status, created_at, updated_at,
  latest, autosave
) VALUES (
  11, 5,
  'Copywriting para pequenas empresas: como escrever sem parecer que você está vendendo',
  'O erro mais comum de PMEs no digital é escrever como grande empresa. Veja como encontrar seu tom e usar isso a favor da conversão.',
  '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"O paradoxo do pequeno negócio","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Pequenas empresas têm uma vantagem que grandes marcas pagam caro para simular: autenticidade. Mas a maioria joga isso fora tentando escrever como um banco — formal, impessoal e sem nenhuma personalidade.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Concreto bate abstrato toda vez","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Qualidade e comprometimento não significam nada. Entregamos em 48h ou devolvemos o dinheiro significa tudo.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Fale do problema antes da solução","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"O leitor não está pensando na sua empresa — está pensando no problema dele. Copy simples, direto e honesto converte mais do que copy sofisticado e vago.","version":1}],"direction":"ltr"}],"direction":"ltr"}}',
  10, '2026-04-20T08:00:00.000Z',
  'copywriting-pequenas-empresas-sem-parecer-venda', 0,
  '2026-05-20T10:00:00.000Z', '2026-04-20T08:00:00.000Z',
  'published', '2026-05-20T10:00:00.000Z', '2026-05-20T10:00:00.000Z',
  1, 0
);

INSERT OR IGNORE INTO _posts_v (
  id, parent_id,
  version_title, version_excerpt, version_content,
  version_featured_image_id, version_published_at,
  version_slug, version_generate_slug,
  version_updated_at, version_created_at,
  version__status, created_at, updated_at,
  latest, autosave
) VALUES (
  12, 6,
  'Design system para PMEs: quando faz sentido e quando é exagero',
  'Nem todo projeto precisa de um design system completo. Entenda o ponto de equilíbrio entre consistência visual e velocidade de entrega.',
  '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"O problema com a febre de design systems","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Design system virou moda. O problema é que construir e manter um design system tem um custo real — e para a maioria das PMEs, esse custo não se paga.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Quando faz sentido","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Design system faz sentido quando você tem múltiplas interfaces sendo desenvolvidas em paralelo, tem um time contínuo, ou quando a inconsistência já causa problemas reais.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"A alternativa prática: style guide + componentes","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Se você não vai usar mais de 20 componentes diferentes em todo o projeto, você provavelmente não precisa de um design system. Você precisa de um bom style guide e disciplina na execução.","version":1}],"direction":"ltr"}],"direction":"ltr"}}',
  4, '2026-04-12T08:00:00.000Z',
  'design-system-pmes-quando-faz-sentido', 0,
  '2026-05-20T10:00:00.000Z', '2026-04-12T08:00:00.000Z',
  'published', '2026-05-20T10:00:00.000Z', '2026-05-20T10:00:00.000Z',
  1, 0
);

-- ── Portfolios: version records ──────────────────────────────

INSERT OR IGNORE INTO _portfolios_v (
  id, parent_id,
  version_title, version_client, version_summary,
  version_image_id, version_tag_id, version_tag_variant, version_accent,
  version_year, version_result, version_site_url,
  version_sector, version_deliverables, version_duration,
  version_challenge_title, version_challenge_body,
  version_quote_text, version_quote_author, version_quote_role,
  version_slug, version_generate_slug,
  version_published_at, version_updated_at, version_created_at,
  version__status, created_at, updated_at, latest, autosave
) VALUES (
  8, 2,
  'Restaurante Bambu — Presença Digital Completa',
  'Restaurante Bambu',
  'Transformamos a experiência gastronômica única do Bambu em uma presença digital que converte visitantes em reservas.',
  3, 2, 'orange', 'orange',
  '2025', '+85% reservas online', 'https://restaurantebambu.com.br',
  'Gastronomia', 'Site, Sistema de Reservas, Cardápio Digital', '8 semanas',
  'O *desafio* de digitalizar uma experiência presencial',
  'O Restaurante Bambu tinha fila nos fins de semana, mas zero presença digital. As reservas eram 100% por telefone e o cardápio estava em papel desatualizado.',
  'Tínhamos medo de que um site muito moderno destoasse do nosso ambiente rústico. A Grito entendeu exatamente o que queríamos.',
  'Fernanda Melo', 'Sócia-fundadora, Restaurante Bambu',
  'restaurante-bambu-presenca-digital-completa', 0,
  '2026-05-18T10:00:00.000Z', '2026-05-20T10:00:00.000Z', '2026-05-18T10:00:00.000Z',
  'published', '2026-05-20T10:00:00.000Z', '2026-05-20T10:00:00.000Z', 1, 0
);

INSERT OR IGNORE INTO _portfolios_v (
  id, parent_id,
  version_title, version_client, version_summary,
  version_image_id, version_tag_id, version_tag_variant, version_accent,
  version_year, version_result, version_site_url,
  version_sector, version_deliverables, version_duration,
  version_challenge_title, version_challenge_body,
  version_quote_text, version_quote_author, version_quote_role,
  version_slug, version_generate_slug,
  version_published_at, version_updated_at, version_created_at,
  version__status, created_at, updated_at, latest, autosave
) VALUES (
  9, 3,
  'Moda Leste — Loja Virtual B2C',
  'Moda Leste',
  'Levamos uma marca regional de moda feminina ao digital, multiplicando o faturamento em menos de três meses.',
  10, 3, 'blue', 'blue',
  '2025', '+142% faturamento em 3 meses', 'https://modaleste.com.br',
  'Moda / E-commerce', 'Loja Virtual, Sistema de Fidelidade, Identidade de Marca', '12 semanas',
  'De loja física para *e-commerce* de alto desempenho',
  'A Moda Leste tinha uma base fiel de clientes na loja física, mas nenhuma operação digital.',
  'Nunca pensei que em 12 semanas eu teria uma loja online profissional gerando mais que a física.',
  'Carla Nascimento', 'Fundadora, Moda Leste',
  'moda-leste-loja-virtual-b2c', 0,
  '2026-05-18T10:00:00.000Z', '2026-05-20T10:00:00.000Z', '2026-05-18T10:00:00.000Z',
  'published', '2026-05-20T10:00:00.000Z', '2026-05-20T10:00:00.000Z', 1, 0
);

INSERT OR IGNORE INTO _portfolios_v (
  id, parent_id,
  version_title, version_client, version_summary,
  version_image_id, version_tag_id, version_tag_variant, version_accent,
  version_year, version_result, version_site_url,
  version_sector, version_deliverables, version_duration,
  version_challenge_title, version_challenge_body,
  version_quote_text, version_quote_author, version_quote_role,
  version_slug, version_generate_slug,
  version_published_at, version_updated_at, version_created_at,
  version__status, created_at, updated_at, latest, autosave
) VALUES (
  10, 4,
  'Clínica Renovar — Identidade e Site Institucional',
  'Clínica Renovar',
  'Reformulamos a identidade visual e o site de uma clínica estética consolidada, triplicando a geração de leads qualificados.',
  4, 4, 'orange', 'orange',
  '2024', '+210% leads qualificados', 'https://clinicarenovar.com.br',
  'Saúde / Bem-estar', 'Identidade Visual, Site Institucional, Material Gráfico', '6 semanas',
  'Como *reposicionar* uma clínica sem perder os clientes atuais',
  'A Clínica Renovar atendia há 8 anos com excelência, mas a identidade visual estava defasada.',
  'O site novo parece profissional de verdade. Os leads que chegam agora já vêm com o perfil certo.',
  'Dra. Renata Alves', 'Diretora Clínica, Clínica Renovar',
  'clinica-renovar-identidade-site-institucional', 0,
  '2026-05-15T10:00:00.000Z', '2026-05-20T10:00:00.000Z', '2026-05-15T10:00:00.000Z',
  'published', '2026-05-20T10:00:00.000Z', '2026-05-20T10:00:00.000Z', 1, 0
);
