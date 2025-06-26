"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserWithoutId } from "@/lib/api/useUser";
import { Calendar, Shield, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserBookings } from "./user-bookings";
import { UserProfile } from "./user-profile";

export function UserDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useUserWithoutId();

  const currentTab = searchParams.get("tab") || "profile";

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "profile") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    router.push(`/user?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-32 bg-white rounded-xl mb-6" />
            <div className="h-96 bg-white rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600">
              Please log in to access your account.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800";
      case "AGENT":
        return "bg-blue-100 text-blue-800";
      case "USER":
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const memberDate = new Date(user.createdAt);

  console.log(user);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* User Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.profile || undefined} alt={user.name} />
                <AvatarFallback className="text-lg font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  {user.isEmailVerified && (
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-1">{user.email}</p>
                {user.phone && <p className="text-gray-600">{user.phone}</p>}
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Member since</p>
                <p className="font-medium">
                  {memberDate.getMonth()} {memberDate.getFullYear()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              My Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile user={user} />
          </TabsContent>

          <TabsContent value="bookings">
            <UserBookings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
