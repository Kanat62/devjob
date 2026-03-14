import { notFound } from "next/navigation";
import { ApplyWidget } from "@/widgets/apply";
import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { getJobById } from "@/entities/job/model/jobDetails";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}


export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) notFound();

  return (
    <main>
      <div className="mx-auto max-w-[1152px] lg:max-w-[1152px] max-lg:max-w-[600px] px-4">
        {/* Breadcrumb */}

        <Breadcrumb
          items={[
            { label: "Главная", href: "/" },
            { label: job.title },
          ]}
        />
        {/* Content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 items-start mt-5">
          {/* Job header card */}
          <div className="bg-card rounded-[24px] p-5 lg:col-start-1 lg:row-start-1 lg:max-w-[820px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="h-8 w-8 rounded-[24px] flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden"
                >
                  {job.logo ? <Image src={job.logo} alt={job.company} width={24} height={24} /> : <span className="h-6 w-6"></span>}
                </div>
                <span className="font-medium text-white">{job.company}</span>
              </div>
              <span className="text-sm text-muted-foreground">{job.created_at}</span>
            </div>
            <h1 className="text-[24px] lg:text-[32px] font-bold text-white leading-tight mb-4">
              {job.title}
            </h1>
          </div>

          {/* Apply widget - below header on mobile, right on desktop */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:ml-8">
            <ApplyWidget
              format={job.type}
              salaryEstimate={job.salary}
              contacts={job.contacts}
            />
          </div>

          {/* Description sections - below apply widget on mobile, below header on desktop */}
          <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-2 lg:max-w-[820px]">
            <section className="bg-card rounded-[24px] p-5">
              <div className="text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: job.description }} />
            </section>
          </div>
        </div>

      </div>
    </main>
  );
}
