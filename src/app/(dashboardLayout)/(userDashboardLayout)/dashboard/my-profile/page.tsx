import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/service/auth/getUserInfo";
import { Suspense } from "react";

// Tell Next.js this page is dynamic (uses cookies / server session)
// export const dynamic = "force-dynamic";

async function MyProfileContent() {
  const userInfo = await getUserInfo();
  return <MyProfile userInfo={userInfo} />;
}

export default function MyProfilePage() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <MyProfileContent />
    </Suspense>
  )
}

// import MyProfile from "@/components/modules/MyProfile/MyProfile";
// import { getUserInfo } from "@/service/auth/getUserInfo";

// const MyProfilePage = async () => {
//     const userInfo = await getUserInfo();
//     return <MyProfile userInfo={userInfo} />;
// };

// export default MyProfilePage;
