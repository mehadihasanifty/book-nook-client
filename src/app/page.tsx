import HeroBanner from "./component/HeroBanner";
import HowItWorks from "./component/HowItWorks";
import ReaderReviews from "./component/ReaderReviews";
import TopCategories from "./component/TopCategories";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <HowItWorks />
      <TopCategories />
      <ReaderReviews />
    </div>
  );
}