import Link from 'next/link';
import JobCard from '@/components/jobs/JobCard';
import JobFilter from '@/components/jobs/JobFilter';
import { getAllJobs, filterJobs } from '@/lib/jobs';
import { JobType } from '@/types';
import { supabase } from '@/lib/server-supabase';
import { cookies } from 'next/headers';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { location?: string; jobType?: JobType };
}) {
  const cookieStore = await cookies();
  const supabaseClient = supabase(cookieStore) 
  
  // Get the user's session directly from the server client
  const { data: { session } } = await supabaseClient.auth.getSession();
  const { location, jobType } = searchParams;
  
  const jobs = location || jobType
    ? await filterJobs(supabaseClient,{ location, jobType })
    : await getAllJobs(supabaseClient);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
        {session && (
          <Link
            href="/jobs/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post a Job
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <JobFilter />
        </div>
        
        <div className="lg:col-span-3">
          {jobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500">
                {location || jobType
                  ? 'Try adjusting your filters to see more results'
                  : 'Check back later for new job postings'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
