const Landing = async () => {
  return (
    <>
      <section className="bg-slate bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 mr-20">
            <h2 className="h2-bold text-tan">
              Grow Your Training Business with Campify
            </h2>
            <p className="p-regular-18 md:p-regular-20 text-tan">
              Here is a step-by-step demonstration of how to register as an
              athlete instructor on Campify, connect your account to Stripe for
              secure payments, and create your very own camps. Watch to see how
              easy it is to get started and take your training to the next
              level. Ready to inspire and train the next generation of athletes?
              Start your journey with Campify today.
            </p>
          </div>

          <video
            width="400"
            height="800"
            controls
            className="border border-tan rounded object-contain object-center"
          >
            <source src="/assets/videos/CMPFY_V1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      <section className="bg-slate bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 mr-20">
            <h2 className="h2-bold text-tan">
              Effortlessly track and manage your sales with the Instructor
              Dashboard on Campify
            </h2>
            <p className="p-regular-18 md:p-regular-20 text-tan">
              With our intuitive dashboard, staying on top of your earnings and
              managing your training camps has never been easier. Designed to
              streamline your workflow and maximize your success.
            </p>
          </div>

          <video
            width="400"
            height="800"
            controls
            className="border border-tan rounded object-contain object-center"
          >
            <source src="/assets/videos/CMPFY_V2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      <section className="bg-slate bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 mr-20">
            <h2 className="h2-bold text-tan">
              Easy and secure camp registration
            </h2>
            <p className="p-regular-18 md:p-regular-20 text-tan">
              Camp attendees can securely purchase access to training camps
              using Stripe checkout and effortlessly track their tickets in
              their user profile on Campify.
            </p>
            <p className="p-regular-18 md:p-regular-20 text-tan">
              Experience seamless and secure registration, and keep all your
              camp details in one place.
            </p>
          </div>

          <video
            width="400"
            height="800"
            controls
            className="border border-tan rounded object-contain object-center"
          >
            <source src="/assets/videos/CMPFY_V3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </>
  );
};

export default Landing;
