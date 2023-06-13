import { type NextPage } from "next";
import DefaultLayout from "~/features/common/components/defaultLayout";
import Greeting from "~/features/common/components/greeting";

const HomePageComponent: NextPage = () => {
  return (
    <DefaultLayout pageTitle="Todos Application Demo" pageDescription="The home page of the Todos Application Demo">
      <Greeting />
    </DefaultLayout>
  );
};

export default HomePageComponent;
