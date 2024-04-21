import DeleteStripeAccountForm from "@/components/shared/DeleteStripeAccountForm";

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
      </section>

      <div className="wrapper my-8">
        <DeleteStripeAccountForm />
      </div>
    </>
  );
};

export default AdminPage;
