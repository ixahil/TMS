import { UserDashboard } from "./_components/user-dashboard";

export const metadata = {
  title: "My Account - Tour Management",
  description: "Manage your profile, bookings, and account settings.",
};

export default function UserPage() {
  return <UserDashboard />;
}
