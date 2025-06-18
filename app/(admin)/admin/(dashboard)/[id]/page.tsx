"use client";

import { ContentLayout } from "@/components/layouts/content-layout";

// const params = useParams<{ id: string }>();

// const { isError, isLoading, user } = useUser(params.id);
const Home = () => {
  // console.log(user);

  return (
    <ContentLayout title="Home" className="space-y-8">
      HomePage
    </ContentLayout>
  );
};

export default Home;
