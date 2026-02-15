'use client'

import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Bookmark } from './BookmarkDashboard'

type Props = {
  bookmarks: Bookmark[]
  setBookmarks: Dispatch<SetStateAction<Bookmark[]>>
  onDelete: (id: string) => void
}

export default function BookmarkList({ bookmarks, setBookmarks, onDelete }: Props) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('FETCH ERROR:', error)
      } else {
        setBookmarks(data || [])
      }
      setLoading(false)
    }

    fetchBookmarks()
  }, [setBookmarks])

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('DELETE ERROR:', error)
    } else {
      onDelete(id)
    }
  }

  if (loading) {
    return <p className="status-msg">Loading bookmarks...</p>
  }

  if (bookmarks.length === 0) {
    return <p className="status-msg">No bookmarks yet. Add one above!</p>
  }

  return (
    <ul>
      {bookmarks.map((b) => (
        <li key={b.id}>
          <a href={b.url} target="_blank" rel="noopener noreferrer">
            {b.title}
          </a>
          <button
            className="delete-btn"
            onClick={() => deleteBookmark(b.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}