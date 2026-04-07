import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "@/components/common/AuthShell";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { authService } from "@/services/authService";
import { extractApiError } from "@/utils/api";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await authService.forgotPassword({ email });
      setMessage(
        response.detail || "If your email exists in the system, password reset instructions were sent."
      );
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell title="Reset password" subtitle="Enter your email and we will send reset instructions.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {message ? <p className="rounded-lg bg-emerald-50 p-2 text-sm text-emerald-800">{message}</p> : null}
        {errorMessage ? <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{errorMessage}</p> : null}

        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          Back to{" "}
          <Link to="/login" className="font-medium text-brand-700 hover:text-brand-800">
            login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default ForgotPasswordPage;
