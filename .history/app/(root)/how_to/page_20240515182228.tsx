const HowTo = async () => {
  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6 md:pr-40">
            <h2 className="h2-bold text-white">How To Campify</h2>

            <ul className="list-disc ml-4 text-white">
              <li className="p-semibold-18">
                Users must register an account with Campify in order to do the
                following:
              </li>
              <li className="ml-8">Create a training camp or event</li>
              <li className="ml-8">Join a camp or event, free or paid</li>
              <li className="ml-8">
                Leave a comment related to a specific camp or event
              </li>
            </ul>

            <p className="p-bold-20 md:p-bold-24 text-green underline">
              Camp/Event Instructions & General Rules
            </p>

            <ul className="list-disc ml-4 text-white">
              <li className="p-regular-18">
                Users must first register as “instructors” on the Campify
                platform before they can host a camp or event.
              </li>
              <li className="p-regular-18">
                To register as an instructor, users must follow these steps:
              </li>
              <ul className="ml-8">
                <li>
                  Navigating to the user profile page by clicking “My Profile”
                  on the application header. On mobile devices, the “My Profile”
                  link can be accessed through the icon in the far right corner
                  of the header
                </li>
                <li>Click the “Become an Instructor” button</li>
                <li>
                  On this page, you will see the instructor dashboard. Hosting
                  camps on the platform requires that you have a Stripe account
                  which can be linked to your Campify account, and the ability
                  for Campify to transfer funds to that account.
                </li>
                <li>
                  Clicking the “Connect Stripe” button will transfer you to
                  Stripe, and they will guide you through their secured
                  application process.
                </li>
                <li>
                  None of your personal financial or banking information is
                  stored on Campify. Your Stripe Connect account number is
                  stored only as a reference when transferring payments to your
                  Stripe account.
                </li>
                <li>
                  Once this process is complete, you will be navigated from
                  Stripe's website back to the Campify homepage.
                </li>
                <li>
                  If your account is linked and Stripe verifies your account has
                  transfers enabled, you will need to complete your Instructor
                  profile. This can be done by clicking the “Complete Profile to
                  Host Camps” button on the Instructor Dashboard page. **please
                  note that you will not see this option until your Stripe
                  account is linked AND your Stripe account has transfers
                  enabled. If either status does not update after applying,
                  please contact Stripe for further instruction.**
                </li>
                <li>
                  To complete your instructor profile, simply enter your school
                  or university affiliation, your preferred email contact, a
                  description of your expertise and offerings, as well as a
                  photo.
                </li>
              </ul>
            </ul>

            <p className="p-bold-20 md:p-bold-24 text-green underline">
              Hosting a Camp or Event
            </p>

            <ul className="list-disc ml-4 text-white">
              <li className="p-regular-18">
                Once you have completed your instructor profile, you are able to
                host camps. To create a new camp, navigate to the instructor
                dashboard. There will now be a section titled Camp Details,
                where you will see a “Create New Camp” button, and a table where
                all of your current and previous camps will be listed.
              </li>
              <li className="p-regular-18">
                To create and host a new camp or event, you must enter the
                following:
              </li>
              <ul className="ml-8">
                <li>A camp title</li>
                <li>What sport the camp is related to</li>
                <li>
                  A detailed description of the camp activities and expectations
                </li>
                <li>A photo related to the camp</li>
                <li>The location of the camp</li>
                <li>The start and end date of the camp</li>
                <li>
                  The camp price (if there is no fee, check the “Free Access”
                  box)
                </li>
                <li>
                  If the attendance is limited, you can set a maximum number of
                  participants. Otherwise, check the "No Limit" box.
                </li>
              </ul>
              <li className="p-regular-18">
                Camps are displayed on the homepage, ordered based on start date
                ascending.
              </li>
              <li className="p-regular-18">
                Clicking on a camp card displayed on the homepage will take you
                to a page further detailing the selected camp, where users will
                have the option to purchase a ticket.
              </li>
              <li className="p-regular-18">
                To see who has purchased tickets to your camp, navigate to the
                instructor dashboard, and click the specified camp title in the
                Camp Details table.
              </li>
              <li className="p-regular-18">
                This will take you to the Order Details page, where all ticket
                purchases will be listed, along with their name and purchase
                date.
              </li>
              <li>
                To edit information related to a posted camp or event, click the
                'Edit' icon in the upper right corner of the camp card.
              </li>
              <li>
                To delete a camp or event, click the 'Delete' icon in the upper
                right corner of the camp card. Please note that any camp or
                event that has tickets purchased (i.e attendees) cannot be
                deleted for accounting purposes. In this case, the event will be
                canceled and no longer able to be purchased or joined.
              </li>
            </ul>

            <p className="p-bold-20 md:p-bold-24 text-green underline">
              Joining a Camp or Event
            </p>

            <ul className="list-disc ml-4 text-white">
              <li className="p-regular-18">
                To join a camp, click on the camp's card listed on either the
                homepage, or the instructors profile page.
              </li>
              <li className="p-regular-18">
                Clicking the “Get Ticket” button will take you to a Stripe
                hosted, secure payment process.
              </li>
              <li className="p-regular-18">
                Once you've successfully submitted payment, you will be
                transferred back to your profile page on Campify. You will also
                see the camp listed under My Tickets.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowTo;
