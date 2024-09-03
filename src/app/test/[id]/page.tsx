"use client";

import CameraVerification from "./camera-verification"

import { useRouter } from "next/navigation"

export default function Test({ params }: { params: { id: string } }) {

    const router = useRouter();

    const onContinue = () => {
        // Redirect to the next
        // step in the verification process
        router.push(`/test/${params.id}/game`);
    }


    return (
        <div>
            <CameraVerification onContinue={onContinue} />
        </div>
    )
}

