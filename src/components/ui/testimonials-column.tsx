import React, { memo } from "react";
import { motion } from "motion/react";

export type TestimonialItem = {
  type: "testimonial";
  text: string;
  name: string;
  role?: string;
  avatar?: string;
};

export type ImageItem = {
  type: "image";
  src: string;
  alt: string;
};

export type ColumnItem = TestimonialItem | ImageItem;

const TestimonialsColumn = memo((props: {
  className?: string;
  items: ColumnItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.items.map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-lg shadow-primary/10 max-w-xs w-full"
              >
                {item.type === "testimonial" ? (
                  <div className="space-y-4">
                    <p className="text-foreground italic text-sm leading-relaxed">
                      "{item.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      {item.avatar ? (
                        <img 
                          src={item.avatar} 
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-bold text-sm">
                            {item.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-sm tracking-tight">
                          {item.name}
                        </span>
                        {item.role && (
                          <span className="text-xs text-muted-foreground">
                            {item.role}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
});

TestimonialsColumn.displayName = "TestimonialsColumn";

export { TestimonialsColumn };
