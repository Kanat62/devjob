import Link from "next/link";
import jobsData from '@/shared/api/mock/parsed_jobs.json'
import Image from "next/image";

export interface Job {
  id: string
  title: string
  company: string
  salary: string
  type: string
  country: string
  logo: string | null
  description: string
  contacts: {
    telegram?: string
    phone?: string
    email?: string
  }
  source_url: string
  parsed_at: string
  created_at: string
}

// {
//     id: 1,
//     slug: "ml-engineering-lead",
//     company: "Газпромнефть",
//     companyInitial: "Г",
//     companyColor: "#4f5eff",
//     date: "27 фев",
//     title: "руководитель центра ml инжиниринга",
//     salary: "зп не указана",
//     tags: [{ label: "lead" }, { label: "гибрид", variant: "accent" }],
//   },
export const JOBS = jobsData

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <article className="min-h-[254px] flex flex-col justify-between bg-card rounded-[24px] p-4 cursor-pointer h-full transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        {/* Company row */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div
              className="h-6 w-6 rounded-full flex items-center justify-center text-white  font-bold shrink-0 overflow-hidden"

            >
              {job.logo ? <Image src={job.logo} alt={job.company} width={24} height={24} /> : <span className="flex items-center justify-center h-6 w-6 bg-[#fff6d1] text-[#877941]">{job.company[0]}</span>}
            </div>
            <span className="text-white font-medium">{job.company}</span>
          </div>
          <span className="text-sm text-muted-foreground">{job.created_at}</span>
        </div>
        <div>
          {/* Title */}
          <h3 className="text-lg font-semibold mb-1 leading-snug">
            {job.title}
          </h3>

          {/* Salary */}
          <p className="mb-3 text-muted-foreground">{job.salary}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            <span className="inline-flex items-center rounded-[10px] px-2 py-1 text-sm font-medium bg-white/5 text-white/80">
              {job.type}
            </span>
            {job.country && (
              <span className="inline-flex items-center rounded-[10px] px-2 py-1 text-sm font-medium bg-white/5 text-white/80">
                {job.country}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
