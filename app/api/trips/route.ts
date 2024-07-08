// app/api/trips/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient"; // Adjust this import path as needed
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const userId = request.headers.get("user-id");
  console.log("USERRR", userId);

  if (!userId) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('username', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get("user-id");
  console.log("USERRR", request);
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const body = await request.json();
    console.log("BODY", body);
    
    // Extract the data we want to insert
    const {userId, place, startDate, endDate, adventureType, numParticipants} = body;

    // Insert the data into the 'trips' table
    const { data, error } = await supabase
      .from('trips')
      .insert([
        { 
          'username': userId,
          'destination': place,
          'from_date': startDate,
          'to_date': endDate,
          'adventure_type': adventureType,
          'number_of_travellers': numParticipants // Assuming 'days' is stored as JSON in your table
        }
      ])
      .select();

      

    if (error) throw error;

    return NextResponse.json({ message: 'Trip data inserted successfully', data }, { status: 201 });
  } catch (error) {
    console.error('Error inserting trip data:', error);
    return NextResponse.json({ error: 'Failed to insert trip data' }, { status: 500 });
  }
}