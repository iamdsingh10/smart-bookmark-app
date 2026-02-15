'use client'

import { useState, useCallback } from 'react'
import BookmarkForm from './BookmarkForm'
import BookmarkList from './BookmarkList'

export type Bookmark = {
  id: string
  title: string
  url: string
}

export default function BookmarkDashboard() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  const handleAdd = useCallback((bookmark: Bookmark) => {
    setBookmarks((prev) => [bookmark, ...prev])
  }, [])

  const handleDelete = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }, [])

  return (
    <>
      <BookmarkForm onAdd={handleAdd} />
      <BookmarkList
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
        onDelete={handleDelete}
      />
    </>
  )
}