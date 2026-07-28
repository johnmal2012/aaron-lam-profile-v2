import { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-12 text-center">
      {icon && (
        <div className="mb-6 text-muted-foreground">
          {icon}
        </div>
      )}

      <h2 className="text-2xl font-semibold tracking-tight">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        {description}
      </p>
    </div>
  );
}