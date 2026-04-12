"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * ContactPage Architecture
 *
 * WHY two-phase state machine (form → success):
 * - "idle": Form visible, send button hidden
 * - "ready": User has typed — send button rises into view
 * - "sending": API call in progress, button shows spinner state
 * - "success": Form fades out, cinematic thank-you fades in
 * - "error": Inline error, form stays interactive
 *
 * Animation approach: We always render both the form and the success view,
 * toggling visibility with GSAP. This avoids the React unmount/remount
 * race condition where refs are null during animation.
 */

export default function ContactPage() {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [emailTouched, setEmailTouched] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    /** Auto-resize textarea to fit content — no scroll, grows with input */
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [message]);

    /**
     * WHY regex instead of type="email" browser validation:
     * We use a custom form (no <form> submit), so browser validation
     * doesn't fire. This regex catches obvious bad formats while
     * staying permissive enough for valid edge cases.
     */
    const isValidEmail = (value: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const emailValid = isValidEmail(email);

    const handleSubmit = async () => {
        if (!message.trim() || !emailValid) return;
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, email }),
            });

            if (res.ok) {
                /**
                 * WHY sequential GSAP timeline instead of onComplete callback:
                 * Both refs exist in the DOM at all times (success is just hidden).
                 * The timeline guarantees the form fades out BEFORE the success fades in,
                 * creating a clean crossfade with no flash.
                 */
                const tl = gsap.timeline();

                tl.to(formRef.current, {
                    opacity: 0,
                    y: -30,
                    duration: 0.5,
                    ease: "power2.inOut",
                });

                tl.call(() => setStatus("success"));

                tl.fromTo(successRef.current,
                    { opacity: 0, y: 40, scale: 0.97 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "power3.out",
                    }
                );
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const hasContent = message.trim().length > 0 && emailValid;

    return (
        <main className="min-h-screen pt-24 md:pt-40 pb-12 md:pb-20 px-6 md:px-12 bg-[#F2F2F2] flex flex-col justify-center items-center relative overflow-hidden">

            {/* ── Success State (always in DOM, hidden until triggered) ──── */}
            <div
                ref={successRef}
                className="absolute inset-0 flex flex-col justify-center items-center px-6"
                style={{ opacity: 0, pointerEvents: status === "success" ? "auto" : "none" }}
            >
                {/* Decorative line */}
                <div className="w-12 h-[1px] bg-black/20 mb-10" />

                <h2 className="font-sans text-[28px] md:text-[72px] font-medium tracking-tighter leading-[1.05] text-center mb-6">
                    Thank you.
                </h2>

                <p className="font-sans text-[16px] md:text-[20px] opacity-50 text-center max-w-md leading-relaxed mb-2">
                    Your message just landed in our inbox.
                </p>
                <p className="font-sans text-[16px] md:text-[20px] opacity-50 text-center max-w-md leading-relaxed">
                    We&apos;ll get back to you within 24 hours.
                </p>

                {/* Decorative line */}
                <div className="w-12 h-[1px] bg-black/20 mt-10" />

                <a
                    href="/"
                    className="mt-16 font-sans text-[13px] uppercase tracking-[0.25em] opacity-40 hover:opacity-100 transition-opacity duration-300 underline underline-offset-8"
                >
                    Back to home
                </a>
            </div>

            {/* ── Active Form State ────────────────────────────────────── */}
            <div
                ref={formRef}
                className="w-full max-w-4xl flex flex-col items-start gap-12"
                style={{ pointerEvents: status === "success" ? "none" : "auto" }}
            >

                <h1 className="font-sans text-[32px] md:text-[48px] font-medium tracking-tight">
                    Write to Trooper.
                </h1>

                {/* Email Input Field */}
                <div className="w-full flex justify-between items-baseline border-b border-black/20 pb-4 focus-within:border-black transition-colors duration-300 relative">
                    <span className="font-sans text-[14px] uppercase tracking-widest opacity-40 whitespace-nowrap">
                        From:
                    </span>
                    <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        className="bg-transparent border-none outline-none font-sans text-[18px] md:text-[24px] text-right w-full ml-8 placeholder:opacity-20"
                    />
                    {/* Inline validation hint — only after user has interacted */}
                    {emailTouched && email.length > 0 && !emailValid && (
                        <span className="absolute -bottom-6 right-0 font-sans text-[11px] tracking-wide text-red-400/80">
                            Please enter a valid email
                        </span>
                    )}

                    {/* Gentle nudge — appears when message has content but email is empty */}
                    {message.trim().length > 0 && email.length === 0 && (
                        <span className="absolute -bottom-6 right-0 font-sans text-[11px] tracking-wide opacity-50 animate-pulse">
                            ↑ Add your email so we can reply
                        </span>
                    )}
                </div>

                {/* Message Textarea */}
                <textarea
                    ref={textareaRef}
                    placeholder="Tell us what you want to build..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border-none outline-none font-sans text-[18px] md:text-[40px] leading-[1.3] tracking-tight placeholder:opacity-20 resize-none overflow-hidden min-h-[100px] md:min-h-[200px]"
                />

                {/* Send action — slides up when user starts typing */}
                <div className="w-full flex items-center justify-between">
                    {/* Error feedback */}
                    <div className="flex-1">
                        {status === "error" && (
                            <span className="text-red-500/80 font-sans text-[14px] tracking-wide">
                                Something went wrong — please try again.
                            </span>
                        )}
                    </div>

                    {/* Send button — rises from below when message has content */}
                    <div
                        className="transition-all duration-500 ease-out"
                        style={{
                            opacity: hasContent ? 1 : 0,
                            transform: hasContent ? "translateY(0)" : "translateY(20px)",
                            pointerEvents: hasContent ? "auto" : "none",
                        }}
                    >
                        <button
                            onClick={handleSubmit}
                            disabled={status === "sending"}
                            className="group relative flex items-center gap-4 bg-black text-white px-8 py-4 uppercase tracking-[0.2em] text-[14px] font-medium overflow-hidden disabled:opacity-50 transition-opacity"
                        >
                            {/* Primary label */}
                            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[150%]">
                                {status === "sending" ? "Sending..." : "Send message"}
                            </span>
                            {/* Hover label (slides up) */}
                            <span className="absolute z-10 inset-0 flex items-center justify-center translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0 tracking-[0.2em] text-[14px] uppercase font-medium">
                                {status === "sending" ? "Sending..." : "Send message"}
                            </span>
                            {/* Hover fill */}
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
}
