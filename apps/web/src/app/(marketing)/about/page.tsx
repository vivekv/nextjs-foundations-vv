import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our mission and team',
}

async function getAboutData() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return { founded: 2026, team: 'Distributed' }
}

 
export default async function AboutPage() {
    // Fetch about page data (simulates a 2-second delay)
    const data = await getAboutData()

    return (
        <div className="max-w-2xl">
            {/* Page heading */}
            <h1 className="mb-4 font-bold text-3xl">About Us</h1>

            {/* Description of the marketing layout */}
            <p className="mb-4 text-gray-600">
                This page uses the marketing layout. Notice the header and footer
                are defined once in the layout and wrap this content automatically.
            </p>

            {/* Display company info from fetched data */}
            <p className="text-gray-500 text-sm">
                Founded: {data.founded} · Team: {data.team}
            </p>
        </div>
    )
}