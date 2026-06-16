'use server'

export async function submitContact(data: {
  name: string
  email: string
  message: string
}): Promise<{ ok: boolean }> {
  // TODO: enviar email ou salvar no banco
  void data
  return { ok: true }
}
