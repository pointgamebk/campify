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
    </>
  );
};

export default Landing;
