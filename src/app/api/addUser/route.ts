import supabaseClient from "@/config/supabase";
import { NextResponse as Response } from "next/server";

export async function POST(request: Request) {
    const { firstName, lastName, email, doctorEmail, info } = await request.json();

    if (!supabaseClient) {
        throw Response.json({
            error: "Failed to connect to the database",
        });
    }
     
    const payload = {
        name: firstName + " " + lastName,
        email,
        doctor_email: doctorEmail,
        info
    };

    const { data, error } = await supabaseClient
        .from("users")
        .insert(payload)
        .select();

    const id = data?.[0]?.id;

    if (error) {
        return Response.json({
            error: error.message,
        });
    }

    return Response.json({
        id,
        message: "User added successfully",
    });
    
}