import React from 'react';
import { Github, Linkedin, Mail, Instagram, MessageCircle, Twitter } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/mojjam07' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mojeed-jamiu-b279171a2' },
  { icon: Mail, label: 'Email', href: 'mailto:mojjam07@gmail.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/el_munjid07' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/el_munjid' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/2347063306325' },
];

const Hero = ({ scrollTo }) => (
  <section id="home" className="flex min-h-[100svh] items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
    <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
      <div className="order-2 lg:order-1">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1.5 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          Available for new work
        </p>

        <h1 className="text-balance text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
          Jamiu Mojeed Adekunle
        </h1>
        <p className="mt-3 text-lg font-medium text-blue-700 sm:text-xl dark:text-blue-300">
          Full-stack web and mobile developer
        </p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-400">
          I build modern web and mobile products with clean interfaces and solid architecture, and I teach
          aspiring developers how to do the same.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => scrollTo('projects')}
            className="touch-target rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 sm:text-base"
          >
            See my work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="touch-target rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold transition-colors hover:bg-gray-100 sm:text-base dark:border-white/15 dark:hover:bg-white/5"
          >
            Contact me
          </button>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {socials.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="touch-target inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-white/10 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:text-blue-300"
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-1 mx-auto w-56 sm:w-72 lg:order-2 lg:w-full lg:max-w-sm">
        <div className="relative">
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-blue-600/40 dark:border-blue-400/40" aria-hidden="true" />
          <a
            href="/admin/login"
            tabIndex={-1}
            className="relative block aspect-[4/5] overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-gray-900"
          >
            <img
              src={profileImg}
              alt="Jamiu Mojeed Adekunle, full-stack developer"
              className="h-full w-full object-cover object-center"
              fetchPriority="high"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
