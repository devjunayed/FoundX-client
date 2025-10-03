import Container from "@/src/components/UI/Container";
import Post from "./_components/Post";
import axiosInstance from "@/src/lib/AxiosInstance";

export default async function FoundItemsPage() {
  const {data} = await axiosInstance.get("/items");
  return (
    <Container>
      <Post items={data.data}/>
    </Container>
  );
}
