import { redirect, notFound } from 'next/navigation';
import JobForm from '@/components/jobs/JobForm';
import { getUserSession } from '@/lib/auth';
import { getJobById } from '@/lib/jobs';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/server-supabase';

export default async function EditJobPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const supabaseClient = supabase(cookieStore);
  // Get the user's session directly from the server client
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    redirect('/auth/signin?message=You must be signed in to edit a job');
  }

  const job = await getJobById(params.id, supabaseClient);

  if (!job) {
    notFound();
  }

  if (job.user_id !== session.user.id) {
    redirect('/dashboard?message=You can only edit your own job postings');
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit Job</h1>
        <JobForm job={job} userId={session.user.id} />
      </div>
    </div>
  );
}