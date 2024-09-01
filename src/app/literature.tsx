import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import Link from "next/link";

type ImageProps = {
    src: string;
    alt?: string;
};

type CardBaseProps = {
    tagline: string;
    image: ImageProps;
    heading: string;
    description: string;
};

type CardsSmallProps = CardBaseProps & {
    button: ButtonProps;
};

type CardsBigProps = CardBaseProps & {
    buttons: ButtonProps[];
};

type Props = {
    tagline: string;
    heading: string;
    description: string;
    cardsSmall: CardsSmallProps[];
    cardsBig: CardsBigProps[];
};

type LiteratureProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const Literature = (props: LiteratureProps) => {
    const { tagline, heading, description, cardsSmall, cardsBig } = {
        ...LiteratureDefaults,
        ...props,
    } as Props;
    return (
        <section className="px-[5%] py-16 md:py-24 lg:py-28 border-b">
            <div className="container">
                <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
                    <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl font-primary">Explore the Literature</h2>
                    <p className="md:text-md font-secondary">Investigating the Role of Optics and Deep Learning in Eye Health, with a Focus on Blink Rates, Visual Patterns, and Their Impact on Well-being and Vision Science.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:gap-8 ">
                    <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
                        {cardsBig.map((card, index) => (
                            <div
                                key={index}
                                className="order-first flex flex-col items-stretch border border-dark lg:order-none lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 literature-modal animate-slideInFromLeft"
                            >
                                <div>
                                    <img src={card.image.src} alt={card.image.alt} className="w-full object-cover" />
                                </div>
                                <div className="block flex-1 flex-col items-stretch justify-center p-6 md:flex md:p-8 lg:p-12">
                                    <div>
                                        <p className="mb-2 font-semibold font-secondary">{card.tagline}</p>
                                        <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl font-primary">
                                            {card.heading}
                                        </h3>
                                        <p className='font-secondary'>{card.description}</p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-4 md:mt-8">
                                        <Link href="/test">
                                            <button className='btn font-primary'>
                                                Explore
                                            </button>
                                        </Link>
                                        <Link href="/mission">
                                            <button className='btn btn-secondary font-primary flex items-center gap-1'>
                                                Try it yourself
                                                <RxChevronRight className='size-6 arrow' />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {cardsSmall.map((card, index) => (
                            <div
                                key={index}
                                className="order-last flex flex-col items-stretch border border-dark md:grid md:grid-cols-2 lg:order-none literature-modal animate-slideInFromRight"
                            >
                                <div className="flex w-full items-center justify-center">
                                    <img src={card.image.src} alt={card.image.alt} className="w-full object-cover" />
                                </div>
                                <div className="block flex-col justify-center p-6 md:flex">
                                    <div>
                                        <h3 className="mb-2 text-xl font-bold md:text-2xl font-primary">{card.heading}</h3>
                                        <p className='font-secondary'>{card.description}</p>
                                    </div>
                                    <div className="mt-5 flex items-center gap-4 md:mt-6 font-secondary">
                                        <Link href="/test">
                                            <button className='btn font-primary'>
                                                Read More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


const LiteratureDefaults: LiteratureProps = {
    tagline: "Tagline",
    heading: "Heading goes here",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    cardsSmall: [
        {
            tagline: "Parkinsonism",
            image: {
                src: "/images/literature/parkinsons.png",
                alt: "Placeholder image 1",
            },
            heading: "Eye Blink Rate in Parkinsonism",
            description:
                "This groundbreaking study hypothesizes that blink patterns are an early indicator of parkinsonism.",
            button: {
                title: "Button",
                variant: "link",
                size: "link",
                iconRight: <RxChevronRight />,
            },
        },
        {
            tagline: "Tagline",
            image: {
                src: "/images/literature/doctors.png",
                alt: "Placeholder image 2",
            },
            heading: "Using Eye-blink Rates to Predict Motor Status",
            description:
                "Discover how researchers identified that simple observational diagnostics can aid in patient assessment and monitoring.",
            button: {
                title: "Button",
                variant: "link",
                size: "link",
                iconRight: <RxChevronRight />,
            },
        },
    ],
    cardsBig: [
        {
            tagline: "Visual Ergonomics",
            image: {
                src: "/images/literature/ergonomics.png",
                alt: "Placeholder image 3",
            },
            heading: "Ocular Symptoms During Reading Tasks",
            description:
                "The study confirmed that both the blink rate and ocular discomfort symptoms were strongly affected during performance of close visual tasks. Both reading conditions affected blinking. Such effects were reflected in the immediate development of ocular symptoms, which increased significantly during both types of reading.",
            buttons: [
                { title: "Button", variant: "secondary" },
                {
                    title: "Button",
                    variant: "link",
                    size: "link",
                    iconRight: <RxChevronRight />,
                },
            ],
        },
    ],
};

export default Literature;