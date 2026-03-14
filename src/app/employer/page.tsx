import { EmployerSidebar } from "@/widgets/employer-sidebar";
import { Button } from "@/shared/ui/button";

export default function EmployerJobsPage() {
  return (
    <main>
      <div className="mx-auto max-w-[1152px]">
        <div className="flex gap-6 items-start mt-8">
          {/* Left Sidebar */}
          <EmployerSidebar />

          {/* Main Content Area */}
          <div className="flex-1 bg-card rounded-[24px] p-5 min-h-[500px] flex flex-col">
            <div className="mb-auto">
              <h1 className="text-[20px] text-white mb-1">вакансии</h1>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center m-auto gap-4">
              <p className="text-muted-foreground text-sm">Создайте новую вакансию</p>
              <Button className="bg-[#10b981] hover:bg-[#10b981]/90 text-white rounded-xl px-8 h-10 font-medium">
                Создать
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
