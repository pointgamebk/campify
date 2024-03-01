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
    <></>
    <div className="wrapper grid grid-cols-1 gap-5">
      <h3 className="h3-bold text-tan">Instructor Settings</h3>
      <p className="text-tan">
        Stripe Account: {user.stripeAccountId ? "Linked" : "Not Linked"}
      </p>
      <p className="text-tan">
        Transfers enabled: {user.chargesEnabled ? "Yes" : "No"}
      </p>
      {user.chargesEnabled === false ? <ConnectButton /> : null}
    </div>
  );
};

export default InstructorSettings;
