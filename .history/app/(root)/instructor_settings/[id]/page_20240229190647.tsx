import ConnectButton from "@/components/shared/ConnectButton";
import { getUserById } from "@/lib/actions/user.actions";
import { getEventsByUser } from "@/lib/actions/event.actions";}

type InstructorSettingsProps = {
  params: { id: string };
};

const InstructorSettings = async ({
  params: { id },
}: InstructorSettingsProps) => {
  const user = await getUserById(id);
  const events = await getEventsByUser({ userId: id, page: 1 });


  return (
    <>
      <section className="flex justify-center bg-slate bg-dotted-pattern bg-contain">
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
      </section>

      <section className="flex justify-center bg-slate bg-dotted-pattern bg-contain">
        <div className="wrapper grid grid-cols-1 gap-5">
          <h3 className="h3-bold text-tan">Order Details</h3>
        </div>
      </section>
    </>
  );
};

export default InstructorSettings;
