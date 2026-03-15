

type Contacts = {
  telegram?: string
  phone?: string
  email?: string
}
interface ApplyWidgetProps {
  format: string;
  salaryEstimate: string;
  contacts: Contacts;
  country?: string;
}

export function ApplyWidget({
  format,
  salaryEstimate,
  contacts,
  country
}: ApplyWidgetProps) {
  return (
    <aside className="w-full lg:w-[300px] shrink-0 lg:sticky top-24">
      <div className="bg-card rounded-[24px] p-5 flex flex-col gap-4">
        {/* Info rows */}
        <div className="flex flex-col gap-3">

          <div className="flex flex-col gap-0.5">
            <span className="text-sm text-muted-foreground">формат</span>
            <span className="text-base font-medium text-white">{format}</span>
          </div>

          {country && (
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-muted-foreground">город</span>
              <span className="text-base font-medium text-white">{country}</span>
            </div>
          )}


          <div className="flex flex-col gap-0.5">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              зарплата
            </span>
            <span className="text-base font-medium text-white">{salaryEstimate}</span>
          </div>
        </div>

        {/* Apply buttons */}
        <div className="flex flex-col gap-2">
          {Object.entries(contacts).map(([key, value]) => {
            if (!value) return null;

            let label = key;
            if (key === 'telegram') label = 'Telegram';
            if (key === 'phone') label = 'Позвонить';
            if (key === 'email') label = 'Email';

            return (
              <div key={key} className="flex flex-col gap-0.5">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  {label}
                </span>
                {key === 'telegram' ? (
                  <a 
                    href={`https://t.me/${value.replace('@', '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-base font-medium text-[#1c93e3] hover:underline"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-base font-medium text-white">{value}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}