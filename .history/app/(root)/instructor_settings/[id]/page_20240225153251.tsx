import ConnectButton from "@/components/shared/ConnectButton";
import { getUserById } from "@/lib/actions/user.actions";

type InstructorSettingsProps = {
  params: { id: string };
};

const InstructorSettings = async ({
  params: { id },
}: InstructorSettingsProps) => {
  const user = await getUserById(id);
  return (
    <div className="wrapper grid grid-cols-1 gap-5">
      <h3 className="h3-bold text-white">Instructor Settings</h3>
      <p className="text-white">Stripe Account: {user.stripeAccountId}</p>
      <p className="text-white">Transfers enabled:</p>
      <p className="text-white">{id}</p>
      <ConnectButton />
    </div>
  );
};

export default InstructorSettings;
