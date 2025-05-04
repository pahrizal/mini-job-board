import Link from 'next/link';
import { Job } from '@/types';

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const formattedDate = new Date(job.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-slate-900 mb-1">
            <Link href={`/jobs/${job.id}`} className="hover:text-indigo-600">
              {job.title}
            </Link>
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {job.job_type}
          </span>
        </div>
        <p className="text-slate-900 font-medium">{job.company_name}</p>
        <p className="text-slate-700 text-sm mb-3">{job.location}</p>
        
        <p className="text-slate-800 mb-4 line-clamp-3">
          {job.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-slate-700 text-sm">Posted on {formattedDate}</span>
          <Link 
            href={`/jobs/${job.id}`}
            className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
          >
            View Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}