import ProfileForm from "@/components/shared/ProfileForm";
import { auth } from "@clerk/nextjs";

const UpdateProfile = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return (
    <div className="text-tan">
      <h1 className="h2-bold">UpdateProfile</h1>
    </div>
  );
};

export default UpdateProfile;
