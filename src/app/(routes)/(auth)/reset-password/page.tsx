import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { ReturnButton } from "@/components/navigation/return-button";
import { redirect } from "next/navigation";

interface ResetPasswordProps {
  searchParams: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordProps) {
  const token = (await searchParams).token;

  if (!token) redirect("/login");

  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-4">
        <ReturnButton href="/login" label="Login" />

        <h1 className="text-3xl font-bold">Reset Password</h1>

        <p className="text-muted-foreground">
          Please enter your new password. Make sure it is at least 6 characters.
        </p>

        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
