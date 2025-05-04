'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Job } from '@/types';
import { deleteJob } from '@/lib/jobs';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

type JobListItemProps = {
  job: Job;
};

export default function JobListItem({ job }: JobListItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabaseClient = createBrowserSupabaseClient();
  const formattedDate = new Date(job.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this job?')) {
      setIsDeleting(true);
      
      try {
        await deleteJob(job.id, supabaseClient);
        router.refresh();
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              <Link href={`/jobs/${job.id}`} className="hover:text-indigo-600">
                {job.title}
              </Link>
            </h3>
            <p className="text-gray-700">{job.company_name}</p>
            <div className="flex items-center text-gray-500 mt-1">
              <span>{job.location}</span>
              <span className="mx-2">&bull;</span>
              <span>{job.job_type}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/jobs/${job.id}`}
              className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
            >
              View
            </Link>
            <Link
              href={`/jobs/edit/${job.id}`}
              className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-2 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Posted on {formattedDate}
        </p>
      </div>
    </div>
  );
}