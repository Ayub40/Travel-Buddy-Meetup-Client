import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/service/auth/getUserInfo";
import { Suspense } from "react";

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
