import UploadCard from "@/components/upload/UploadCard";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">

      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold tracking-tight text-foreground">
              GrowEasy
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              CSV Importer
            </span>
          </div>

          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl justify-center px-6 py-12">
        <UploadCard />
      </div>

    </main>
  );
}
