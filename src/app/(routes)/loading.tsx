export default function Loading() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6">
        {/* Animated spinner */}
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-muted" />
          <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          {/* or pure css without tailwindcss */}
          {/* <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              border: '4px solid red',
              borderTopColor: 'transparent',
            }}
          /> */}
        </div>

        {/* Loading text */}
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>

          <p className="text-sm text-muted-foreground">
            Please wait while we prepare your content.
          </p>
        </div>
      </div>
    </div>
  );
}
