'use client'

import React, { useState } from 'react'
import { useAuth, toast, Button } from '@payloadcms/ui'
import { QRCodeSVG } from 'qrcode.react'

type Step = 'idle' | 'setup' | 'disable'

async function apiFetch(path: string, body?: object): Promise<Record<string, unknown>> {
  const res = await fetch(path, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body ?? {}),
  })
  const data = (await res.json()) as Record<string, unknown>
  if (!res.ok) {
    const errors = data.errors as Array<{ message: string }> | undefined
    throw new Error(errors?.[0]?.message ?? 'Erro desconhecido')
  }
  return data
}

export default function TwoFactorAdmin() {
  const { user, refreshCookieAsync } = useAuth()
  const isEnabled = (user as any)?.twoFactorEnabled as boolean | undefined

  const [step, setStep] = useState<Step>('idle')
  const [uri, setUri] = useState('')
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([])
  const [codesConfirmed, setCodesConfirmed] = useState(false)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  function reset() {
    setStep('idle')
    setUri('')
    setRecoveryCodes([])
    setCodesConfirmed(false)
    setCode('')
  }

  async function startSetup() {
    setLoading(true)
    try {
      const data = await apiFetch('/api/users/2fa/setup')
      setUri(data.uri as string)
      setRecoveryCodes(data.recoveryCodes as string[])
      setStep('setup')
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function confirmSetup() {
    setLoading(true)
    try {
      await apiFetch('/api/users/2fa/confirm', { code })
      toast.success('Autenticação em dois fatores ativada.')
      reset()
      await refreshCookieAsync?.()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function confirmDisable() {
    setLoading(true)
    try {
      await apiFetch('/api/users/2fa/disable', { code })
      toast.success('Autenticação em dois fatores desativada.')
      reset()
      await refreshCookieAsync?.()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  // ── idle: show current status ────────────────────────────────────────────
  if (step === 'idle') {
    return (
      <div style={{ padding: '1rem 0', borderTop: '1px solid var(--theme-elevation-100)', marginTop: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 600 }}>
          Autenticação em dois fatores (2FA)
        </h3>
        <p style={{ margin: '0 0 1rem', color: 'var(--theme-elevation-400)', fontSize: '0.875rem' }}>
          {isEnabled
            ? 'Ativo — o login exige um código do seu aplicativo autenticador.'
            : 'Inativo — ative para proteger sua conta com TOTP.'}
        </p>
        {isEnabled ? (
          <Button onClick={() => setStep('disable')} buttonStyle="secondary" size="small">
            Desativar 2FA
          </Button>
        ) : (
          <Button onClick={startSetup} disabled={loading} size="small">
            {loading ? 'Aguarde…' : 'Ativar 2FA'}
          </Button>
        )}
      </div>
    )
  }

  // ── setup: scan QR + save recovery codes + confirm first TOTP ────────────
  if (step === 'setup') {
    return (
      <div style={{ padding: '1rem 0', borderTop: '1px solid var(--theme-elevation-100)', marginTop: '1rem' }}>
        <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600 }}>
          Configurar autenticação em dois fatores
        </h3>

        <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem' }}>
          <strong>1.</strong> Escaneie o QR code com Google Authenticator, Authy ou similar.
        </p>
        <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '0.75rem', background: '#fff', borderRadius: '8px', border: '1px solid var(--theme-elevation-100)' }}>
          <QRCodeSVG value={uri} size={180} />
        </div>

        <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem' }}>
          <strong>2.</strong> Guarde os códigos de recuperação — são de uso único e a única
          forma de acessar a conta se perder o celular.
        </p>
        <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', background: 'var(--theme-elevation-50)', border: '1px solid var(--theme-elevation-100)', borderRadius: '6px', padding: '0.75rem', marginBottom: '0.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem 1.5rem' }}>
          {recoveryCodes.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '1.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={codesConfirmed}
            onChange={(e) => setCodesConfirmed(e.target.checked)}
          />
          Salvei os códigos de recuperação
        </label>

        <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem' }}>
          <strong>3.</strong> Digite o código de 6 dígitos do aplicativo para confirmar.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', marginBottom: '1rem' }}>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            style={{ width: '8rem', padding: '0.5rem 0.75rem', fontSize: '1.25rem', letterSpacing: '0.25em', border: '1px solid var(--theme-elevation-200)', borderRadius: '4px', background: 'var(--theme-input-bg)', color: 'var(--theme-text)' }}
          />
          <Button
            onClick={confirmSetup}
            disabled={loading || code.length < 6 || !codesConfirmed}
            size="small"
          >
            {loading ? 'Verificando…' : 'Confirmar e ativar'}
          </Button>
          <Button onClick={reset} buttonStyle="secondary" size="small" disabled={loading}>
            Cancelar
          </Button>
        </div>
      </div>
    )
  }

  // ── disable ──────────────────────────────────────────────────────────────
  return (
    <div style={{ padding: '1rem 0', borderTop: '1px solid var(--theme-elevation-100)', marginTop: '1rem' }}>
      <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 600 }}>
        Desativar autenticação em dois fatores
      </h3>
      <p style={{ margin: '0 0 1rem', color: 'var(--theme-elevation-400)', fontSize: '0.875rem' }}>
        Digite o código do aplicativo autenticador (ou um código de recuperação) para confirmar.
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={20}
          placeholder="Código TOTP ou recuperação"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\s/g, ''))}
          style={{ width: '16rem', padding: '0.5rem 0.75rem', fontSize: '1rem', border: '1px solid var(--theme-elevation-200)', borderRadius: '4px', background: 'var(--theme-input-bg)', color: 'var(--theme-text)' }}
        />
        <Button
          onClick={confirmDisable}
          disabled={loading || !code}
          buttonStyle="error"
          size="small"
        >
          {loading ? 'Aguarde…' : 'Desativar'}
        </Button>
        <Button onClick={reset} buttonStyle="secondary" size="small" disabled={loading}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}
