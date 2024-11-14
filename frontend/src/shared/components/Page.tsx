interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props) => {
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
      </section>
    </div>
  );
};

export default Page;
