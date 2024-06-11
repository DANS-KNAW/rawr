import { ReactNode } from "react";

export default function InfoDialog({
  display = false,
  content,
}: {
  display: boolean;
  content: ReactNode[];
}) {
  return <div className={`${display ? "block" : "hidden"}`}>{content}</div>;
}
