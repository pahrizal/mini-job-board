import JobForm from '@/components/jobs/JobForm';
import { supabase } from '@/lib/server-supabase';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function NewJobPage() {
  const cookieStore = await cookies();
  const supabaseClient = supabase(cookieStore);
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    redirect('/auth/signin?message=You must be signed in to post a job');
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Post a New Job</h1>
        <JobForm userId={session.user.id} />
      </div>
    </div>
  );
}