import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "@/components/common/AuthShell";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types/user";
import { extractApiError } from "@/utils/api";

function SignupPage() {
  const { signup } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Password and confirmation do not match.");
      return;
    }

    if (role === "admin") {
      setErrorMessage("Admin account creation is restricted.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signup({
        first_name: firstName,
        last_name: lastName,
        email,
        role: role as "student" | "tutor",
        password
      });
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell title="Create your account" subtitle="Start as a student or tutor.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="firstName"
            label="First name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
          <InputField
            id="lastName"
            label="Last name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </div>

        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <SelectField
          id="role"
          label="Role"
          value={role}
          onChange={(event) => setRole(event.target.value as UserRole)}
          options={[
            { label: "Student", value: "student" },
            { label: "Tutor", value: "tutor" }
          ]}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <InputField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />

        {errorMessage ? <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{errorMessage}</p> : null}

        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Spinner size="sm" className="border-white/40 border-t-white" />
              Creating account...
            </span>
          ) : (
            "Sign up"
          )}
        </Button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-brand-700 hover:text-brand-800">
            Login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default SignupPage;
