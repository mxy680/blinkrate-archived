import { RxChevronRight } from 'react-icons/rx';
import Link from 'next/link';

const logos = [
    { src: "/icons/next.svg", alt: "Next js", text: "Next.js" },
    { src: "/icons/python.svg", alt: "Python", text: "Python" },
    { src: "/icons/tensorflow.svg", alt: "Tensorflow", text: "Tensorflow" },
    { src: "/icons/aws.svg", alt: "aws", text: "AWS Inferentia" },
    { src: "/icons/supabase.svg", alt: "supabase", text: "Supabase" },
];

export default function TechStack() {

    return (
        <section className="px-[5%] py-16 md:py-20 lg:py-24 border-b">
            <div className="container">
                <div className="container mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
                    <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl font-primary">Our Technology Stack</h1>
                    <p className="md:text-md font-secondary">Our technology stack is built on a foundation of cutting-edge tools and frameworks, enabling us to deliver a seamless and intuitive user experience.</p>
                    <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                        <Link href="/test">
                            <button className='btn font-primary'>
                                Learn More
                            </button>
                        </Link>
                        <Link href="/mission">
                            <button className='btn btn-secondary font-primary flex items-center gap-1'>
                                Contact Us
                                <RxChevronRight className='size-6 arrow' />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 py-2">
                    {logos.map((logo, index) => (
                        <div className='flex items-center gap-3 tech-modal' key={index}>
                            <img key={index} src={logo.src} alt={logo.alt} className="max-h-16" />
                            <p className='font-secondary text-3xl'>{logo.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}