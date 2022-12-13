import { BasicProps } from "../../types/BasicProps";
import Header from "../ui/Header";

export default function Page({ children }: BasicProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
