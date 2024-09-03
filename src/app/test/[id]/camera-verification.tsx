'use client';

import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineChair } from "react-icons/md";
import { IoGlassesOutline } from "react-icons/io5";
import { RxChevronRight } from "react-icons/rx";

import { useState } from "react";

import Camera from "./camera";

const CameraVerification = ({ onContinue }: { onContinue: () => void }) => {

    const [isEyesDetected, setIsEyesDetected] = useState<boolean>(false);
    const [showCamera, setShowCamera] = useState<boolean>(true); // State to control camera rendering
    const [frameCaptured, setFrameCaptured] = useState<boolean>(false);

    const handleCaptureComplete = (detected: boolean) => {
        setIsEyesDetected(detected);
        setFrameCaptured(true);
    };

    const handleRetry = () => {
        setShowCamera(false); // Unmount the Camera component
        setFrameCaptured(false);
        setTimeout(() => {
            setShowCamera(true); // Remount the Camera component after a short delay
            setIsEyesDetected(false); // Reset the detection state
        }, 100); // Small delay to ensure the component unmounts before remounting
    }

    return (
        <section className="px-[5%] py-14 md:py-18 lg:py-22">
            <div className="container">
                <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
                    <div>
                        {!frameCaptured ? (
                            <>
                                <h1 className="mb-5 text-5xl font-bold md:mb6 md:text-7xl lg:text-8xl font-primary">Let&apos;s verify that we can see your eyes</h1>
                                <p className="mb-5 text-base md:mb-6 md:text-md font-secondary">Follow these steps to ensure a smooth and accurate process:</p>
                                <ul className="grid grid-cols-1 gap-4 py-2 font-secondary">
                                    <li className="flex items-center gap-2">
                                        <FaRegLightbulb className="size-6" />
                                        <span>Position yourself in a well-lit area.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <MdOutlineChair className="size-6" />
                                        <span>Sit comfortably and position your face in the center of the webcam.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <IoGlassesOutline className="size-6" />
                                        <span>Ensure there are no obstructions such as glasses blocking your eyes.</span>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <>
                                {isEyesDetected ? (
                                    <>
                                        <h1 className="mb-5 text-5xl font-bold md:mb6 md:text-7xl lg:text-8xl font-primary">We detected your eyes!</h1>
                                        <p className="mb-5 text-base md:mb-6 md:text-md font-secondary">Please continue or retry in a more comfortable position.</p>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="mb-5 text-5xl font-bold md:mb6 md:text-7xl lg:text-8xl font-primary">We were not able to detect your eyes.</h1>
                                        <p className="mb-5 text-base md:mb-6 md:text-md font-secondary">Follow these steps to ensure a smooth and accurate process:</p>
                                        <ul className="grid grid-cols-1 gap-4 py-2 font-secondary">
                                            <li className="flex items-center gap-2">
                                                <FaRegLightbulb className="size-6" />
                                                <span>Position yourself in a well-lit area.</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <MdOutlineChair className="size-6" />
                                                <span>Sit comfortably and position your face in the center of the webcam.</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <IoGlassesOutline className="size-6" />
                                                <span>Ensure there are no obstructions such as glasses blocking your eyes.</span>
                                            </li>
                                        </ul>
                                    </>
                                )}


                                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                                    <button className={`btn ${isEyesDetected && 'btn-secondary'} font-primary`} onClick={handleRetry}>
                                        Retry
                                    </button>
                                    <button className='btn font-primary flex items-center gap-1' onClick={onContinue} disabled={!isEyesDetected}>
                                        Continue
                                        <RxChevronRight className='size-6 arrow' />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        {/* Conditionally render the Camera component */}
                        {showCamera && (
                            <Camera time={1} onCaptureComplete={handleCaptureComplete} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CameraVerification;
