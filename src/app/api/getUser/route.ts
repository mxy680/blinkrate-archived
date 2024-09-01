import supabaseClient from "@/config/supabase";

import { NextApiRequest, NextApiResponse } from "next";

export async function GET(
    req: NextApiRequest,
    res: NextApiResponse) {

    if (!supabaseClient) {
        throw new Error("supabaseClient is undefined");
    }

    const { data, error } = await supabaseClient.from("users").select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
}