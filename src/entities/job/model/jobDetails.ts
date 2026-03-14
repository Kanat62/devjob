import fs from 'fs';
import path from 'path';
import { Job } from "../ui/JobCard";

export function getJobById(id: string): Job | undefined {
  const filePath = path.join(process.cwd(), 'src/shared/api/mock/parsed_jobs.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const jobs: Job[] = JSON.parse(fileContent);

  const decodedId = decodeURIComponent(id);
  return jobs.find((j) => String(j.id) === decodedId);
}
