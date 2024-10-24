import Image from "next/image";
import Hero from "../components/Hero";
import { searchGames } from "../components/utils/Api";
import GridContainer from "../components/defaults/GridContainer";
import SwiperCards from "../components/SwiperCards";
import Heading from "../components/defaults/Heading";

export default async function Home() {
  const data = await searchGames("", 1, [], 9);
  console.log(data);
  const { results } = data.data;
  return (
    <section className="  ">
      <Hero />

      <div className=" w-full flex flex-col gap-4  relative">
        <Heading text="Top Games" />
        <SwiperCards
          autoplay
          className=" h-full"
          items={results.map((game: Game) => {
            return {
              card: (
                <div className="  w-full h-full" key={game.id}>
                  <div
                    className="rounded-2xl  after:opacity-40 hover:after:h-full after:absolute after:inset-0 relative 
                    after:bg-rose-400
                   after:w-0 hover:after:w-full cursor-pointer  group after:duration-200 overflow-hidden w-full   h-96"
                  >
                    <Image
                      className=" group-hover:scale-125 group-hover:rotate-6  duration-300 object-cover"
                      src={game.background_image}
                      alt={game.name}
                      fill
                    />
                  </div>
                  <div>
                    <h1 className=" text-base line-clamp-1 ml-2 mt-2 font-semibold text-white">{game.name}</h1>
                  </div>
                </div>
              ),
            };
          })}
        />
      </div>
    </section>
  );
}
