import Link from "next/link";
import { FileText, User } from "lucide-react";

export function ProfileSidebar() {
  return (
    <aside className="w-[220px] shrink-0 bg-card rounded-[24px] p-3 flex flex-col h-fit">
      <nav className="flex flex-col gap-1">
        <Link
          href="/employer/jobs"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary/10 text-primary font-medium transition-colors"
        >
          <FileText size={20} />
          Вакансии
        </Link>
        <Link
          href="/employer/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-muted-foreground hover:bg-white/5 hover:text-white font-medium transition-colors"
        >
          <User size={20} />
          Профиль
        </Link>
      </nav>
    </aside>
  );
}
