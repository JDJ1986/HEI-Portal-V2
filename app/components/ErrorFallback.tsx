"use client";

import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role="alert" className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong:</h2>
      <pre className="text-red-500 mb-4">{error.message}</pre>
      <Button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </Button>
    </div>
  );
}