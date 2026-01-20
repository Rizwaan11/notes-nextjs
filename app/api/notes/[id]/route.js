import dbConnect from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";


export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        await dbConnect();
        const note = await Note.findByIdAndUpdate(
            id,
            {...body},
            { new: true , runValidators: true}
        )
        if (!note) {
            return NextResponse.json(
                { success: false, error: "Note not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: true, data: note },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
            
}


export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await dbConnect();
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return NextResponse.json(
                { success: false, error: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: {} },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }

}