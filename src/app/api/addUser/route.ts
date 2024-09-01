import supabaseClient from "@/config/supabase";

export async function POST(request: Request) {
    const { firstName, lastName, email, doctorEmail, info } = await request.json();

    if (!supabaseClient) {
        throw new Error("supabaseClient is undefined");
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
        return new Response(error.message, { status: 500 });
    }

    return new Response(JSON.stringify({ id }), {
        headers: { "Content-Type": "application/json" },
    });
    
}