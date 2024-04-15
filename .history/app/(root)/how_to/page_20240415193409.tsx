const HowTo = async () => {
  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6 md:pr-40">
            <h2 className="h2-bold text-white">How To Campify</h2>
            <p className="p-bold-20 md:p-bold-24 text-green underline">
              Campify Instructions and General Rules
            </p>

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
              Camp/Event Instructions/General Rules
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
                  Stripe’s website back to the Campify homepage.
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
              Hosting a Camp/Event
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
                <li>
                  Click the “Create League” button to complete the process
                </li>
                <li>
                  The league creator will automatically be listed as the
                  league's administrator
                </li>
              </ul>
              <li className="p-regular-18">
                League activities and details such as rosters and schedules can
                be accessed by clicking on a specific league name on the Leagues
                page.
              </li>
              <li className="p-regular-18">
                From this page, league administrators can add teams to the
                league, and create a schedule.
              </li>
              <li className="p-regular-18">
                Once a team has been created, it will be listed in the Teams
                table.
              </li>
              <li className="p-regular-18">Adding users to a team:</li>
              <ul className="ml-8">
                <li>
                  To add users to a specific team, administrators must be on
                  that specific teams page.
                </li>
                <li>
                  There, admins will see an “Add Player” form on the bottom of
                  the page.
                </li>
                <li>
                  Admins must enter the user's PointGame username, and press the
                  “Search User” button.
                </li>
                <li>
                  If the username is found, it will appear underneath the form
                  along with a “Click to confirm” button.
                </li>
                <li>
                  Click this button and follow the prompt to add the user as a
                  team member.
                </li>
              </ul>
              <li className="p-regular-18">Creating a schedule:</li>
              <ul className="ml-8">
                <li>
                  League admins can also create a schedule from the league
                  details page, using the related form on the bottom of the
                  page.
                </li>
                <li>Give the schedule a name, and click “Add Schedule”.</li>
                <li>
                  The schedule will then be listed in the Schedules table of the
                  league details page, and a page for that specific schedule
                  will also be created.
                </li>
              </ul>
              <li className="p-regular-18">Creating a match:</li>
              <ul className="ml-8">
                <li>A schedule consists of “matches”.</li>
                <li>
                  To create scheduled matches, league admins can do so from the
                  specified schedule page.
                </li>
                <li>
                  There the admin can select Team 1 and Team 2 from the team
                  list dropdown menus, the match date and time, and clicking
                  Create Match will add it to the schedule.
                </li>
                <li>
                  After the match is completed, the admin can list the winner by
                  clicking the winning teams name in the table, and confirming
                  the prompt.
                </li>
                <li>
                  To reset the match, the admin can click the on the team in the
                  winner column, and follow the prompt.
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowTo;
