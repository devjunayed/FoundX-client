
export default function layout({
  children,
  RecentPosts,
}: {
 children: React.ReactNode;
  RecentPosts: React.ReactNode;
}) {
  return <div>
    {children}
    {RecentPosts}
  </div>;
}
