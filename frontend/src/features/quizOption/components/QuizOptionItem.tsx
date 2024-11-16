import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const QuizOptionItem = ({ title, children }: Props) => {
  return (
    <article style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h3>{title}</h3>
      <div style={{ height: "50px", display: "flex", alignItems: "center" }}>
        {children}
      </div>
    </article>
  );
};

export default QuizOptionItem;
