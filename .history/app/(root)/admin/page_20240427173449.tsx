import { getPendingOrders } from "@/lib/actions/order.actions";
import { TransferConfirmation } from "@/components/shared/TransferConfirmation";
import { TopUpButton } from "@/components/shared/TopUpButton";
import { checkIsAdmin } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const AdminPage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isAdmin = (await checkIsAdmin()) === userId;

  const orders = await getPendingOrders();

  return (
    <>
      {isAdmin ? (
        <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center sm:text-left text-tan">
            Admin Dashboard
          </h3>
        </section>
      ) : (
        <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center sm:text-left text-tan">
            Unauthorized Route
          </h3>
        </section>
      )}

      {isAdmin && (
        <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center sm:text-left text-tan">
            Top Up
          </h3>

          <div className="wrapper">
            <TopUpButton />
          </div>
        </section>
      )}

      {isAdmin && (
        <section className=" bg-dotted-pattern bg-cover bg-center py-5 px-10 md:py-10">
          <h3 className="wrapper h3-bold text-center sm:text-left text-tan">
            Pending Orders
          </h3>

          <table className="w-full border-collapse border-t">
            <thead>
              <tr className="p-medium-14 border-b text-grey-500">
                <th className="min-w-[100px] flex-1 py-3 pr-4 text-left text-grey-400">
                  Instructor
                </th>
                <th className="min-w-[75px] flex-1 py-3 pr-4 text-left text-grey-400">
                  Amount
                </th>
                <th className="min-w-[75px] flex-1 py-3 pr-4 text-left text-grey-400">
                  Account ID
                </th>
                <th className="min-w-[75px] flex-1 py-3 pr-4 text-left text-grey-400">
                  Complete Transfer
                </th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length === 0 ? (
                <tr className="border-b">
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No pending orders found.
                  </td>
                </tr>
              ) : (
                <>
                  {orders &&
                    orders.map((row: any) => (
                      <tr
                        key={row._id}
                        className="p-regular-14 lg:p-regular-16 border-b "
                        style={{ boxSizing: "border-box" }}
                      >
                        <td className="min-w-[250px] py-4 text-green">
                          {row.instructor.firstName.charAt(0)}{" "}
                          {row.instructor.lastName}
                        </td>
                        <td className="min-w-[250px] py-4 text-green">
                          {(row.totalAmount - row.totalAmount * 0.08).toFixed(
                            2
                          )}
                        </td>
                        <td className="min-w-[250px] py-4 text-green">
                          {row.instructor.stripeAccountId}
                        </td>
                        <td className="min-w-[250px] py-4 text-green">
                          <TransferConfirmation
                            amount={row.totalAmount - row.totalAmount * 0.08}
                            destination={row.instructor.stripeAccountId}
                            transfer_group={row._id}
                          />
                        </td>
                      </tr>
                    ))}
                </>
              )}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};

export default AdminPage;
