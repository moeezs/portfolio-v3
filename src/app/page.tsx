"use client";

import { useState } from "react";
import { PROJECTS, CURRENT_ROLES, PREVIOUS_ROLES } from "./data2";

type ProjectData = {
  image: string;
  name: string;
  description: string;
  href: string;
  year: string;
};

type RoleData = {
  image: string;
  role: string;
  place: string;
  href?: string;
  period: string;
};

const VISIBLE_DEFAULT = 3;

export default function Home() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll
    ? [...PROJECTS].reverse()
    : [...PROJECTS].reverse().slice(0, VISIBLE_DEFAULT);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center py-14 md:text-[110%]">
      <main className="w-full max-w-lg px-8 mx-auto md:max-w-xl md:px-10">
        {/* intro */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-xl font-medium tracking-tight text-foreground">
            moeez
          </h1>
          <p className="text-sm text-muted mt-1">software engineer</p>
        </div>

        {/* currently */}
        <Section title="currently">
          {CURRENT_ROLES.map((r, i, arr) => (
            <RoleItem key={r.place} {...r} isLast={i === arr.length - 1} />
          ))}
        </Section>

        {/* previously */}
        <Section title="previously">
          {PREVIOUS_ROLES.map((r, i, arr) => (
            <RoleItem key={r.place} {...r} isLast={i === arr.length - 1} />
          ))}
        </Section>

        {/* projects */}
        <Section title="projects">
          {visibleProjects.map((p, i, arr) => (
            <ProjectItem key={p.name} {...p} isLast={i === arr.length - 1} />
          ))}
          {PROJECTS.length > VISIBLE_DEFAULT && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="mt-3 text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              {showAll
                ? "show less"
                : `+ ${PROJECTS.length - VISIBLE_DEFAULT} more`}
            </button>
          )}
        </Section>

        {/* footer */}
        <div className="pt-4 border-t border-subtle/40">
          <div className="flex items-center gap-7 text-sm text-muted">
            <a
              href="https://github.com/moeezs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              github
            </a>
            <a
              href="https://linkedin.com/in/abdulmoeezshaikh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              linkedin
            </a>
            <a
              href="https://instagram.com/abdul_moeez_shaikh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              instagram
            </a>
            {/* <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              x
            </a> */}
            <a
              href="mailto:shaika97@mcmaster.ca"
              className="hover:text-foreground transition-colors"
            >
              email
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

/* section wrapper  */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 md:mb-8">
      <p className="text-xs uppercase tracking-widest text-muted mb-3 md:mb-4">
        {title}
      </p>
      {children}
    </div>
  );
}

/* role row */
function RoleItem({ image, role, place, href, period, isLast }: RoleData & { isLast?: boolean }) {
  const content = (
    <div className={`flex items-center gap-3 text-sm${isLast ? "" : " mb-2"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={place}
        className="w-5 h-5 rounded-sm object-cover shrink-0"
      />
      <span className="text-muted">{role}</span>
      <span className="text-foreground">{place}</span>
      <span className="ml-auto text-xs text-subtle shrink-0">{period}</span>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}

/* project row */
function ProjectItem({ image, name, description, href, year, isLast }: ProjectData & { isLast?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-3${isLast ? "" : " mb-2"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={name}
        className="w-5 h-5 rounded-sm object-cover shrink-0"
      />
      <div className="flex items-baseline gap-2.5 min-w-0 flex-1">
        <span className="text-sm text-foreground group-hover:text-accent transition-colors shrink-0">
          {name}
        </span>
        <span className="text-sm text-muted truncate hidden sm:inline">{description}</span>
      </div>
      <span className="text-xs text-subtle shrink-0 ml-2">{year}</span>
    </a>
  );
}
