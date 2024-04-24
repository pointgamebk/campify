export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: 0,
  isFree: false,
  url: "",
};

export const placesDefaultValues = {
  location: "",
};

export const profileDefaultValues = {
  profileDescription: "",
  profilePhoto: "",
  profileSchool: "",
  profileContact: "",
};

export const deleteStripeAccountDefaultValues = {
  accountId: "",
};
