import { Loader } from "../ui/loader";

interface ContentLayoutProps {
  title?: string;
  children: React.ReactNode;
  className: string;
  isLoading?: boolean;
  error?: string;
}

export function ContentLayout({
  children,
  className,
  title,
  isLoading = false,
  error,
}: ContentLayoutProps) {
  return (
    <div className="pt-8 pb-8 px-4 sm:px-8 space-y-8">
      {title && <h1 className="text-2xl font-bold">{title}</h1>}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h4 className="text-destructive font-bold">{error}</h4>
      ) : (
        <div className={className}>{children}</div>
      )}
    </div>
  );
}
