-- ============================================================
-- SEED: Demo content - 3 portfolios + 3 blog posts
-- ============================================================

-- Portfolio Tags
INSERT OR IGNORE INTO portfolio_tags (id, title, slug, generate_slug, updated_at, created_at)
VALUES
  (2, 'Web Design', 'web-design', 0, '2026-05-20T10:00:00.000Z', '2026-05-20T10:00:00.000Z'),
  (3, 'E-commerce', 'e-commerce', 0, '2026-05-20T10:00:00.000Z', '2026-05-20T10:00:00.000Z'),
  (4, 'Branding', 'branding', 0, '2026-05-20T10:00:00.000Z', '2026-05-20T10:00:00.000Z');

-- Post Tags
INSERT OR IGNORE INTO tags (id, title, slug, generate_slug, updated_at, created_at)
VALUES
  (1, 'Design', 'design', 0, '2026-05-20T10:00:00.000Z', '2026-05-20T10:00:00.000Z'),
  (2, 'Performance', 'performance', 0, '2026-05-20T10:00:00.000Z', '2026-05-20T10:00:00.000Z'),
  (3, 'Branding', 'branding', 0, '2026-05-20T10:00:00.000Z', '2026-05-20T10:00:00.000Z');

-- ============================================================
-- PORTFOLIOS
-- ============================================================

-- Portfolio 1: Restaurante Bambu
INSERT OR IGNORE INTO portfolios (
  id, title, client, summary, image_id, tag_id, tag_variant, accent, year,
  result, site_url, sector, deliverables, duration,
  challenge_title, challenge_body,
  quote_text, quote_author, quote_role,
  slug, generate_slug, published_at, updated_at, created_at, _status
) VALUES (
  2,
  'Restaurante Bambu — Presença Digital Completa',
  'Restaurante Bambu',
  'Transformamos a experiência gastronômica única do Bambu em uma presença digital que converte visitantes em reservas.',
  3,
  2,
  'orange',
  'orange',
  '2025',
  '+85% reservas online',
  'https://restaurantebambu.com.br',
  'Gastronomia',
  'Site, Sistema de Reservas, Cardápio Digital',
  '8 semanas',
  'O *desafio* de digitalizar uma experiência presencial',
  'O Restaurante Bambu tinha fila nos fins de semana, mas zero presença digital. As reservas eram 100% por telefone e o cardápio estava em papel desatualizado.

O desafio era criar uma presença digital que transmitisse o ambiente aconchegante e a culinária autoral da casa — sem parecer mais um site de restaurante genérico.

Mapeamos toda a jornada do cliente: desde a descoberta no Google até a chegada no restaurante. Cada toque digital precisava reforçar a expectativa criada.',
  'Tínhamos medo de que um site muito moderno destoasse do nosso ambiente rústico. A Grito entendeu exatamente o que queríamos — trouxe o calor do Bambu para o digital.',
  'Fernanda Melo',
  'Sócia-fundadora, Restaurante Bambu',
  'restaurante-bambu-presenca-digital-completa',
  0,
  '2026-05-18T10:00:00.000Z',
  '2026-05-20T10:00:00.000Z',
  '2026-05-18T10:00:00.000Z',
  'published'
);

-- Portfolio 2: Moda Leste
INSERT OR IGNORE INTO portfolios (
  id, title, client, summary, image_id, tag_id, tag_variant, accent, year,
  result, site_url, sector, deliverables, duration,
  challenge_title, challenge_body,
  quote_text, quote_author, quote_role,
  slug, generate_slug, published_at, updated_at, created_at, _status
) VALUES (
  3,
  'Moda Leste — Loja Virtual B2C',
  'Moda Leste',
  'Levamos uma marca regional de moda feminina ao digital, multiplicando o faturamento em menos de três meses.',
  10,
  3,
  'blue',
  'blue',
  '2025',
  '+142% faturamento em 3 meses',
  'https://modaleste.com.br',
  'Moda / E-commerce',
  'Loja Virtual, Sistema de Fidelidade, Identidade de Marca',
  '12 semanas',
  'De loja física para *e-commerce* de alto desempenho',
  'A Moda Leste tinha uma base fiel de clientes na loja física, mas nenhuma operação digital. A fundadora vendia pelo WhatsApp e Instagram — sem sistema de pagamento, sem controle de estoque, sem automações.

Nosso trabalho foi estruturar toda a operação digital do zero: plataforma de e-commerce, identidade visual renovada, fluxos de automação e uma estratégia de lançamento que gerou faturamento desde o primeiro dia.

A migração precisava ser feita sem interromper as vendas presenciais — o que exigiu planejamento cuidadoso e execução em fases.',
  'Nunca pensei que em 12 semanas eu teria uma loja online profissional gerando mais que a física. A Grito fez isso acontecer de forma organizada e sem estresse.',
  'Carla Nascimento',
  'Fundadora, Moda Leste',
  'moda-leste-loja-virtual-b2c',
  0,
  '2026-05-18T10:00:00.000Z',
  '2026-05-20T10:00:00.000Z',
  '2026-05-18T10:00:00.000Z',
  'published'
);

