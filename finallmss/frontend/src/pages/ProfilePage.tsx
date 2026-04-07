import { type FormEvent, useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";
import ErrorState from "@/components/ui/ErrorState";
import InputField from "@/components/ui/InputField";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services/userService";
import { extractApiError } from "@/utils/api";

function ProfilePage() {
  const { user, refreshMe } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }
    setFirstName(user.first_name || "");
    setLastName(user.last_name || "");
    setBio(user.bio || "");
    setPhoneNumber(user.phone_number || "");
    setAvatarUrl(user.avatar_url || "");
  }, [user]);

  async function handleRefresh() {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await refreshMe();
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await userService.updateMe({
        first_name: firstName,
        last_name: lastName,
        bio: bio || null,
        phone_number: phoneNumber || null,
        avatar_url: avatarUrl || null
      });
      await refreshMe();
      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <ErrorState title="User missing" message="Unable to load profile. Please sign in again." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Manage your account details used across the LMS."
        actions={
          <Button variant="outline" onClick={handleRefresh}>
            Refresh profile
          </Button>
        }
      />

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <p className="text-sm font-semibold text-slate-900">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-sm text-slate-600">{user.email}</p>
          <p className="text-xs uppercase tracking-wide text-brand-700">{user.role}</p>
        </div>

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
            id="phoneNumber"
            label="Phone number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />

          <InputField
            id="avatarUrl"
            label="Avatar URL"
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
            placeholder="https://..."
          />

          <div className="space-y-1">
            <label htmlFor="bio" className="block text-sm font-medium text-slate-700">
              Bio
            </label>
            <textarea
              id="bio"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
              rows={4}
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </div>

          {successMessage ? (
            <p className="rounded-lg bg-emerald-50 p-2 text-sm text-emerald-700">{successMessage}</p>
          ) : null}
          {errorMessage ? <p className="rounded-lg bg-red-50 p-2 text-sm text-red-700">{errorMessage}</p> : null}

          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save profile"}
          </Button>
        </form>
      </section>
    </div>
  );
}

export default ProfilePage;
