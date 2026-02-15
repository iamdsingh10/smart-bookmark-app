import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabaseServer'

export async function GET(request: Request) {
  const supabase = await createClient() // ✅ await is REQUIRED

  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.redirect(new URL('/bookmarks', request.url))
}
