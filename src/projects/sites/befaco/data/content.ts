export const befacoContent = {
    hero: {
        logoText: "BEFACO",
        subText: "Industrial-grade modular synthesizers from Barcelona."
    },
    hook: {
        note: "Series 2025 — Technical Specification",
        title: "Modular synthesizers designed and assembled in Barcelona — available as finished instruments, DIY kits, and hands-on workshops."
    },
    products: [
        {
            id: "lich",
            name: "Lich",
            price: "$349.00",
            image: "https://iili.io/BRFy6Pe.png",
            tagline: "The OWL in Eurorack format.",
            details: {
                specs: "Programmable via C++, Faust, Pure Data, or Max/Gen.",
                connectivity: "Stereo I/O, MIDI, CV/Gate Control.",
                useCase: "Ideal for algorithmic composition and live performance."
            }
        },
        {
            id: "vcmc",
            name: "VCMC",
            price: "$300.00",
            image: "https://iili.io/BRKozjn.png",
            tagline: "Voltage Controlled MIDI Controller.",
            details: {
                specs: "8 CV inputs, 8 Gate inputs, MIDI Out.",
                connectivity: "TRS MIDI, DIN MIDI, USB MIDI.",
                useCase: "Bridge your modular with the digital world."
            }
        },
        {
            id: "burst",
            name: "Burst",
            price: "$180.00",
            image: "https://iili.io/BRKoBYN.png",
            tagline: "Rhythmic generator for percussive patches.",
            details: {
                specs: "Internal or External Clock, pingable, probability control.",
                connectivity: "Gate In/Out, CV Tempo, CV Quantity.",
                useCase: "Add life and unpredictability to your drums."
            }
        }
    ],
    tech: {
        title: "Modular over Monolithic.",
        specs: [
            { label: "Founded", value: "2010" },
            { label: "HQ", value: "Barcelona, Spain" },
            { label: "Community", value: "Open Source Hardware" }
        ]
    },
    footer: {
        note: "Solder. Patch. Repeat."
    }
};
