// 1) admin profile page
import { Card, CardContent } from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';
import { getSession } from '@/lib/auth/auth-utils';
import { getProfilePageData } from '@/lib/profile/get-profile-page-data';
import { NoProfileState } from '@/components/profile/profile-empty-state';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfileCardHeader } from '@/components/profile/profile-card-header';
import { DesktopProfileGrid } from '@/components/profile/profile-desktop-grid';
import { MobileProfileList } from '@/components/profile/profile-mobile-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ProfilePage() {
  const session = await getSession();

  const profileData = await getProfilePageData(session?.user.id ?? null);

  if (!profileData.success) {
    return (
      // <div className="rounded-md border border-destructive p-4 text-destructive">
      //   {profileData.message}
      // </div>
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="max-w-lg space-y-6">
          <div className="space-y-2">
            <p className="rounded-md border border-destructive p-4 text-destructive">
              {profileData.message}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { profile, currentUser, items } = profileData;

  return (
    <div className="container mx-auto space-y-6 py-10">
      <ProfileHeader />

      <Card className="rounded-2xl shadow-sm">
        <ProfileCardHeader profile={profile} />

        <Separator className="bg-slate-300 data-[orientation=horizontal]:h-1" />

        <CardContent className="space-y-6 pt-6">
          {/* Desktop View - Hidden on mobile */}
          <DesktopProfileGrid
            profile={profile}
            items={items}
            currentUser={currentUser}
          />

          {/* Mobile - Hidden on desktop */}
          <MobileProfileList
            items={items}
            profile={profile}
            currentUser={currentUser}
          />
        </CardContent>
      </Card>
    </div>
  );
}
