import { IEvent } from "@/lib/database/models/event.model";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return <div>CheckoutButton</div>;
};

export default CheckoutButton;
