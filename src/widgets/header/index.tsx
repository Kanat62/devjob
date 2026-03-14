import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-50 mb-8 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-[1152px] lg:max-w-[1152px] max-lg:max-w-[600px] px-4 h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Dev<span className="text-primary">Job</span>
          </h2>
          <Badge
            className="hidden sm:inline-flex text-muted-foreground border-primary/20 text-[10px] px-1.5 py-0"
            variant="outline"
          >
            Beta
          </Badge>
        </Link>

        {/* Nav */}
        {/* <nav className="hidden md:flex items-center gap-6">
          {[
            { name: "Вакансии", href: "/" },
            { name: "Для рекрутеров", href: "/employer" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base text-white hover:text-white transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav> */}

        <div className="flex items-center gap-3">
          {/* <Link href="/employer">
            <Button
              size="lg"
              className="bg-primary border-none rounded-[12px] cursor-pointer hover:bg-primary/90 text-white shadow-md shadow-primary/20 transition-all hover:shadow-primary/30"
            >
              Добавить вакансию
            </Button>
          </Link> */}
          <Button
            size="lg"
            variant={'outline'}
            className="px-5 py-2 border-none rounded-[12px] cursor-pointer"
          >
            Войти
          </Button>
        </div>
      </div>
    </header>
  );
}
