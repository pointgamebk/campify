import DeleteStripeAccountForm from "@/components/shared/DeleteStripeAccountForm";

type AdminPageProps = {
  params: { id: string };
};

const AdminPage = async ({ params: { id } }: AdminPageProps) => {
  return <h1 className="text-white">{id}</h1>;
};

export default AdminPage;
