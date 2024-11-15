import BottomNavigation from "@/features/navigation/components/BottomNavigation";

interface Props {
  children: React.ReactNode;
  path: string;
}

const Page = ({ children, path }: Props) => {
  return (
    <div style={{ height: "500px", width: "300px" }}>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        {children}
        <BottomNavigation path={path} />
      </section>
    </div>
  );
};

export default Page;
