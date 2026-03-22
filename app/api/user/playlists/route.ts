import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const getUserFromToken = (request: Request) => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as any;
  } catch {
    return null;
  }
};

// GET — fetch playlists
export async function GET(request: Request) {
  try {
    const decoded = getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ playlists: user.playlists }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// POST — create playlist
export async function POST(request: Request) {
  try {
    const decoded = getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, songs } = await request.json();

    await connectDB();
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songs,
    };

    user.playlists.push(newPlaylist);
    await user.save();

    return NextResponse.json(
      { playlists: user.playlists },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// DELETE — delete playlist
export async function DELETE(request: Request) {
  try {
    const decoded = getUserFromToken(request);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { playlistId } = await request.json();

    await connectDB();
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.playlists = user.playlists.filter(
      (p: any) => p.id !== playlistId
    );
    await user.save();

    return NextResponse.json(
      { playlists: user.playlists },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}