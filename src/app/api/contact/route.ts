export async function POST(req: Request) {
  const body = await req.json() as { name?: string; email?: string; message?: string }
  // TODO: enviar email ou salvar no banco
  console.log('Contact form submission:', body)
  return Response.json({ ok: true })
}
