import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "What is Meditation Visual?",
    answer: "A mindful companion that creates personalized visual guides for your meditation practice using AI technology. Each visual is thoughtfully generated to serve as an anchor for your meditation, helping you achieve inner peace and mindfulness."
  },
  {
    question: "How does it work?",
    answer: "Our process is simple and intuitive:\n1. Share how you're feeling from our carefully curated emotional states\n2. Choose a visual theme that resonates with you\n3. Receive a unique, AI-generated visual specifically designed to support your meditation journey"
  },
  {
    question: "What makes this tool special?",
    answer: "Unlike general AI image generators, Meditation Visual is specifically designed for meditation practice. Our system understands emotional states and meditation principles, creating visuals that serve as effective meditation anchors while addressing your current emotional needs."
  },
  {
    question: "How can I use these visuals in my meditation practice?",
    answer: "Our visuals are designed to be versatile meditation tools:\n- As a focus point during seated meditation\n- For emotional regulation and stress relief\n- As part of your daily mindfulness routine\nEach visual comes with gentle guidance on how to use it effectively."
  },
  {
    question: "Can I download the generated images?",
    answer: "Yes! All generated visuals can be downloaded and saved for your personal meditation practice. They work well both on screens and when printed."
  },
  {
    question: "Can I use the images for commercial purposes?",
    answer: "Yes! All images you generate belong to you and can be used for any purpose - personal meditation, teaching, or commercial projects. You have full rights to your creations."
  },
  {
    question: "What technology powers Meditation Visual?",
    answer: "We combine advanced AI technology with deep understanding of meditation and mindfulness principles. Our system is specifically trained to create visuals that support meditative states and emotional wellbeing."
  },
  {
    question: "How many visuals can I create?",
    answer: "The number of visuals you can create depends on your membership level. Please see our Price and Plans page for detailed information about each tier's benefits."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you have complete flexibility with your subscription. You can cancel at any time through your account settings, with no questions asked."
  },
  {
    question: "Do you offer refunds?",
    answer: "While we don't offer refunds for subscription payments, we encourage everyone to start with our Free Soul membership to experience our service before upgrading to a paid plan."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take your privacy seriously. We follow strict data protection protocols and never share your personal information with third parties."
  }
];

export function FAQ() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
} 