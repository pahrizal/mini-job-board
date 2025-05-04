import { SupabaseClient, createClient } from '@supabase/supabase-js'; // Keep createClient for functions not needing auth
import { Job, JobType } from '@/types';

export async function getAllJobs() {
  try {
    // Create server-side Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
        }
      }
    );
    
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data as Job[];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export async function getJobById(id: string) {
  try {
    // Create server-side Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
        }
      }
    );
    
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as Job;
  } catch (error) {
    console.error(`Error fetching job with id ${id}:`, error);
    return null;
  }
}

export async function getUserJobs(supabase: SupabaseClient, userId: string) {
  try {
    console.log(`Fetching jobs for user ID: ${userId}`);
    
    // Verify that we have a valid user_id before querying
    if (!userId) {
      console.error('No user ID provided to getUserJobs');
      return [];
    }
    
    // Use the provided Supabase client instance
    
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Database error when fetching jobs:`, error.message);
      throw error;
    }

    console.log(`Found ${data?.length || 0} jobs for user ${userId}`);
    return data as Job[];
  } catch (error: any) {
    console.error(`Error fetching jobs for user ${userId}:`, error?.message || error);
    return [];
  }
}

export async function createJob(jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>) {
  try {
    // Create server-side Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
        }
      }
    );
    
    const { data, error } = await supabase
      .from('jobs')
      .insert([jobData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Job;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
}

export async function updateJob(id: string, jobData: Partial<Omit<Job, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    // Create server-side Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
        }
      }
    );
    
    const { data, error } = await supabase
      .from('jobs')
      .update(jobData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Job;
  } catch (error) {
    console.error(`Error updating job with id ${id}:`, error);
    throw error;
  }
}

export async function deleteJob(id: string) {
  try {
    // Create server-side Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
        }
      }
    );
    
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error(`Error deleting job with id ${id}:`, error);
    return false;
  }
}

export async function filterJobs({ location, jobType }: { location?: string; jobType?: JobType }) {
  try {
    // Create server-side Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
        }
      }
    );
    
    let query = supabase.from('jobs').select('*');

    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    if (jobType) {
      query = query.eq('job_type', jobType);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data as Job[];
  } catch (error) {
    console.error('Error filtering jobs:', error);
    return [];
  }
}