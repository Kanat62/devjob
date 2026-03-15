import { Search, ListFilter, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Button } from "@/shared/ui/button";

const filterSections = [
  {
    label: "формат",
    options: [
      { name: "офис", count: 1400, active: false },
      { name: "удалённо", count: 4500, active: true },
      { name: "стажировка", count: 914, active: false },
      { name: "преокт", count: 1600, active: false },
    ],
  },
  {
    label: "город",
    options: [
      { name: "Бишкек", count: 0, active: false },
      { name: "Ош", count: 0, active: false },
    ],
  },
  {
    label: "грейд",
    options: [
      { name: "intern", count: 105, active: false },
      { name: "junior", count: 426, active: false },
      { name: "middle", count: 4100, active: false },
      { name: "senior", count: 3100, active: false },
      { name: "lead", count: 692, active: false },
      { name: "head", count: 38, active: false },
    ],
  },
  {
    label: "зарплата",
    options: [
      { name: "до 80k", count: 710, active: false },
      { name: "81–150k", count: 907, active: false },
      { name: "151–250k", count: 2500, active: false },
      { name: "250k+", count: 4300, active: false },
    ],
  },

];

const FilterContent = () => (
  <div className="flex flex-col gap-4">
    {filterSections.map((section) => (
      <div key={section.label} className="flex flex-col gap-2">
        <span className="text-base font-medium text-white">
          {section.label}
        </span>
        <div className="flex flex-wrap gap-1">
          {section.options.map((opt) => (
            <button
              key={opt.name}
              className={`inline-flex items-center gap-1.5 rounded-[12px] bg-[#2e3035] px-2 py-[6px] transition-colors cursor-pointer text-white/90 hover:bg-[#3a3c42] ${opt.active
                ? " bg-[#3a3c42]"
                : ""
                }`}
            >
              <span className="font-medium">{opt.name}</span>
              {opt.count > 0 && (
                <span className="text-xs text-muted-foreground mt-0.5">
                  {(opt.count / 1000 >= 1 && opt.count % 1000 === 0) ? `${opt.count / 1000}k` : opt.count >= 1000 ? `${(opt.count / 1000).toFixed(1)}k` : opt.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export function Filter() {
  return (
    <div className="w-full lg:w-[300px] shrink-0">
      {/* Mobile view: Search + Filter Icon */}
      <div className="lg:hidden flex items-center gap-2 w-full mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            size={20}
          />
          <input
            placeholder="Должность"
            className="w-full h-[56px] bg-card border-none rounded-[20px] pl-12 pr-4 font-sans text-base text-white placeholder:text-muted-foreground outline-none transition-all"
          />
        </div>

        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-[56px] w-[56px] min-w-[56px] shrink-0 bg-card border-none rounded-[20px] hover:bg-card/80 active:scale-95 transition-all"
            >
              <ListFilter className="text-white" size={24} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-[#141414] border-t-0 p-0 rounded-t-[32px]">
            <div className="mx-auto w-full max-w-[500px] flex flex-col h-[90vh]">
              <DrawerHeader className="flex flex-row items-center justify-between p-6 border-none">
                <DrawerTitle className="text-2xl font-bold text-white">Фильтры</DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 text-white">
                    <X size={20} />
                  </Button>
                </DrawerClose>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto px-6 py-2 pb-10 custom-scrollbar">
                <FilterContent />
              </div>

              <DrawerFooter className="p-6 pt-2">
                <Button className="w-full h-[56px] rounded-[20px] bg-primary hover:bg-primary/90 text-white text-lg font-semibold shadow-lg shadow-primary/20">
                  Применить
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop view: Sidebar */}
      <aside className="hidden lg:flex flex-col gap-5 sticky top-24">
        <div className="bg-card rounded-[24px] p-5 flex flex-col gap-6">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              size={16}
            />
            <input
              placeholder="Должность"
              className="w-full h-11 bg-[#2e3035] border-none rounded-[16px] pl-10 pr-4 font-sans text-base text-white placeholder:text-muted-foreground outline-none transition-all"
            />
          </div>

          <FilterContent />
        </div>
      </aside>
    </div>
  );
}
