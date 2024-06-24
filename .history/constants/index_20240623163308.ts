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
  price: "",
  isFree: false,
  limit: "",
  noLimit: false,
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

// in percentage
export const processingFee = 0.085;

// in cents
export const stripeFee = 0.3;

export const authorizedIds = [
  "6672105ec7752689e06a7176",
  "6675f68dde50936cb69d83b7",
  "6675f6afde50936cb69d83bf",
  "6675f6d4de50936cb69d83c3",
];
