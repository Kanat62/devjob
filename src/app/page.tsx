import fs from 'fs';
import path from 'path';
import { Filter } from "@/widgets/filter";
import { JobCard, Job } from "@/entities/job/ui/JobCard";

export default function Home() {
  const filePath = path.join(process.cwd(), 'src/shared/api/mock/parsed_jobs.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const jobs: Job[] = JSON.parse(fileContent);

  return (
    <main className="">
      <div className="mx-auto max-w-[1152px] lg:max-w-[1152px] max-lg:max-w-[600px] px-4">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-[40px] font-bold text-white">все вакансии</h1>
          <span className="text-muted-foreground text-base mt-[6px]">{jobs.length}</span>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-0 lg:gap-8 items-start">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[12px] w-full">
            {jobs[0] && jobs.map((job: Job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <Filter />
        </div>
      </div>
    </main>
  );
}
