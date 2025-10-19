import React from "react";
const stats = [
  {
    id: "stat1",
    value: "85%",
    description: "users get first results within first two weeks",
  },
  {
    id: "stat2",
    value: "79%",
    description: "users say they feel less stressed about money",
  },
  {
    id: "stat3",
    value: "5K+",
    description: "users already use our Finest Service",
  },
  {
    id: "stat4",
    value: "4.8",
    description: "average rating from thousands of happy users",
  },
];
const Stats = () => {
  return (
    <section className="padding py-16 sm:py-20 w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.id}>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {stat.value}
            </h3>
            <p className="text-darkgray text-sm sm:text-base max-w-3xs mt-4">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
