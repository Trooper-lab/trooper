"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const SuperfluidCaseStudy = dynamic(() => import("./superfluid"), { ssr: false });

export const ProjectCaseStudies: Record<string, () => ReactNode> = {
    "superfluid": () => <SuperfluidCaseStudy />,
};
