import { Toaster as SonnerToaster } from "sonner";

export function AppToaster() {
  return (
    <SonnerToaster
      richColors
      closeButton
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "rounded-lg border shadow-brand-soft",
          title: "font-semibold",
          description: "text-muted-foreground"
        }
      }}
    />
  );
}

