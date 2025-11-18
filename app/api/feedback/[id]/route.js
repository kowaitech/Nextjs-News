import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Feedback from '@/models/feedbackModel';

// PUT /api/feedback/[id] - Update feedback
export async function PUT(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { name, email, message },
      { new: true, runValidators: true }
    );

    if (!feedback) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Feedback updated successfully', feedback },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating feedback:', error);
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid feedback ID' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update feedback', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/feedback/[id] - Delete feedback
export async function DELETE(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Feedback deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting feedback:', error);
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid feedback ID' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete feedback', details: error.message },
      { status: 500 }
    );
  }
}