-- Portfolio 3: Clínica Renovar
INSERT OR IGNORE INTO portfolios (
  id, title, client, summary, image_id, tag_id, tag_variant, accent, year,
  result, site_url, sector, deliverables, duration,
  challenge_title, challenge_body,
  quote_text, quote_author, quote_role,
  slug, generate_slug, published_at, updated_at, created_at, _status
) VALUES (
  4,
  'Clínica Renovar — Identidade e Site Institucional',
  'Clínica Renovar',
  'Reformulamos a identidade visual e o site de uma clínica estética consolidada, triplicando a geração de leads qualificados.',
  4,
  4,
  'orange',
  'orange',
  '2024',
  '+210% leads qualificados',
  'https://clinicarenovar.com.br',
  'Saúde / Bem-estar',
  'Identidade Visual, Site Institucional, Material Gráfico',
  '6 semanas',
  'Como *reposicionar* uma clínica sem perder os clientes atuais',
  'A Clínica Renovar atendia há 8 anos com excelência, mas a identidade visual estava defasada e o site antigo não convertia. O Google Analytics mostrava um bounce rate de 78% — a maioria dos visitantes saia antes de preencher qualquer formulário.

O desafio era duplo: modernizar sem alienar a base fiel de pacientes, e ao mesmo tempo atrair um perfil de cliente com maior poder aquisitivo para os novos procedimentos de alta performance.

Conduzimos um processo de discovery com entrevistas com pacientes atuais e potenciais. Os insights guiaram cada decisão de design e copy.',
  'O site novo parece profissional de verdade. Recebemos elogios dos próprios pacientes. E os leads que chegam agora já vêm com o perfil certo — sabem o que querem e estão prontos para agendar.',
  'Dra. Renata Alves',
  'Diretora Clínica, Clínica Renovar',
  'clinica-renovar-identidade-site-institucional',
  0,
  '2026-05-15T10:00:00.000Z',
  '2026-05-20T10:00:00.000Z',
  '2026-05-15T10:00:00.000Z',
  'published'
);

-- ============================================================
-- PROCESS STEPS
-- ============================================================

-- Portfolio 2 (Bambu) process steps
INSERT OR IGNORE INTO portfolios_process_steps (_order, _parent_id, id, number, title, description)
VALUES
  (1, 2, 'bambu-step-1', '01', 'Discovery', 'Imersão na operação e jornada do cliente: entrevistas com equipe, análise de concorrentes e mapeamento de oportunidades digitais.'),
  (2, 2, 'bambu-step-2', '02', 'Estratégia de conteúdo', 'Definição da voz da marca, hierarquia de informação e arquitetura do site com foco em conversão para reservas.'),
  (3, 2, 'bambu-step-3', '03', 'Design & Dev', 'Criação do layout com identidade visual alinhada ao ambiente do restaurante, integração com sistema de reservas e cardápio digital.'),
  (4, 2, 'bambu-step-4', '04', 'Lançamento', 'Go-live com campanha de divulgação nas redes sociais, treinamento da equipe e monitoramento dos primeiros 30 dias.');

-- Portfolio 3 (Moda Leste) process steps
INSERT OR IGNORE INTO portfolios_process_steps (_order, _parent_id, id, number, title, description)
VALUES
  (1, 3, 'moda-step-1', '01', 'Diagnóstico', 'Análise do modelo atual de vendas, pesquisa com clientes e benchmark de e-commerces de moda regional.'),
  (2, 3, 'moda-step-2', '02', 'Identidade & Plataforma', 'Renovação da identidade visual da marca e configuração da plataforma de e-commerce com catálogo, pagamentos e frete.'),
  (3, 3, 'moda-step-3', '03', 'Automações', 'Fluxos de e-mail marketing, recuperação de carrinho abandonado, programa de fidelidade e integração com WhatsApp Business.'),
  (4, 3, 'moda-step-4', '04', 'Lançamento em fases', 'Soft launch para clientes da loja física, ajustes baseados em dados, depois lançamento público com tráfego pago.');

