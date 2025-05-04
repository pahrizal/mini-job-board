'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { JobType } from '@/types';

export default function JobFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [jobType, setJobType] = useState<JobType | ''>(searchParams.get('jobType') as JobType || '');

  useEffect(() => {
    setLocation(searchParams.get('location') || '');
    setJobType(searchParams.get('jobType') as JobType || '');
  }, [searchParams]);

  const handleFilter = () => {
    const params = new URLSearchParams();
    
    if (location) {
      params.set('location', location);
    }
    
    if (jobType) {
      params.set('jobType', jobType);
    }
    
    router.push(`/?${params.toString()}`);
  };

  const handleClear = () => {
    setLocation('');
    setJobType('');
    router.push('/');
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
      <h2 className="text-lg font-medium text-slate-900 mb-4">Filter Jobs</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-900 mb-1">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Remote, New York, London"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
          />
        </div>
        
        <div>
          <label htmlFor="jobType" className="block text-sm font-medium text-slate-900 mb-1">
            Job Type
          </label>
          <select
            id="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value as JobType)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-900"
          >
            <option value="">All Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleFilter}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Apply Filters
          </button>
          
          <button
            onClick={handleClear}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}