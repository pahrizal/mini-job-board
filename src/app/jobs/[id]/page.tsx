import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJobById } from '@/lib/jobs';
import { getUserSession } from '@/lib/auth';

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id);
  const session = await getUserSession();
  
  if (!job) {
    notFound();
  }

  const isOwner = session && session.user.id === job.user_id;
  
  const formattedDate = new Date(job.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex items-center text-lg text-gray-700 mb-1">
                <span className="font-medium">{job.company_name}</span>
              </div>
              <div className="flex items-center text-gray-500 mb-4">
                <span>{job.location}</span>
                <span className="mx-2">&bull;</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {job.job_type}
                </span>
              </div>
            </div>
            
            {isOwner && (
              <div className="flex space-x-2">
                <Link
                  href={`/jobs/edit/${job.id}`}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit
                </Link>
                <Link
                  href={`/dashboard`}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>
          
          <div className="mt-6 border-t border-gray-100 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none text-gray-700">
              {job.description.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">
              Posted on {formattedDate}
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <Link href="/" className="text-indigo-600 hover:text-indigo-900">
            &larr; Back to all jobs
          </Link>
        </div>
      </div>
    </div>
  );
}