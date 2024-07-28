const Learn = async () => {
  return (
    <>
      <nav className="bg-slate-800 py-4">
        <div className="container mx-auto flex justify-center">
          <ul className="flex space-x-10 list-none">
            <li className="list-none">
              <a
                href="#grow"
                className="text-tan hover:text-green p-medium-20 underline"
              >
                Grow
              </a>
            </li>
            <li className="list-none">
              <a
                href="#manage"
                className="text-tan hover:text-green p-medium-20 underline"
              >
                Manage
              </a>
            </li>
            <li className="list-none">
              <a
                href="#attend"
                className="text-tan hover:text-green p-medium-20 underline"
              >
                Attend
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section
        className="bg-slate bg-dotted-pattern bg-contain py-5 md:py-10"
        id="grow"
      >
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center items-center gap-8 mx-auto">
            <h2 className="h2-bold text-tan text-center">
              Grow Your Training Business with Campify
            </h2>
            <p className="p-regular-18 md:p-regular-20 text-tan text-center">
              Here is a step-by-step demonstration of how to register as an
              athlete instructor on Campify, connect your account to Stripe for
              secure payments, and create your very own camps. Watch to see how
              easy it is to get started and take your training to the next
              level. Ready to inspire and train the next generation of athletes?
              Start your journey with Campify today.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <video
              width="400"
              height="800"
              controls
              className="border-2 border-tan rounded-xl"
              poster="/assets/images/cmpfy_poster1.png"
            >
              <source
                src="https://utfs.io/f/1ef5480d-650e-40b7-b54e-a4ea0d8e217a-p1ul7j.mp4
"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <hr className="my-10 mx-auto w-3/4 border-t border-tan" />

      <section
        className="bg-slate bg-dotted-pattern bg-contain py-5 md:py-10"
        id="manage"
      >
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center items-center gap-8 mx-auto">
            <h2 className="h2-bold text-tan text-center">
              Effortlessly track and manage your sales with the Instructor
              Dashboard on Campify
            </h2>
            <p className="p-regular-18 md:p-regular-20 text-tan text-center">
              With our intuitive dashboard, staying on top of your earnings and
              managing your training camps has never been easier. Designed to
              streamline your workflow and maximize your success.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <video
              width="400"
              height="800"
              controls
              className="border-2 border-tan rounded-xl"
              poster="/assets/images/cmpfy_poster1.png"
            >
              <source
                src="https://utfs.io/f/51772612-7c3f-46bf-9536-26824023725f-p1ul7i.mp4
"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <hr className="my-10 mx-auto w-3/4 border-t border-tan" />

      <section
        className="bg-slate bg-dotted-pattern bg-contain py-5 md:py-10"
        id="attend"
      >
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center items-center gap-8 mx-auto">
            <h2 className="h2-bold text-tan text-center">
              Easy and secure camp registration
            </h2>
            <p className="p-regular-18 md:p-regular-20 text-tan text-center">
              Camp attendees can securely purchase access to training camps
              using Stripe checkout and effortlessly track their tickets in
              their user profile on Campify.
            </p>
            <p className="p-regular-18 md:p-regular-20 text-tan text-center">
              Experience seamless and secure registration, and keep all your
              camp details in one place.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <video
              width="400"
              height="800"
              controls
              className="border-2 border-tan rounded-xl"
              poster="/assets/images/cmpfy_poster2.png"
            >
              <source
                src="https://utfs.io/f/5332055e-86a7-400e-817e-2c795be43388-p1ul7h.mp4
"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </>
  );
};

export default Learn;
