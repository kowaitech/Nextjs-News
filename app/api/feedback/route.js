import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import Feedback from '@/models/feedbackModel';

// POST /api/feedback - Create new feedback
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const feedback = new Feedback({
      name,
      email,
      message,
    });

    await feedback.save();

    return NextResponse.json(
      { message: 'Feedback created successfully', feedback },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json(
      { error: 'Failed to create feedback', details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/feedback - Get all feedback
export async function GET() {
  try {
    await connectDB();

    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { message: 'Feedbacks retrieved successfully', feedbacks },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks', details: error.message },
      { status: 500 }
    );
  }
}

