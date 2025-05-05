# Mini Job Board

A simple job board application where companies can post jobs and users can browse them. Built with Next.js, Supabase, and Tailwind CSS.

## 🌟 Features

- **Authentication**: User signup and login using Supabase Auth
- **Job Posting**: Create, view, edit, and delete job postings
- **Job Browsing**: Public page to browse all job postings
- **Filtering**: Filter jobs by location and job type
- **Dashboard**: User dashboard to manage job postings
- **Responsive Design**: Works on mobile, tablet, and desktop

## 🔧 Technologies Used

- **Frontend**: [Next.js 14](https://nextjs.org/) with TypeScript and App Router
- **Authentication & Database**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🏗️ Architecture Overview

The application follows a modern web application architecture:

- **App Router**: Utilizes Next.js 14's App Router for server-side rendering and routing
- **Server Components**: Leverages React Server Components for data fetching
- **Client Components**: Uses client components for interactive elements
- **Data Management**: Data fetching and mutations handled through Supabase client
- **Authentication**: Supabase Auth for user authentication

### Directory Structure

```
mini-job-board/
├── src/
│   ├── app/                   # Next.js app router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── jobs/              # Job routes (create, edit, view)
│   │   ├── page.tsx           # Home page with job listings
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── dashboard/         # Dashboard components
│   │   ├── jobs/              # Job-related components
│   │   └── layout/            # Layout components
│   ├── lib/                   # Utility functions
│   │   ├── auth.ts            # Authentication helpers
│   │   ├── jobs.ts            # Job CRUD functions
│   │   └── supabase.ts        # Supabase client
│   └── types/                 # TypeScript types
│       └── index.ts           # Type definitions
├── public/                    # Static assets
└── .env.local                 # Environment variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/mini-job-board.git
cd mini-job-board
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a Supabase project**

- Create a new project at [supabase.com](https://supabase.com/)
- Create a table named `jobs` with the following schema:

```sql
create table
  public.jobs (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    title text not null,
    company_name text not null,
    description text not null,
    location text not null,
    job_type text not null,
    user_id uuid not null,
    constraint jobs_pkey primary key (id),
    constraint jobs_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;
```

4. **Set up environment variables**

Create a `.env.local` file in the root directory and add your Supabase URL and anon key:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

5. **Run the development server**

```bash
npm run dev
```

6. **Open [http://localhost:3000](http://localhost:3000) with your browser**

## 🌐 Deployment

The application can be easily deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Add the environment variables in the Vercel dashboard
4. Deploy

## 🔄 What Would I Improve Given More Time

- **Security**: Enable Row Level Security and create a policy to allow users to select any row, but only insert, update or delete their own rows
- **Enhanced Job Search**: Add full-text search for job titles and descriptions
- **Job Categories**: Add categories/tags for better filtering
- **Application System**: Allow users to apply for jobs through the platform
- **Company Profiles**: Add more robust company profiles
- **Email Notifications**: Send notifications for new job postings or applications
- **Advanced Authentication**: Add social login options and email verification
- **Admin Dashboard**: Create an admin dashboard to manage users and content
- **Testing**: Add comprehensive unit and integration tests
- **Analytics**: Track user behavior and job popularity
- **Accessibility**: Ensure full accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions or feedback, please reach out to [lombokthinker@gmail.com](mailto:lombokthinker@gmail.com)
