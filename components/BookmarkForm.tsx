'use client'

import { useState, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Bookmark } from './BookmarkDashboard'

type Props = {
  onAdd?: (bookmark: Bookmark) => void
}

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export default function BookmarkForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addBookmark = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !url.trim()) {
      setError('Please enter both a title and URL.')
      return
    }

    let finalUrl = url.trim()
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl
    }
    if (!isValidUrl(finalUrl)) {
      setError('Please enter a valid URL (e.g. google.com)')
      return
    }
    

    try {
      setLoading(true)

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        setError('You must be logged in.')
        return
      }

      const { data, error: insertError } = await supabase
        .from('bookmarks')
        .insert({
          title: title.trim(),
          url: finalUrl,
          user_id: user.id,
        })
        .select()
        .single()

      if (insertError) {
        console.error('Insert error:', insertError)
        setError(insertError.message)
        return
      }

      setTitle('')
      setUrl('')
      if (data) onAdd?.(data)
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={addBookmark} className="bookmark-form">
      <input
        placeholder="Bookmark Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      {error && <p className="error-msg">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Bookmark'}
      </button>
    </form>
  )
}