import DeleteStripeAccountForm from "@/components/shared/DeleteStripeAccountForm";
import { getOrders } from "@/lib/actions/order.actions";

type AdminPageProps = {
  params: { id: string };
};

const AdminPage = async ({ params: { id } }: AdminPageProps) => {
  return (
    <>
      <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left text-tan">
          Admin Dashboard
        </h3>

        <div className="wrapper my-8">
          <DeleteStripeAccountForm />
        </div>
      </section>

      <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left text-tan">
          Transfers
        </h3>
      </section>
    </>
  );
};

export default AdminPage;
