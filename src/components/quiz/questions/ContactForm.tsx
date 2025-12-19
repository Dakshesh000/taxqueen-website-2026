import { Input } from "@/components/ui/input";
import { Mail, User } from "lucide-react";

interface ContactFormProps {
  name: string;
  email: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

const ContactForm = ({
  name,
  email,
  onNameChange,
  onEmailChange,
}: ContactFormProps) => {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Name Field */}
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/60" />
        <Input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Your first name"
          className="w-full pl-12 pr-6 py-4 h-14 text-lg bg-primary-foreground/20 backdrop-blur-sm border-2 border-primary-foreground/30 rounded-full text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary focus:bg-primary-foreground/30 transition-all"
        />
      </div>

      {/* Email Field */}
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/60" />
        <Input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="Your email address"
          className="w-full pl-12 pr-6 py-4 h-14 text-lg bg-primary-foreground/20 backdrop-blur-sm border-2 border-primary-foreground/30 rounded-full text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary focus:bg-primary-foreground/30 transition-all"
        />
      </div>

      {/* Privacy Note */}
      <p className="text-xs text-primary-foreground/60 text-center mt-4 px-4">
        We respect your privacy. Your information is used only to contact you
        about our services.
      </p>
    </div>
  );
};

export default ContactForm;
