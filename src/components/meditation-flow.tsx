'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Maximize2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { FAQ } from "./faq";
import { VisuallyHidden } from '@/components/ui/visually-hidden';

interface EmotionData {
  description: string;
  themes: string[];
  icon: string;
}

interface Emotions {
  [key: string]: EmotionData;
}

function MeditationFlow() {
  const [currentStep, setCurrentStep] = useState<'emotion' | 'theme' | 'generate'>('emotion');
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emotions: Emotions = {
    'Anxious': {
      description: 'Seeking calmness and comfort',
      themes: ['Water Flow', 'Cloud Paths', 'Gentle Waves'],
      icon: '🌊'
    },
    'Overwhelmed': {
      description: 'Finding space and release',
      themes: ['Open Sky', 'Mountain View', 'Forest Clearing'],
      icon: '🗻'
    },
    'Restless': {
      description: 'Finding rhythm and serenity',
      themes: ['Falling Leaves', 'Moonlit Lake', 'Swaying Grass'],
      icon: '🍃'
    },
    'Seeking Peace': {
      description: 'Finding inner tranquility',
      themes: ['Garden Path', 'Lotus Pond', 'Starry Night'],
      icon: '🌸'
    },
    'Need Grounding': {
      description: 'Seeking stability and strength',
      themes: ['Ancient Tree', 'Stone Garden', 'Mountain Base'],
      icon: '🌳'
    },
    'Want Inspiration': {
      description: 'Sparking creativity and vitality',
      themes: ['Rising Sun', 'Blooming Garden', 'Light Streams'],
      icon: '✨'
    }
  };

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    setCurrentStep('theme');
  };

  const handleThemeSelect = async (theme: string) => {
    setSelectedTheme(theme);
    setCurrentStep('generate');
    await generateImage(selectedEmotion!, theme);
  };

  const generateImage = async (emotion: string, theme: string) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const prompt = `A peaceful meditation visual art: ${theme.toLowerCase()} in a gentle, abstract style. Soft colors, calming atmosphere, suitable for ${emotion.toLowerCase()} meditation. Digital art, peaceful composition, mindfulness focus, non-figurative, safe for work`;
      
      const negative_prompt = "nsfw, inappropriate content, violence, dark themes, disturbing elements";

      console.log('Sending request with:', { prompt, negative_prompt });

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          negative_prompt 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      if (!data.imageUrl) {
        throw new Error('No image URL received');
      }

      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep('emotion');
    setSelectedEmotion(null);
    setSelectedTheme(null);
    setImageUrl(null);
    setError(null);
  };

  const handleDownload = async () => {
    if (imageUrl) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `meditation-${selectedEmotion}-${selectedTheme}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* 第一行：标题和说明 */}
      <Card className="border-none shadow-none">
        <CardContent className="text-center space-y-4">
          <Waves className="w-12 h-12 mx-auto text-[#88B3BA]" />
          <h1 className="text-3xl font-bold">Meditation Visual</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A mindful companion that creates personalized visual guides for your meditation practice. 
            Simply share how you feel, and we&apos;ll generate the perfect visual anchor to support 
            your journey to inner peace.
          </p>
        </CardContent>
      </Card>

      {/* 第二行：两列布局 */}
      <div className="flex gap-6">
        {/* 左列：应用主体 */}
        <div className="flex-grow w-2/3">
          {/* Emotion Selection */}
          {currentStep === 'emotion' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">How are you feeling today?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(emotions).map(([emotion, data]) => (
                    <button
                      key={emotion}
                      onClick={() => handleEmotionSelect(emotion)}
                      className="p-6 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition-all text-center space-y-2"
                    >
                      <div className="text-3xl">{data.icon}</div>
                      <div className="font-medium">{emotion}</div>
                      <div className="text-sm text-gray-600">{data.description}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Theme Selection */}
          {currentStep === 'theme' && selectedEmotion && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  Choose your visual anchor for {selectedEmotion}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {emotions[selectedEmotion].themes.map((theme) => (
                    <button
                      key={theme}
                      onClick={() => handleThemeSelect(theme)}
                      className="p-6 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition-all text-center space-y-2"
                    >
                      <div className="font-medium">{theme}</div>
                      <div className="text-sm text-gray-600">
                        Let this guide your meditation
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentStep('emotion')}
                  className="mt-6 text-blue-500 hover:underline"
                >
                  ← Choose another feeling
                </button>
              </CardContent>
            </Card>
          )}

          {/* Generation Step */}
          {currentStep === 'generate' && selectedTheme && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  Creating Your Meditation Visual
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                {isGenerating ? (
                  <div className="p-12 bg-gray-50 rounded-lg animate-pulse flex items-center justify-center">
                    <div className="space-y-4 text-center">
                      <Waves className="w-12 h-12 mx-auto text-blue-500 animate-bounce" />
                      <div>Creating your meditation visual...</div>
                    </div>
                  </div>
                ) : error ? (
                  <div className="p-6 bg-red-50 text-red-600 rounded-lg">
                    <p>{error}</p>
                    <button
                      onClick={() => generateImage(selectedEmotion!, selectedTheme!)}
                      className="mt-4 text-blue-500 hover:underline"
                    >
                      Try Again
                    </button>
                  </div>
                ) : imageUrl ? (
                  <div className="space-y-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative group">
                          <img
                            src={imageUrl}
                            alt="Generated meditation visual"
                            className="w-full h-auto rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl animate-fade-in cursor-zoom-in"
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                            <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
                        <DialogTitle className="sr-only">
                          Meditation Visual - {selectedEmotion} {selectedTheme}
                        </DialogTitle>
                        <div className="relative w-full h-[90vh] flex flex-col items-center justify-center">
                          <DialogClose className="absolute top-4 right-4 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-all z-10">
                            <X className="w-5 h-5 text-gray-600" />
                            <span className="sr-only">Close</span>
                          </DialogClose>
                          
                          <div className="w-full h-full flex items-center justify-center p-8">
                            <img 
                              src={imageUrl} 
                              alt="Generated meditation visual" 
                              className="max-w-[95%] max-h-[85vh] w-auto h-auto object-contain"
                            />
                          </div>
                          
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-600 bg-white/90 px-4 py-2 rounded-full shadow-lg">
                            {selectedEmotion} • {selectedTheme}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <div className="text-gray-600">
                      {selectedEmotion} • {selectedTheme}
                    </div>
                    <button
                      onClick={handleDownload}
                      className="mt-4 px-4 py-2 bg-[#88B3BA] text-white rounded-lg hover:bg-[#7AA1A8] transition-colors"
                    >
                      Download Image
                    </button>
                  </div>
                ) : null}
                <button
                  onClick={handleStartOver}
                  className="text-[#88B3BA] hover:underline"
                >
                  Start Over
                </button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 右列：FAQ */}
        <div className="w-1/3">
          <FAQ />
        </div>
      </div>
    </div>
  );
}

export default MeditationFlow; 