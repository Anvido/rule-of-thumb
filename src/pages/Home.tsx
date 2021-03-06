import { FC } from "react";

import HomeHeader from "../components/home/HomeHeader";
import BannerBottom from "../components/home/BannerBottom";
import BannerTop from "../components/home/BannerTop";
import VoteList from "../components/voteSection/VoteList";

const Home: FC = () => {
  return (
    <>
      <HomeHeader />
      <div className="max-centered">
        <BannerTop />
        <main role="main">
          <VoteList />
        </main>
        <BannerBottom />
      </div>
    </>
  );
};

export default Home;
