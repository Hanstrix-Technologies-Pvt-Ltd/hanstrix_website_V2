import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "AI & Machine Learning",
    description:
      "Stay competitive with AI and machine learning solutions from Hanstrix Technologies. We help organizations harness the power of real-time data and intelligent automation to drive smarter decisions. Our expertise includes:",
    listItems: [
      "Generative AI",
      "Natural Language Processing (NLP)",
      "Predictive Analytics",
      "Computer Vision",
      "Machine Learning Operations (MLOps)",
      "Data Annotation and Management",
    ],
    imageSrc: "/ai-2.png",
    alt: "AI & Machine Learning",
    href: "/services/ai-ml",
  },
  {
    title: "ERP Solutions",
    description:
      "We offer customized ERP software to streamline your business processes, enhance operational efficiency, and reduce costs. Our solutions integrate all aspects of your business, from finance and human resources to inventory and sales. Our ERP services include:",
    listItems: [
      "Custom ERP Software Development",
      "ERP Implementation and Integration",
      "Module Customization",
      "Data Migration and Support",
    ],
    imageSrc: "/erp.png",
    alt: "ERP Solutions",
    href: "/services/erp-software",
  },
  {
    title: "Website Development",
    description:
      "We build responsive, high-performance websites using modern technologies like React, Next.js, Tailwind CSS, and Express.js. Our solutions are SEO-optimized, fast, and seamless across devices—whether it's a landing page, blog, or full-stack platform. Our key areas of focus include:",
    listItems: [
      "Responsive Design",
      "Content Management",
      "User Settings",
      "Apps Development",
      "Web Coding",
      "UI/UX Layout",
      "Rigorous Testing Features",
      "Web Analytics",
    ],
    imageSrc: "/web-development.png",
    alt: "Web Development",
    href: "/services/website-development",
  },
  {
    title: "Digital Marketing",
    description:
      "We deliver powerful digital marketing services that increase your online visibility, attract qualified leads, and improve your return on investment. Our strategies are built on a foundation of data-driven insights. Our services include:",
    listItems: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing",
      "Pay-Per-Click (PPC) campaigns",
      "Content Marketing",
      "Web Analytics",
    ],
    imageSrc: "/digital-marketing.png",
    alt: "Digital Marketing",
    href: "/services/digital-marketing",
  },
];

const ServicesSection = () => {
  return (
    // Default rhythm + tighter top, and remove bottom padding
    <section
      id="services"
      className="relative section-spacing section-spacing--tight-top !pb-13"
    >
      <div className="relative z-10 container mx-auto max-w-7xl container-gutters">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gradient-neon mb-6 sm:mb-8 lg:mb-10">
          Our Services
        </h2>

        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-3 sm:gap-5 md:gap-10 lg:gap-12 ${
              index !== services.length - 1 ? "mb-10 md:mb-12 lg:mb-14" : "mb-0"
            } ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            {/* Image */}
            <div className="order-1 md:order-2 w-full md:w-1/2 lg:w-1/2 xl:w-[45%]">
              <Image
                src={service.imageSrc}
                alt={service.alt}
                width={600}
                height={400}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(min-width: 1280px) 45vw, (min-width: 768px) 50vw, 100vw"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="order-2 md:order-1 w-full md:w-1/2 lg:w-1/2 xl:w-[55%]">
              <Card className="bg-transparent border-white/20 text-zinc-200 p-4 sm:p-5 md:p-6 lg:p-7 shadow-lg card-glow-hover rounded-xl">
                <CardHeader className="p-0 mb-2 sm:mb-3">
                  <CardTitle className="text-2xl sm:text-[1.65rem] md:text-3xl font-bold text-cyan-400">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="mb-4 text-base sm:text-[1.05rem] md:text-lg leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-6">
                    {service.listItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-base sm:text-lg"
                      >
                        <span className="text-cyan-400 font-bold leading-6">
                          •
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={service.href}>
                    <Button className="btn w-full sm:w-auto">
                      Explore Service
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
