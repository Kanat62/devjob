import Link from "next/link";
import { FileText, User } from "lucide-react";

export function EmployerSidebar() {
  return (
    <aside className="w-[220px] shrink-0 bg-card rounded-[24px] py-2 px-5 flex flex-col h-fit">
      <nav className="flex flex-col gap-1">
        <Link
          href="/employer"
          className="flex items-center gap-3 py-2 rounded-2xl text-[#10b981] font-medium transition-colors"
        >
          <FileText size={20} />
          Вакансии
        </Link>
      </nav>
    </aside>
  );
}
