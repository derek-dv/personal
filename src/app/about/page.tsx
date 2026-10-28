import { Metadata } from "next";
import Win7Desktop from "@/components/win7/Win7Desktop";

export const metadata: Metadata = {
  title: "System Properties (About) | Derek David",
  description: "Background, education, and core competencies of Derek David.",
};

export default function AboutPage() {
  return <Win7Desktop initialWindow="about" initialExplorerFolder="skills" />;
}