-- Portfolio 4 (Clínica) process steps
INSERT OR IGNORE INTO portfolios_process_steps (_order, _parent_id, id, number, title, description)
VALUES
  (1, 4, 'clinica-step-1', '01', 'Discovery', 'Entrevistas com pacientes atuais e potenciais, análise de SEO e mapeamento da jornada de agendamento.'),
  (2, 4, 'clinica-step-2', '02', 'Identidade Visual', 'Redesign completo da marca: paleta de cores, tipografia, iconografia e sistema de design consistente.'),
  (3, 4, 'clinica-step-3', '03', 'Site & Conversão', 'Novo site institucional com copy orientado a conversão, formulários otimizados e integração com WhatsApp.'),
  (4, 4, 'clinica-step-4', '04', 'Material Gráfico', 'Adaptação da identidade para materiais offline: papelaria, sinalização da clínica e redes sociais.');

-- ============================================================
-- STATS
-- ============================================================

-- Portfolio 2 (Bambu) stats
INSERT OR IGNORE INTO portfolios_stats (_order, _parent_id, id, value, label)
VALUES
  (1, 2, 'bambu-stat-1', '+85%', 'reservas online em 60 dias'),
  (2, 2, 'bambu-stat-2', '-40%', 'ligações para reservar mesa'),
  (3, 2, 'bambu-stat-3', '4.8/5', 'avaliação no Google após o site');

-- Portfolio 3 (Moda Leste) stats
INSERT OR IGNORE INTO portfolios_stats (_order, _parent_id, id, value, label)
VALUES
  (1, 3, 'moda-stat-1', '+142%', 'faturamento nos 3 primeiros meses'),
  (2, 3, 'moda-stat-2', '+78%', 'ticket médio vs. vendas pelo WhatsApp'),
  (3, 3, 'moda-stat-3', '3.2x', 'ROAS nas campanhas de tráfego pago');

-- Portfolio 4 (Clínica) stats
INSERT OR IGNORE INTO portfolios_stats (_order, _parent_id, id, value, label)
VALUES
  (1, 4, 'clinica-stat-1', '+210%', 'leads qualificados por mês'),
  (2, 4, 'clinica-stat-2', '-55%', 'custo por lead vs. mídia tradicional'),
  (3, 4, 'clinica-stat-3', '+38%', 'taxa de conversão de visita em agendamento');

-- ============================================================
-- UPDATE EXISTING POSTS with featured images + excerpts
-- ============================================================

UPDATE posts SET
  featured_image_id = 3,
  excerpt = 'Sete micro-decisões de UX que fazem a diferença na hora que o cliente chega no checkout. Com dados reais de testes A/B.',
  published_at = '2026-05-18T08:00:00.000Z'
WHERE id = 1 AND featured_image_id IS NULL;

UPDATE posts SET
  featured_image_id = 10,
  excerpt = 'O que ainda importa em performance web em 2026 — e o que você pode parar de se preocupar de uma vez por todas.',
  published_at = '2026-05-12T08:00:00.000Z'
WHERE id = 2 AND featured_image_id IS NULL;

UPDATE posts SET
  featured_image_id = 4,
  excerpt = 'A diferença entre marcas que parecem acessíveis e as que parecem exclusivas está no tom, não no produto.',
  published_at = '2026-05-05T08:00:00.000Z'
WHERE id = 3 AND featured_image_id IS NULL;

-- ============================================================
-- NEW POST 4: SEO Técnico
-- ============================================================
INSERT OR IGNORE INTO posts (
  id, title, excerpt, content,
  featured_image_id, published_at, slug, generate_slug,
  updated_at, created_at, _status
) VALUES (
  4,
  'SEO técnico sem enrolação: o checklist que usamos antes de todo lançamento',
  'Uma lista direta do que verificamos em toda migração ou novo site — sem firula e com foco no que realmente afeta o ranqueamento.',
  '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Por que checklists importam mais que ferramentas","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"SEO técnico tem um problema: a maioria dos guias lista dezenas de itens que pouco importam e ignora os três ou quatro que realmente movem o ponteiro. Depois de centenas de auditorias, chegamos ao nosso próprio checklist — enxuto, direto e baseado no que de fato impacta o ranqueamento.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"1. Core Web Vitals: o básico que todo mundo ignora","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"LCP abaixo de 2.5s, FID abaixo de 100ms e CLS abaixo de 0.1. Esses são os números do Google. Se o seu site não passa neles, esqueça o resto — comece por aqui. Use o PageSpeed Insights com dados de campo (CrUX), não de laboratório.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"2. Crawlability: o Google consegue acessar o que importa?","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Robots.txt bloqueando JS ou CSS, sitemap desatualizado, noindex em páginas que deveriam rankear — esses são erros comuns que aparecem em quase toda migração que auditamos. Cheque o coverage report no Google Search Console antes de qualquer coisa.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"3. Estrutura de links internos","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Páginas importantes com zero links internos apontando para elas são páginas invisíveis. O Google usa links internos para entender hierarquia e relevância. Mapeie suas páginas de maior valor e garanta que estão linkadas a partir de pelo menos três páginas relacionadas.","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Esses três itens — performance, crawlability e links internos — são responsáveis pela maioria dos gains que vemos após auditorias. O resto é refinamento.","version":1}],"direction":"ltr"}],"direction":"ltr"}}',
  3,
  '2026-04-28T08:00:00.000Z',
  'seo-tecnico-sem-enrolacao-checklist',
  0,
  '2026-05-20T10:00:00.000Z',
  '2026-04-28T08:00:00.000Z',
  'published'
);

