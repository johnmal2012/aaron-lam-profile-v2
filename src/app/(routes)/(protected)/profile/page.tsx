// 1) admin profile page
import {
  Card,
  CardContent,
  //   CardHeader,
  //   CardTitle,
  //   CardDescription,
} from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getSession } from '@/lib/auth/auth-utils';
import { getProfilePageData } from '@/lib/profile/get-profile-page-data';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfileCardHeader } from '@/components/profile/profile-card-header';
import { DesktopProfileGrid } from '@/components/profile/profile-desktop-grid';
import { MobileProfileList } from '@/components/profile/profile-mobile-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProfilePage() {
  //   const [profile, session] = await Promise.all([
  //     getActivePhysicianProfile(),
  //     getSession(),
  //   ]);

  //   if (!profile) {
  //     return (
  //       <EmptyState
  //         title="No Physician Profile found."
  //         description="Create a physician profile to display on website."
  //         icon={<UserRoundArrowLeft className="size-12" />}
  //       />
  //     );
  //   }

  //   const currentUser = session
  //     ? ((await db.query.user.findFirst({
  //         columns: {
  //           image: true,
  //           name: true,
  //         },
  //         where: (user, { eq }) => eq(user.id, session.user.id),
  //       })) ?? null)
  //     : null;

  //   const allItems = getProfileItems(profile);
  const session = await getSession();

  const profileData = await getProfilePageData(session?.user.id ?? null);

  //   if (!profileData) {
  //     return <NoProfileState />;
  //   }
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
        <ProfileCardHeader profile={profile} currentUser={currentUser} />

        <Separator className="h-1 bg-slate-300" />

        <CardContent className="space-y-4 pt-6">
          <DesktopProfileGrid
            profile={profile}
            items={items}
            currentUser={currentUser}
          />

          <MobileProfileList
            items={items}
            profile={profile}
            currentUser={currentUser}
          />
        </CardContent>
      </Card>
      {/* Credentials */}
      {profile.credential?.length > 0 && (
        <Card className="rounded-2xl shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Credentials
            </h2>
            <p className="text-sm text-muted-foreground">
              Education, training, fellowships, and certifications
            </p>
          </div>

          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {profile.credential.map((credential, index) => (
                <Card
                  key={`${credential.institution}-${index}`}
                  className="overflow-hidden rounded-xl border-slate-200 shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardContent className="flex gap-4 p-5">
                    {/* Credential Image */}
                    <div className="shrink-0">
                      {credential.image ? (
                        <div className="relative size-20 overflow-hidden rounded-lg border bg-white">
                          <Image
                            src={credential.image}
                            alt={
                              credential.institution ||
                              credential.label ||
                              'Credential'
                            }
                            fill
                            sizes="80px"
                            className="object-contain p-2"
                          />
                        </div>
                      ) : (
                        <div className="flex size-20 items-center justify-center rounded-lg border bg-slate-50">
                          <span className="text-xs font-semibold uppercase text-slate-400">
                            {credential.type === 'education'
                              ? 'EDU'
                              : credential.type === 'residency'
                                ? 'RES'
                                : credential.type === 'fellowship'
                                  ? 'FEL'
                                  : 'CERT'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Credential Information */}
                    <div className="min-w-0 flex-1">
                      {credential.label && (
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {credential.label}
                        </p>
                      )}

                      {credential.institution && (
                        <p className="mt-1 text-sm font-semibold leading-5 text-slate-800">
                          {credential.institution}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
