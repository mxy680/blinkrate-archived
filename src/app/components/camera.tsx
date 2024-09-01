import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const CameraLoading = () => {
    return (
        <div className="rounded-lg flex justify-center items-center bg-gray-800">
            <img src="https://relume-assets.s3.amazonaws.com/placeholder-image.svg" alt="loading" />
        </div>
    );
};

const Camera = ({ time }: { time: number }) => {
    const totalTime = time;
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [isWebcamLoaded, setIsWebcamLoaded] = useState(false);

    const handleDataAvailable = useCallback(({ data }: { data: Blob }) => {
        if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
        }
    }, []);

    const handleDownload = useCallback(async () => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, { type: "video/webm" });

            // Create a file from the blob
            const file = new File([blob], "react-webcam-stream-capture.webm", {
                type: "video/webm",
            });

            // Upload the file to S3
            // Example: Upload function call here
            console.log(file);

            setRecordedChunks([]);
        }
    }, [recordedChunks]);

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
            handleDownload();
        }
    }, [timeLeft, capturing, handleStopCaptureClick, handleDownload]);

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
        <div className="relative">
            {!isWebcamLoaded && <CameraLoading />}
            <Webcam
                audio={false}
                className="webcam"
                ref={webcamRef}
                hidden={!isWebcamLoaded}
                screenshotFormat="image/jpeg"
                onUserMedia={handleWebcamLoad}
                style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                }}
            />
            {isWebcamLoaded && (
                <div className="absolute top-2 right-2 bg-dark text-white rounded px-2 py-1 w-12 text-center">
                    {timeLeft}s
                </div>
            )}
        </div>
    );
};

export default Camera;