-- ============================================================
-- NEW POST 5: Copywriting
-- ============================================================
INSERT OR IGNORE INTO posts (
  id, title, excerpt, content,
  featured_image_id, published_at, slug, generate_slug,
  updated_at, created_at, _status
) VALUES (
  5,
  'Copywriting para pequenas empresas: como escrever sem parecer que você está vendendo',
  'O erro mais comum de PMEs no digital é escrever como grande empresa. Veja como encontrar seu tom e usar isso a favor da conversão.',
  '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"O paradoxo do pequeno negócio","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Pequenas empresas têm uma vantagem que grandes marcas pagam caro para simular: autenticidade. Mas a maioria joga isso fora tentando escrever como um banco ou uma seguradora — formal, impessoal e sem nenhuma personalidade.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Concreto bate abstrato toda vez","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"\"Qualidade e comprometimento\" não significam nada. \"Entregamos em 48h ou devolvemos o dinheiro\" significa tudo. Cada vez que você escrever um adjetivo vago, pergunte: qual é o dado ou exemplo concreto por trás disso?","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Fale do problema antes da solução","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"O leitor não está pensando na sua empresa — está pensando no problema dele. A cópia que mais converte começa pelo problema do cliente com precisão cirúrgica, antes de apresentar qualquer solução. Se a pessoa ler o primeiro parágrafo e pensar \"é exatamente isso que eu sinto\", você está no caminho certo.","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Esses princípios valem para landing pages, posts e até para o texto do botão. Copy simples, direto e honesto converte mais do que copy sofisticado e vago.","version":1}],"direction":"ltr"}],"direction":"ltr"}}',
  10,
  '2026-04-20T08:00:00.000Z',
  'copywriting-pequenas-empresas-sem-parecer-venda',
  0,
  '2026-05-20T10:00:00.000Z',
  '2026-04-20T08:00:00.000Z',
  'published'
);

-- ============================================================
-- NEW POST 6: Design System
-- ============================================================
INSERT OR IGNORE INTO posts (
  id, title, excerpt, content,
  featured_image_id, published_at, slug, generate_slug,
  updated_at, created_at, _status
) VALUES (
  6,
  'Design system para PMEs: quando faz sentido e quando é exagero',
  'Nem todo projeto precisa de um design system completo. Entenda o ponto de equilíbrio entre consistência visual e velocidade de entrega.',
  '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"O problema com a febre de design systems","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Design system virou moda. Todo projeto que abre, alguém sugere \"a gente deveria criar um design system\". O problema é que construir e manter um design system tem um custo real — e para a maioria das PMEs, esse custo não se paga.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Quando faz sentido","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Design system faz sentido quando: você tem múltiplas interfaces sendo desenvolvidas em paralelo, tem um time de design e dev trabalhando de forma contínua, ou quando a inconsistência visual já está causando problemas reais de conversão ou experiência.","version":1}],"direction":"ltr"},{"type":"heading","tag":"h2","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"A alternativa prática: style guide + componentes","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"Para a maioria das PMEs, um style guide simples (cores, tipografia, espaçamentos) combinado com uma biblioteca de componentes reutilizáveis resolve 90% dos problemas de consistência sem o overhead de um design system completo. É o que recomendamos na maioria dos projetos que tocamos.","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"type":"text","detail":0,"format":0,"mode":"normal","style":"","text":"A regra prática: se você não vai usar mais de 20 componentes diferentes em todo o projeto, você provavelmente não precisa de um design system. Você precisa de um bom style guide e disciplina na execução.","version":1}],"direction":"ltr"}],"direction":"ltr"}}',
  4,
  '2026-04-12T08:00:00.000Z',
  'design-system-pmes-quando-faz-sentido',
  0,
  '2026-05-20T10:00:00.000Z',
  '2026-04-12T08:00:00.000Z',
  'published'
);

-- Post tags relationships
INSERT OR IGNORE INTO posts_rels (id, "order", parent_id, path, tags_id)
VALUES
  (1, 1, 1, 'tags', 1),
  (2, 1, 2, 'tags', 2),
  (3, 1, 3, 'tags', 3),
  (4, 1, 4, 'tags', 2),
  (5, 1, 5, 'tags', 3),
  (6, 1, 6, 'tags', 1);
