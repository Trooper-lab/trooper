export const befacoContent = {
    hero: {
        logoText: "BEFACO",
        subText: "Industrial-grade modular synthesizers from Barcelona."
    },
    hook: {
        note: "Series 2025 — Technical Specification",
        title: "Built by musicians, for musicians. With a heavy focus on DIY."
    },
    products: [
        {
            id: "lich",
            name: "Lich",
            price: "$349.00",
            // WHY: Lich module product page image from Befaco's official CDN
            image: "https://befaco.org/wp-content/uploads/2020/05/lich-front.jpg",
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
            // WHY: VCMC module official image from Befaco's product page
            image: "https://befaco.org/wp-content/uploads/2019/10/vcmc-front.jpg",
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
            // WHY: Burst module official image from Befaco's product page
            image: "https://befaco.org/wp-content/uploads/2019/10/burst-front.jpg",
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
        note: "Design. Patch. Repeat."
    }
};
