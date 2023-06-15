import { type NextPage } from "next";
import Link from "next/link";
import DefaultLayout from "~/features/common/components/defaultLayout";
import Greeting from "~/features/common/components/greeting";
import { useSession } from "next-auth/react";

const HomePageComponent: NextPage = () => {
  const { status } = useSession();
  return (
    <DefaultLayout pageTitle="Todos Application Demo" pageDescription="The home page of the Todos Application Demo">
      <Greeting />
      {
        status === "authenticated" && (
          <ul className='list-disc ml-4'>
            <li>
              <Link href="/todos" className='underline'>
                Manage Todos
              </Link>
            </li>
          </ul>
        )
      }
    </DefaultLayout>
  );
};

export default HomePageComponent;
