#!/usr/bin/env node
// Hook PostToolUse: si el archivo tocado (Edit/Write/MultiEdit) vive dentro
// de frontend/, lo formatea con Prettier. Cualquier otro archivo se ignora.
import { execSync } from 'node:child_process'
import path from 'node:path'

let raw = ''
process.stdin.on('data', (chunk) => (raw += chunk))
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw || '{}')
    const filePath =
      input?.tool_input?.file_path ||
      input?.tool_input?.path ||
      input?.tool_response?.filePath

    if (!filePath) process.exit(0)

    const normalized = filePath.replace(/\\/g, '/')
    const marker = '/frontend/'
    const idx = normalized.indexOf(marker)
    if (idx === -1) process.exit(0)
    if (!/\.(ts|tsx|js|jsx|css|json|html|md)$/.test(normalized)) process.exit(0)

    const repoRoot = path.resolve(import.meta.dirname, '..', '..')
    const frontendDir = path.join(repoRoot, 'frontend')

    execSync(`npx --yes prettier --write ${JSON.stringify(filePath)}`, {
      cwd: frontendDir,
      stdio: 'inherit',
    })
  } catch (err) {
    console.error('[format-frontend hook]', err instanceof Error ? err.message : err)
  }
  process.exit(0)
})
