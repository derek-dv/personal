import { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Derek David",
  description: "Get in touch with Derek David.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-up in-view">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Get in Touch</h1>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              I am currently open to new opportunities, particularly roles focused on Machine Learning Engineering, Backend Architecture, and integrating AI models into robust full-stack applications.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1 text-[var(--muted-foreground)]">Email</h3>
                <a href="mailto:derekmiracledavid@gmail.com" className="font-medium hover:text-[var(--accent)] transition-colors">
                  derekmiracledavid@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1 text-[var(--muted-foreground)]">Location</h3>
                <p className="font-medium">
                  Available for Remote Work worldwide.<br/>
                  Based in Nigeria / Sweden.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 md:p-8 shadow-sm">
          <form className="space-y-6" action="https://formspree.io/f/placeholder" method="POST">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-[var(--foreground)]">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-[var(--foreground)]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-[var(--foreground)]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all resize-y"
                placeholder="How can we work together?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--foreground)] text-[var(--background)] font-medium px-6 py-3 rounded-md hover:bg-[var(--foreground)]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--foreground)] focus:ring-offset-[var(--background)]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
