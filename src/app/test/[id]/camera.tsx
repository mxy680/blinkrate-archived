'use client';

import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const CameraLoading = () => {
    return (
        <div className="rounded-lg flex justify-center items-center bg-gray-800">
            <img src="https://relume-assets.s3.amazonaws.com/placeholder-image.svg" alt="loading" />
        </div>
    );
};

interface CameraProps {
    time: number;
    onCaptureComplete: (detected: boolean) => void;
}

const Camera = ({ time, onCaptureComplete }: CameraProps) => {
    const totalTime = time;
    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [isWebcamLoaded, setIsWebcamLoaded] = useState(false);
    const [lastFrame, setLastFrame] = useState<string | null>(null);
    const [isEyesDetected, setIsEyesDetected] = useState<boolean>(false);
    const [annotatedImageSrc, setAnnotatedImageSrc] = useState<string | null>(null);

    const handleDataAvailable = useCallback(({ data }: { data: Blob }) => {
        if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
        }
    }, []);

    const handleFinish = useCallback(async () => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, { type: "video/webm" });

            // Create a file from the blob
            const file = new File([blob], "react-webcam-stream-capture.webm", {
                type: "video/webm",
            });

            setRecordedChunks([]);

            // Capture the last frame
            if (webcamRef.current) {
                const capturedFrame = webcamRef.current.getScreenshot();
                if (capturedFrame) {

                    // Load the capturedFrame as an image file
                    const imageBlob = await fetch(capturedFrame).then((res) => res.blob());

                    // Plot Landmarks using API
                    const formData = new FormData();
                    formData.append("image", imageBlob);

                    const response = await fetch("/api/detect", {
                        method: "POST",
                        body: formData,
                    });

                    const responseData = await response.json();
                    const data = responseData.data;
                    const detected = !data?.error || false;

                    setLastFrame(capturedFrame);
                    setCapturing(false);
                    onCaptureComplete(detected);
                    setIsEyesDetected(detected);

                    if (detected && data?.image) {
                        // Convert base64 to Blob
                        const byteCharacters = atob(data.image);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const annotatedImageBlob = new Blob([byteArray], { type: "image/jpeg" });
                        const annotatedImageSrc = URL.createObjectURL(annotatedImageBlob);
                        setAnnotatedImageSrc(annotatedImageSrc);
                    }
                }
            }
        }
    }, [recordedChunks, onCaptureComplete]);

    const handleStopCaptureClick = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setCapturing(false);
    }, [mediaRecorderRef]);

    useEffect(() => {
        if (timeLeft > 0 && capturing) {
            const intervalId = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        } else if (timeLeft === 0) {
            handleStopCaptureClick();
            handleFinish();
        }
    }, [timeLeft, capturing, handleStopCaptureClick, handleFinish]);

    const handleStartCapture = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder((webcamRef.current as Webcam | null)?.stream!, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [handleDataAvailable]);

    const handleWebcamLoad = useCallback(() => {
        setIsWebcamLoaded(true);
        handleStartCapture();
    }, [handleStartCapture]);

    return (
        <div className="relative w-[70vh] h-[70vh]">
            {!isWebcamLoaded && <CameraLoading />}
            {isWebcamLoaded && annotatedImageSrc ? (
                <img
                    src={annotatedImageSrc}
                    alt="Annotated Frame"
                    className='absolute top-0 left-0 w-full h-full object-cover'
                />
            ) : (
                <>
                    <Webcam
                        audio={false}
                        className={`absolute top-0 left-0 w-full h-full object-cover ${lastFrame && !isEyesDetected ? "filter blur-md" : ""}`}
                        ref={webcamRef}
                        hidden={!isWebcamLoaded}
                        screenshotFormat="image/jpeg"
                        onUserMedia={handleWebcamLoad}
                    />
                    {isWebcamLoaded && (
                        <div className="absolute top-2 right-2 bg-dark text-white rounded px-2 py-1 w-12 text-center">
                            {timeLeft}s
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Camera;
