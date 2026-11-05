import HeroBanner from "./component/HeroBanner";
import NewArrivals from "./component/NewArrivals";
import HowItWorks from "./component/HowItWorks";
import ReaderReviews from "./component/ReaderReviews";
import TopCategories from "./component/TopCategories";

export const metadata = {
  title: "BookNook | Home",
  description: "A shared reading space for book lovers.",
};

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
      <ReaderReviews />
    </div>
  );
}
