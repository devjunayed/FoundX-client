import { Button } from "@heroui/button";
import Link from "next/link";
import { getRecentPosts } from "@/src/services/RecentPosts";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Badge } from "@heroui/badge";
import Container from "../../UI/Container";

export default async function RecentPosts() {
  const { data: posts } = await getRecentPosts();

  console.log(posts);

  return (
    <Container>
      <>
        <div className="section-title my-8">
          <h2 className="mb-2 text-center text-2xl">Recently Found Items</h2>
          <p className="text-center">
            A list of items that have been recently found and reported.
          </p>
        </div>
        <div className="my-8 grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-4">
          {posts.map((item: any, index: number) => (
            <Card key={index}>
              <CardBody className="overflow-visible p-0">
                <Badge children={<p>{item.title}</p>} />
                <Image
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  radius="lg"
                  shadow="sm"
                  src={item.images[0]}
                  width="100%"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.title}</b>
                <p className="text-default-500">{item.price}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button className="rounded-md bg-default-900 text-default" size="md">
            <Link href="/found-items">See All</Link>
          </Button>
        </div>
      </>
    </Container>
  );
}
