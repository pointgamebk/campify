import DeleteStripeAccountForm from "@/components/shared/DeleteStripeAccountForm";
import { getOrders } from "@/lib/actions/order.actions";
import { IOrderItem } from "@/lib/database/models/order.model";

type AdminPageProps = {
  params: { id: string };
};

const AdminPage = async ({ params: { id } }: AdminPageProps) => {
  const orders = await getOrders();

  console.log(orders);

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

      <section className=" bg-dotted-pattern bg-cover bg-center py-5 px-10 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left text-tan">
          Transfers
        </h3>

        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[100px] flex-1 py-3 pr-4 text-left text-grey-400">
                Schedule Name
              </th>

              <th className="min-w-[75px] flex-1 py-3 pr-4 text-left text-grey-400">
                Edit
              </th>
            </tr>
          </thead>
        </table>
      </section>
    </>
  );
};

export default AdminPage;
