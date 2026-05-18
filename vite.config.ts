import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync } from 'node:fs'

const hasCustomDomain = existsSync('./public/CNAME')
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = hasCustomDomain
  ? '/'
  : process.env.GITHUB_ACTIONS && repository
    ? `/${repository}/`
    : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
