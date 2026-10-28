import { Metadata } from "next";
import Win7Desktop from "@/components/win7/Win7Desktop";

export const metadata: Metadata = {
  title: "Projects & Experience — Windows Explorer | Derek David",
  description: "Professional experience and projects file explorer of Derek David.",
};

export default function ProjectsPage() {
  return <Win7Desktop initialWindow="explorer" initialExplorerFolder="projects" />;
}
