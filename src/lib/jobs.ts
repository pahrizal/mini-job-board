import { SupabaseClient } from '@supabase/supabase-js'; // Removed createClient import
import { Job, JobType } from '@/types';
import { supabase } from './server-supabase';

export async function getAllJobs(supabaseClient:SupabaseClient) {
  try {    
    const { data, error } = await supabaseClient
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

export async function getJobById(id: string, supabaseClient:SupabaseClient) {
  try {
    const { data, error } = await supabaseClient
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

export async function createJob(supabase: SupabaseClient, jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>) {
  try {
    // Removed internal createClient call
    
    const { data, error } = await supabase
      .from('jobs')
      .insert([jobData])
      .select()
      .single();

    if (error) {
      // Re-throw the specific Supabase error for better debugging in the form
      console.error('Supabase error creating job:', error);
      throw error; 
    }

    return data as Job;
  } catch (error) {
    console.error('Error in createJob function:', error);
    // Ensure error is re-thrown so the form can catch it
    throw error; 
  }
}

export async function updateJob(supabase: SupabaseClient, id: string, jobData: Partial<Omit<Job, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    // Removed internal createClient call
    
    const { data, error } = await supabase
      .from('jobs')
      .update(jobData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      // Re-throw the specific Supabase error
      console.error('Supabase error updating job:', error);
      throw error;
    }

    return data as Job;
  } catch (error) {
    console.error(`Error in updateJob function for id ${id}:`, error);
    // Ensure error is re-thrown
    throw error;
  }
}

export async function deleteJob(id: string, supabase: SupabaseClient) {
  try {
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

export async function filterJobs(supabase: SupabaseClient, { location, jobType }: { location?: string; jobType?: JobType }) {
  try {
    
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