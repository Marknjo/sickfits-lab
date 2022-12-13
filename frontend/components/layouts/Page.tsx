import { BasicProps } from "../../types/BasicProps";

export default function Page({ children }: BasicProps) {
  return (
    <div>
      <h1>Sickfits E-commerce Site</h1>
      {children}
    </div>
  );
}
