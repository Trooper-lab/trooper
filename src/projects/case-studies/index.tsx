"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const SuperfluidCaseStudy = dynamic(() => import("./superfluid"), { ssr: false });
const LazyCaseStudy = dynamic(() => import("./lazy"), { ssr: false });

export const ProjectCaseStudies: Record<string, () => ReactNode> = {
    "superfluid": () => <SuperfluidCaseStudy />,
    "laazy": () => <LazyCaseStudy />,
};
