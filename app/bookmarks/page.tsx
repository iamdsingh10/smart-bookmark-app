import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'
import BookmarkDashboard from '@/components/BookmarkDashboard'

export default async function BookmarksPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <div className="header">
        <h1>Your Bookmarks</h1>
        <form action="/auth/signout" method="POST">
          <button type="submit" className="signout-btn">
            Sign Out
          </button>
        </form>
      </div>
      <BookmarkDashboard />
    </div>
  )
}