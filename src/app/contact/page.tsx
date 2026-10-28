import { Metadata } from "next";
import Win7Desktop from "@/components/win7/Win7Desktop";

export const metadata: Metadata = {
  title: "Windows Live Mail (Contact) | Derek David",
  description: "Get in touch with Derek David.",
};

export default function ContactPage() {
  return <Win7Desktop initialWindow="contact" initialExplorerFolder="projects" />;
}
