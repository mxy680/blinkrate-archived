import Link from 'next/link'
import Image from 'next/image'

import { RxChevronRight } from 'react-icons/rx'

export default function NotFound() {
    return (
        <section className="border-b">
            <div className="container">
                <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
                    <div className='mt-18'>
                        <Image
                            src="/images/not-found-doctor.png"
                            alt="doctor"
                            className="object-cover"
                            width={1000}
                            height={1000}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                    <div className='px-[5%] py-16'>
                        <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl font-primary">Oops, this page doesn't exist.</h1>
                        <div className="mt-6 flex gap-x-4 md:mt-8">
                            <Link href="/test">
                                <button className='btn font-primary'>
                                    Return Home
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

                </div>
            </div>
        </section>
    )
}