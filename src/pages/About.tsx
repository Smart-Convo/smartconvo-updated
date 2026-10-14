
import { SectionWrapper } from "../components/kit/SectionWrapper"
import { GradientText } from "../components/kit/GradientText"
import { SectionTag } from "../components/kit/SectionTag"

const capabilities = [
  {
    title: "AI Engineering",
    description: "Advanced natural language processing and machine learning models",
    tech: ["GPT-4", "Custom NLP", "Voice Recognition"],
  },
  {
    title: "Voice Technology",
    description: "Crystal-clear, human-like voice synthesis and real-time processing",
    tech: ["Neural TTS", "Low Latency", "Multi-Language"],
  },
  {
    title: "Integration Expertise",
    description: "Seamless connection with your existing business systems",
    tech: ["CRM", "POS", "Booking Systems"],
  },
  {
    title: "24/7 Reliability",
    description: "Enterprise-grade infrastructure with 99.9% uptime guarantee",
    tech: ["Cloud Native", "Auto-Scaling", "Monitoring"],
  },
  {
    title: "Data Security",
    description: "Bank-level encryption and compliance with industry standards",
    tech: ["SOC 2", "GDPR", "HIPAA Ready"],
  },
  {
    title: "Continuous Learning",
    description: "AI that gets smarter with every conversation",
    tech: ["ML Pipeline", "A/B Testing", "Analytics"],
  },
]

const values = [
  {
    value: "Innovation First",
    description: "We push the boundaries of what's possible with AI, constantly exploring new ways to enhance customer communication.",
  },
  {
    value: "Customer Success",
    description: "Your growth is our success. We're committed to delivering measurable results and exceptional support.",
  },
  {
    value: "Transparency",
    description: "Clear pricing, honest communication, and open about our capabilities and limitations.",
  },
  {
    value: "Accessibility",
    description: "Enterprise-grade AI should be available to businesses of all sizes, not just Fortune 500 companies.",
  },
]

export default function AboutPage() {

  return (
    <div>
      

      {/* Hero */}
      <section className="pt-10 sm:pt-16 pb-10 sm:pb-16">
        <div className="container-large">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                <GradientText>Pentagon AI</GradientText>
              </h1>
              <p className="text-base sm:text-xl text-zinc-300 max-w-lg leading-relaxed">
                Revolutionizing customer communication with{" "}
                <span className="text-accent font-bold">AI-powered voice agents</span> that understand, engage, and convert 24/7.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#D4FF00] rounded-full animate-pulse-dot" />
                  Industry-agnostic AI solutions
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6">
              <div>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-3">Industries</p>
                <div className="flex flex-wrap gap-2">
                  {["Government", "Enterprise", "Restaurants", "Healthcare", "Hospitality", "Automotive"].map((ind) => (
                    <span
                      key={ind}
                      className="px-3 py-1 text-xs border border-white/10 rounded-full hover:border-accent hover:text-accent transition-all"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Toronto, Canada
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <SectionWrapper bg="peach" rounded overlaps>
        <div className="animate-on-scroll">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-8 sm:mb-10">
            Our Mission &amp; <GradientText>Vision</GradientText>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Our Mission",
                content: "To empower organizations with cutting-edge AI solutions that transform operations, enhance customer experiences, and drive measurable business outcomes across every industry.",
              },
              {
                title: "Our Vision",
                content: "A world where artificial intelligence is accessible to all, enabling businesses of every size to compete globally with enterprise-grade AI tools that were once reserved for Fortune 500 companies.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 border border-white/10 rounded-[1rem] hover:border-accent/30 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#D4FF00] to-[#4374b9] rounded-full" />
                  <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{item.title}</h3>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed pl-6">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Team Capabilities */}
      <SectionWrapper bg="warm-grey" rounded overlaps>
        <div className="animate-on-scroll">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
            What We <GradientText>Bring</GradientText>
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mb-8 sm:mb-10">
            A team of AI engineers, voice technology experts, and customer experience specialists dedicated to transforming business communication.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, index) => (
              <div
                key={index}
                className="p-6 bg-zinc-900/70 border border-white/10 rounded-[1rem] hover:border-accent/30 transition-all duration-300 hover:shadow-md group"
              >
                <h3 className="text-base font-bold mb-2 group-hover:text-accent transition-colors">{cap.title}</h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">{cap.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cap.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs text-zinc-400 border border-white/10 rounded group-hover:border-accent/30 group-hover:text-accent transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper bg="white" rounded overlaps>
        <div className="animate-on-scroll">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-8 sm:mb-10">
            Our <GradientText>Values</GradientText>
          </h2>

          <div className="space-y-6">
            {values.map((item, index) => (
              <div
                key={index}
                className="grid lg:grid-cols-12 gap-4 py-5 border-b border-white/10 group"
              >
                <div className="lg:col-span-4">
                  <h3 className="text-lg font-bold group-hover:text-accent transition-colors">{item.value}</h3>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-sm text-zinc-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      
    </div>
  )
}
