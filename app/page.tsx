import { getPosts } from "@/lib/cms";
import { HomePostList } from "@/components/HomePostList";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-6 lg:py-12">
      <HomePostList posts={posts} pageSize={4} />
    </div>
  );
}

