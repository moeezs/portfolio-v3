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
    <div className="min-h-screen bg-background text-foreground flex items-center py-10 md:py-12 md:text-[114%]">
      <main className="w-full max-w-lg px-8 mx-auto md:max-w-xl md:px-10">
        {/* intro */}
        <div className="mb-5 md:mb-7">
          <h1 className="text-xl font-medium text-foreground">
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
        <div className="pt-3 border-t border-subtle/30 flex items-center gap-5 text-xs text-muted">
          <a href="https://github.com/moeezs" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">github</a>
          <a href="https://linkedin.com/in/abdulmoeezshaikh" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">linkedin</a>
          <a href="https://instagram.com/abdul_moeez_shaikh" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">instagram</a>
          <a href="mailto:shaika97@mcmaster.ca" className="hover:text-foreground transition-colors">email</a>
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
    <div className="mb-3 md:mb-5">
      <p className="text-xs text-muted mb-2 md:mb-3 font-medium">
        {title}
      </p>
      <div className="pl-3 border-l border-subtle/40">
        {children}
      </div>
    </div>
  );
}

/* role row */
function RoleItem({ image, role, place, href, period, isLast }: RoleData & { isLast?: boolean }) {
  const content = (
    <div className={`flex items-center gap-5${isLast ? "" : " mb-2"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={place}
        className="w-6 h-6 rounded-sm object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-foreground">{place}</span>
          <span className="text-xs text-subtle shrink-0">{period}</span>
        </div>
        <span className="text-xs text-muted line-clamp-1" style={{lineHeight: "1.2"}}>{role}</span>
      </div>
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
      className={`group flex items-center gap-5${isLast ? "" : " mb-2"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={name}
        className="w-6 h-6 rounded-sm object-cover shrink-0"
      />
      <div className="flex-1 min-w-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-foreground group-hover:text-accent transition-colors">
            {name}
          </span>
          <span className="text-xs text-subtle shrink-0">{year}</span>
        </div>
        <span className="text-xs text-muted line-clamp-1" style={{lineHeight: "1.2"}}>{description}</span>
      </div>
    </a>
  );
}