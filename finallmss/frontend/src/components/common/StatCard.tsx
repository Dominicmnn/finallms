interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ReactNode;
}

function StatCard({ label, value, hint, icon }: StatCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-soft-lg transition-all duration-200 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{label}</p>
          <p className="mt-2 text-3xl font-bold text-text-primary">{value}</p>
          {hint && <p className="mt-2 text-xs text-text-secondary">{hint}</p>}
        </div>
        {icon && (
          <div className="rounded-xl bg-gradient-to-r from-primary-100 to-accent-100 p-3">
            {icon}
          </div>
        )}
      </div>
    </article>
  );
}

export default StatCard;
