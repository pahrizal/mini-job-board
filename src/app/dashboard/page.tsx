import Link from 'next/link';
import { cookies } from 'next/headers';
import { getUserJobs } from '@/lib/jobs';
import JobListItem from '@/components/dashboard/JobListItem';
import { supabase } from '@/lib/server-supabase';

// Force dynamic rendering to ensure fresh data on each request
export const dynamic = 'force-dynamic';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  const cookieStore = await cookies();
  const supabaseClient = supabase(cookieStore);
  const { data: { session } } = await supabaseClient.auth.getSession();

  // Fetch jobs only if the session exists (although middleware should prevent access without it)
  const jobs = session ? await getUserJobs(supabaseClient, session.user.id) : [];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          {jobs.length > 0 && <Link
            href="/jobs/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post New Job
          </Link>}
        </div>
      </div>

      {searchParams.message && (
        <div className="mb-6 p-4 text-sm text-blue-700 bg-blue-100 rounded-lg">
          {searchParams.message}
        </div>
      )}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Job Listings</h2>
      
      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
          <p className="text-gray-500 mb-4">
            Start by creating your first job listing
          </p>
          <Link
            href="/jobs/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post a Job
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}