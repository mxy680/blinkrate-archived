import { NextResponse as Response } from "next/server";

export async function POST(request: Request) {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
        return Response.json({
            error: "No image found in the request",
        }, { status: 400 });
    }

    // Ensure you have the correct server path
    const serverPath = process.env.NEXT_PUBLIC_SERVER_PATH;
    const res = await fetch(`${serverPath}/locate`, {
        method: "POST",
        body: formData,  // Directly pass formData
    });

    if (!res.ok) {
        const errorData = await res.json();
        console.error(errorData);
        return Response.json({
            error: "Failed to process the image",
            details: errorData,
        }, { status: res.status });
    }

    const data = await res.json();

    return Response.json({
        data,
    });
}
