const Learn = async () => {
  return (
    <>
      <nav className="bg-slate-800 py-4">
        <div className="container mx-auto flex justify-center">
          <ul className="flex space-x-10 list-none">
            <li className="list-none">
              <a href="#grow" className="text-tan hover:text-green text-lg">
                Grow
              </a>
            </li>
            <li>
              <a href="#manage" className="text-tan hover:text-green text-lg">
                Manage
              </a>
            </li>
            <li>
              <a href="#attend" className="text-tan hover:text-green text-lg">
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
            >
              <source src="/assets/videos/CMPFY_V1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

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
            >
              <source src="/assets/videos/CMPFY_V2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

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
            >
              <source src="/assets/videos/CMPFY_V3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </>
  );
};

export default Learn;
