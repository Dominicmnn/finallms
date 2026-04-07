import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "@/components/common/AuthShell";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { extractApiError } from "@/utils/api";

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue learning or managing courses.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="current-password"
        />

        {errorMessage ? <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{errorMessage}</p> : null}

        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Spinner size="sm" className="border-white/40 border-t-white" />
              Signing in...
            </span>
          ) : (
            "Login"
          )}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-brand-700 hover:text-brand-800">
            Forgot password?
          </Link>
          <Link to="/signup" className="text-slate-600 hover:text-slate-800">
            Create account
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

export default LoginPage;
