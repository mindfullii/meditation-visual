import Replicate from "replicate";
import { NextResponse } from 'next/server';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    return NextResponse.json(
      { error: "Replicate API token not configured" },
      { status: 500 }
    );
  }

  try {
    const { prompt, negative_prompt } = await req.json();
    
    console.log('Generating with prompt:', prompt);

    const prediction = await replicate.predictions.create({
      version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      input: {
        prompt,
        negative_prompt,
        num_inference_steps: 50,
        guidance_scale: 7.5,
        width: 1024,
        height: 1024,
        refine: "expert_ensemble_refiner",
        scheduler: "K_EULER",
      }
    });

    // 等待生成完成
    const result = await replicate.wait(prediction);

    if (!result || !result.output || !result.output[0]) {
      throw new Error("No output received from Replicate");
    }

    const imageUrl = result.output[0];
    console.log('Generated image URL:', imageUrl);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate image' },
      { status: 500 }
    );
  }
} 