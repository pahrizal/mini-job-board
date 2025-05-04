'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'; // Import client component client
import { Job, JobType } from '@/types';
import { createJob, updateJob } from '@/lib/jobs';

type JobFormProps = {
  job?: Job;
  userId: string;
};

export default function JobForm({ job, userId }: JobFormProps) {
  const isEditing = !!job;
  const router = useRouter();
  // Initialize the Supabase client here, once per component instance
  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState({
    title: job?.title || '',
    company_name: job?.company_name || '',
    description: job?.description || '',
    location: job?.location || '',
    job_type: job?.job_type || 'Full-Time' as JobType,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing && job) {
        // Pass the authenticated client to updateJob
        await updateJob(supabase, job.id, {
          ...formData,
          user_id: userId, // user_id is already passed correctly
        });
      } else {
        // Pass the authenticated client to createJob
        await createJob(supabase, {
          ...formData,
          user_id: userId,
        });
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      setError(error.message || 'An error occurred while saving the job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-900">
          Job Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
        />
      </div>

      <div>
        <label htmlFor="company_name" className="block text-sm font-medium text-slate-900">
          Company Name
        </label>
        <input
          id="company_name"
          name="company_name"
          type="text"
          required
          value={formData.company_name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-slate-900">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          required
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
        />
      </div>

      <div>
        <label htmlFor="job_type" className="block text-sm font-medium text-slate-900">
          Job Type
        </label>
        <select
          id="job_type"
          name="job_type"
          required
          value={formData.job_type}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-900">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={6}
          required
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="mr-4 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Job' : 'Post Job'}
        </button>
      </div>
    </form>
  );
}