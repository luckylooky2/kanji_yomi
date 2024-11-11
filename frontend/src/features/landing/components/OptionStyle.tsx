import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const OptionStyle = ({ title, children }: Props) => {
  return (
    <article>
      <h3>{title}</h3>
      <div style={{ height: "50px", display: "flex", alignItems: "center" }}>
        {children}
      </div>
    </article>
  );
};

export default OptionStyle;
