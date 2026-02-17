import { forwardRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Mail, User, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactFormProps {
  name: string;
  email: string;
  phone: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  emailError?: string;
  phoneError?: string;
}

const ContactForm = forwardRef<HTMLDivElement, ContactFormProps>(
  (
    { name, email, phone, onNameChange, onEmailChange, onPhoneChange, emailError, phoneError },
    ref
  ) => {
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);

    // Show additional fields when name has content
    useEffect(() => {
      if (name.trim().length > 0 && !showAdditionalFields) {
        setShowAdditionalFields(true);
      }
    }, [name, showAdditionalFields]);

    // Format phone with +1 default if empty
    const handlePhoneChange = (value: string) => {
      // If user is typing and phone is empty, prepend +1
      if (value && !phone && !value.startsWith("+")) {
        onPhoneChange("+1 " + value);
      } else {
        onPhoneChange(value);
      }
    };

    const handlePhoneFocus = () => {
      // Prepopulate with +1 when focusing on empty field
      if (!phone) {
        onPhoneChange("+1 ");
      }
    };

    return (
      <div ref={ref} className="w-full max-w-md mx-auto space-y-3" style={{ minHeight: "220px" }}>
        {/* Name Field */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/60" strokeWidth={1.5} />
          <Input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Your first name"
            className="w-full pl-12 pr-6 py-3 h-12 text-base bg-primary-foreground/20 backdrop-blur-sm border-2 border-primary-foreground/30 rounded-full text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary focus:bg-primary-foreground/30 transition-all"
          />
        </div>

        {/* Email and Phone Fields - Progressive Reveal */}
        <AnimatePresence>
          {showAdditionalFields && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-3"
            >
              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/60" strokeWidth={1.5} />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder="Your email address"
                  className={`w-full pl-12 pr-6 py-3 h-12 text-base bg-primary-foreground/20 backdrop-blur-sm border-2 rounded-full text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary focus:bg-primary-foreground/30 transition-all ${
                    emailError ? "border-red-400" : "border-primary-foreground/30"
                  }`}
                />
                {emailError && (
                  <p className="text-red-300 text-xs mt-1 ml-4">{emailError}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/60" strokeWidth={1.5} />
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onFocus={handlePhoneFocus}
                  maxLength={17}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full pl-12 pr-6 py-3 h-12 text-base bg-primary-foreground/20 backdrop-blur-sm border-2 rounded-full text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary focus:bg-primary-foreground/30 transition-all ${
                    phoneError ? "border-red-400" : "border-primary-foreground/30"
                  }`}
                />
                {phoneError && (
                  <p className="text-red-300 text-xs mt-1 ml-4">{phoneError}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Privacy Note */}
        <p className="text-xs text-primary-foreground/60 text-center pt-2 px-4">
          We respect your privacy. Your information is used only to contact you
          about our services.
        </p>
      </div>
    );
  }
);

ContactForm.displayName = "ContactForm";

export default ContactForm;
