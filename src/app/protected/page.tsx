

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
    const session = await getServerSession(authOptions);

  if (!session) {
    return <p>ログインが必要です</p>;
  }

  return (
    <div>
      <h1>ようこそ、{session.user?.name} さん</h1>
      <p>これは保護されたページです。</p>
    </div>
  );
}
