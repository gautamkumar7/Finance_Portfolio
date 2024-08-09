import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ArrowUpRight } from 'lucide-react';

const teamMembers = [
  {
    name: "Gautam",
    imageSrc: "/hero.jpeg",
    linkedIn: "https://www.linkedin.com/in/gautamfromdtu/",
    github: "https://github.com/gautamkumar7",
  },
  {
    name: "Aakriti",
    imageSrc: "/placeholder-user.jpg",
    linkedIn: "#",
    github: "#",
  },
  {
    name: "Pavithra",
    imageSrc: "/placeholder-user.jpg",
    linkedIn: "#",
    github: "#",
  },
  {
    name: "Tanya",
    imageSrc: "/placeholder-user.jpg",
    linkedIn: "#",
    github: "#",
  },
];

const OurTeam = () => {
  return (
    <section className="w-full py-16 md:py-28 lg:py-36 bg-muted">
      <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6 lg:gap-12">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Meet Our Team
            </h2>
            <Button asChild className="text-xl font-semibold sm:text-2xl md:text-3xl h-auto py-2 px-4">
              <Link href="/portfolio" className="flex items-center gap-2">
                App
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </Link>
            </Button>
          </div>
          <p className="mx-auto max-w-[800px] text-xl text-muted-foreground md:text-2xl/relaxed lg:text-xl/relaxed xl:text-2xl/relaxed">
            Get to know more about our team, feel free to reach out to us :)
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center justify-center gap-6 rounded-xl bg-background p-8 shadow-lg transition-all hover:bg-card hover:shadow-xl"
            >
              <Avatar className="h-40 w-40">
                <AvatarImage src={member.imageSrc} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-2 text-center">
                <h3 className="text-2xl font-semibold">{member.name}</h3>
              </div>
              <div className="flex gap-4">
                <Link 
                  href={member.linkedIn} 
                  aria-label="LinkedIn" 
                  prefetch={false}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} style={{ color: "#2089d9" }} className="h-8 w-8 hover:text-primary" />
                </Link>
                <Link 
                  href={member.github} 
                  aria-label="GitHub" 
                  prefetch={false}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} style={{ color: "#a136d3" }} className="h-8 w-8 hover:text-primary" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;