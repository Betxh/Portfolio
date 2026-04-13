import { motion, AnimatePresence } from "framer-motion";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: string;
  title: string;
  children: React.ReactNode;
}

const PortfolioModal = ({ isOpen, onClose, icon, title, children }: PortfolioModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-foreground/60 backdrop-blur-xl z-[2000] flex items-center justify-center p-5 md:p-10"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, y: 60, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="glass-strong rounded-[36px] max-w-[1000px] w-full max-h-[90vh] overflow-hidden shadow-deep border border-border/30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-8 md:px-12 py-7 border-b border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 gradient-bg-1 rounded-2xl flex items-center justify-center text-3xl shadow-glow">
                {icon}
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold">{title}</h2>
                <div className="h-0.5 w-12 bg-primary/30 rounded-full mt-1" />
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-destructive/80 text-destructive-foreground text-lg flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all duration-300 border-none backdrop-blur-sm"
            >
              ×
            </button>
          </div>
          <div className="px-8 md:px-12 py-10 max-h-[calc(90vh-100px)] overflow-y-auto scrollbar-thin">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const aboutSpecializations = [
  "✓ Creating hand-drawn illustrations and graphics",
  "✓ Video Editing and motion graphics for dynamic storytelling",
  "✓ UI/UX design and interactive prototyping",
  "✓ Frontend development with modern frameworks",
];

const skills = {
  dev: ["JavaScript", "Python", "HTML/CSS", "C++", "VB.NET", "Visual Studio IDE", "Computer Systems Servicing", "System Integration", "Network Management"],
  design: ["Figma", "DaVinci Resolve", "Procreate", "Canva", "CapCut", "Social Media Management", "Video Editing", "Graphic Design"],
};

const projects = [
  { title: "Videos I Edited", desc: "Professional video editing with motion graphics, transitions, and color grading", tags: ["Video Editing", "Motion Graphics", "Post-Production"], href: "https://taftsti-my.sharepoint.com/:f:/g/personal/sanares_469842_pasay-edsa_sti_edu_ph/IgAWl95meDSJTaiEZaEzeq-9AXk25B2wUpR31yWISmfBpcM?e=D76Be6" },
  { title: "Graphic Designs", desc: "Creative graphic design work including branding and visual identity", tags: ["Graphic Design", "Branding", "Visual Design"], href: "https://taftsti-my.sharepoint.com/:f:/g/personal/sanares_469842_pasay-edsa_sti_edu_ph/IgAWl95meDSJTaiEZaEzeq-9AXk25B2wUpR31yWISmfBpcM?e=D76Be6" },
  { title: "Online Shop", desc: "Full-featured online selling platform for design products", tags: ["E-Commerce", "Sales", "Business"], href: "https://www.facebook.com/nsxgaminghub/" },
  { title: "T-Shirt Designs", desc: "Custom t-shirt designs with unique graphics and artwork", tags: ["Graphic Design", "Merch", "Product Design"], href: "http://tee.pub/lic/fashionablylate" },
];

const socials = [
  { icon: "📺", name: "YouTube", href: "https://youtube.com/@alwaysfashionablylate" },
  { icon: "📷", name: "Instagram", href: "https://www.instagram.com/latebut.luxe" },
  { icon: "👥", name: "Facebook", href: "https://www.facebook.com/nsxgaminghub/" },
  { icon: "👕", name: "Teespring Shop", href: "http://tee.pub/lic/fashionablylate" },
];

const gradientClasses = ["gradient-bg-1", "gradient-bg-2", "gradient-bg-3", "gradient-bg-4", "gradient-bg-5"];

interface ModalContentsProps {
  activeModal: string | null;
  onClose: () => void;
}

const ModalContents = ({ activeModal, onClose }: ModalContentsProps) => {
  return (
    <>
      <PortfolioModal isOpen={activeModal === "about"} onClose={onClose} icon="👤" title="About Me">
        <div className="mb-10">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">Hello! I'm a Versatile Digital Professional</h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Based in the Philippines, I'm a freelance creative and technical specialist with a background in Computer Systems Servicing. 
            I used to be an engineering student, now I'm a Computer Science student.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            My work sits at the intersection of art and technology. The best digital experiences come from combining beautiful design with robust technical execution.
          </p>
        </div>
        <div className="mb-10">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">What I Do</h3>
          <ul className="space-y-3">
            {aboutSpecializations.map((item, i) => (
              <li key={i} className="py-3 px-5 bg-primary/5 border-l-4 border-primary rounded-lg hover:translate-x-2 hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-10">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">Interests & Hobbies</h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            When I'm not coding or designing, you'll find me exploring game development, singing songs, making art, playing video games, or creating content on YouTube.
          </p>
        </div>
      </PortfolioModal>

      <PortfolioModal isOpen={activeModal === "work"} onClose={onClose} icon="💼" title="Portfolio">
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">Featured Projects</h3>
        <p className="text-base text-muted-foreground leading-relaxed mb-8">
          A selection of my recent work showcasing web development, animation, and design projects.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <a
              key={i}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-[25px] border border-border bg-card overflow-hidden hover:-translate-y-2 hover:shadow-card-hover transition-all duration-400 no-underline text-inherit group"
            >
              <div className={`w-full h-48 ${gradientClasses[i % gradientClasses.length]} relative`}>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-foreground/30 to-transparent" />
              </div>
              <div className="p-6">
                <h4 className="font-display text-xl font-bold mb-2">{p.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span key={t} className="px-3 py-1 bg-primary/10 text-primary rounded-xl text-xs font-semibold">{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </PortfolioModal>

      <PortfolioModal isOpen={activeModal === "skills"} onClose={onClose} icon="⚡" title="Skills & Tools">
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">Development & Technical</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {skills.dev.map((s, i) => (
            <div key={s} className="px-5 py-4 bg-primary/8 border-2 border-transparent rounded-2xl text-center font-semibold text-sm text-primary hover:border-primary hover:-translate-y-1 hover:shadow-glow transition-all duration-300 animate-skill-pop" style={{ animationDelay: `${i * 0.1}s` }}>
              {s}
            </div>
          ))}
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">Design & Creative</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {skills.design.map((s, i) => (
            <div key={s} className="px-5 py-4 bg-primary/8 border-2 border-transparent rounded-2xl text-center font-semibold text-sm text-primary hover:border-primary hover:-translate-y-1 hover:shadow-glow transition-all duration-300 animate-skill-pop" style={{ animationDelay: `${(i + skills.dev.length) * 0.1}s` }}>
              {s}
            </div>
          ))}
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">What Sets Me Apart</h3>
        <p className="text-base text-muted-foreground leading-relaxed">
          I bridge the gap between technical infrastructure and creative execution. With TESDA NC II certification in Computer Systems Servicing, I understand both the creative tools and the technical foundations that power them.
        </p>
      </PortfolioModal>

      <PortfolioModal isOpen={activeModal === "links"} onClose={onClose} icon="🔗" title="Connect With Me">
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">Find Me Online</h3>
        <p className="text-base text-muted-foreground leading-relaxed mb-8">I'm active across various platforms. Follow me to stay updated!</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {socials.map((s, i) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-7 bg-card border border-border rounded-2xl no-underline text-foreground hover:border-primary hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`w-14 h-14 ${gradientClasses[i % gradientClasses.length]} rounded-2xl flex items-center justify-center text-3xl`}>
                {s.icon}
              </div>
              <span className="font-semibold text-base">{s.name}</span>
            </a>
          ))}
        </div>
      </PortfolioModal>

      <PortfolioModal isOpen={activeModal === "contact"} onClose={onClose} icon="✉️" title="Get In Touch">
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">Let's Create Something Amazing</h3>
        <p className="text-base text-muted-foreground leading-relaxed mb-8">
          I'm always excited to work on new projects. Whether you have a specific project in mind or just want to chat about possibilities, I'd love to hear from you.
        </p>
        <div className="gradient-bg-primary rounded-[30px] p-12 text-center text-primary-foreground mb-10 animate-neon-pulse">
          <div className="text-7xl mb-6 animate-bounce-float">📧</div>
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">Email Me Directly</h3>
          <div className="text-lg md:text-2xl font-semibold mb-6 break-all">ashleysanares@gmail.com</div>
          <a href="mailto:ashleysanares@gmail.com" className="inline-block px-8 py-3 bg-card text-primary rounded-full font-semibold hover:-translate-y-1 transition-transform duration-300 no-underline">
            Send Email →
          </a>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">What to Expect</h3>
        <p className="text-base text-muted-foreground leading-relaxed">
          When you reach out, I typically respond within 24 hours. I'll ask about your project goals, timeline, and budget to ensure we're a good fit.
        </p>
      </PortfolioModal>

      <PortfolioModal isOpen={activeModal === "resume"} onClose={onClose} icon="📄" title="My Resume">
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">Professional Resume</h3>
        <p className="text-base text-muted-foreground leading-relaxed mb-8">
          Here's my professional resume showcasing my skills, experience, and qualifications.
        </p>
        <div className="text-center my-10">
          <div className="gradient-bg-1 rounded-2xl p-14 inline-block mb-8">
            <div className="text-6xl mb-5">📋</div>
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">Ashley Sanares</h3>
            <p className="text-primary-foreground/90">Creative Media Specialist</p>
          </div>
          <div>
            <a
              href="/My_Professional_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-base shadow-premium hover:-translate-y-1 transition-all duration-300 no-underline"
            >
              📥 Download Resume PDF
            </a>
          </div>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-5">Quick Overview</h3>
        <ul className="space-y-0">
          {[
            { icon: "🎓", text: "TESDA NC II Certified in Computer Systems Servicing" },
            { icon: "💻", text: "Multi-Stack Programming & System Optimization" },
            { icon: "🎬", text: "Creative Design & Multimedia Production" },
            { icon: "✨", text: "Technical Operations & Network Management" },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
              <span className="text-xl">{item.icon}</span>
              <span className="text-base">{item.text}</span>
            </li>
          ))}
        </ul>
      </PortfolioModal>
    </>
  );
};

export default ModalContents;
