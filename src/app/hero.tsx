import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {


    return (
        <section className="px-[5%] py-16 border-b">
            <div className="container">
                <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl font-primary">Discover Blink Rates in Minutes</h1>
                        <p className="md:text-md font-secondary">Immerse yourself in a brief, engaging activity, and let our advanced blink detection technology evaluate your eye health. Within minutes of completing the activity, you'll recieve an email with a comprehensive analysis of your blink rate, offering insights into your ocular well-being.</p>
                        <div className="mt-6 flex gap-x-4 md:mt-8">
                            <Link href="/test">
                                <button className='btn font-primary'>
                                    Get Started
                                </button>
                            </Link>
                            <Link href="/mission">
                                <button className='btn btn-secondary font-primary'>Learn More</button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Image
                            src="/images/doctor.png"
                            alt="doctor"
                            width={700}
                            height={475}
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}