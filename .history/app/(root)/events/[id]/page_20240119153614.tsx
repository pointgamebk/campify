import { getEventById } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventById(id);

  console.log(event);

  return <div>EventDetails</div>;
};

export default EventDetails;
