'use client'

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Twitter, Facebook, Linkedin, Loader } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function ShareableTextCard({ yapper_text }: { yapper_text: string }) {
  const cardRef = React.useRef(null);
  const [isDownloading, setIsDownloading] = React.useState(false); // State to track if downloading is in progress

  const content = {
    title: "Time to slay besties! 💅",
    text: yapper_text,
  };

  const downloadContent = async () => {
    if (cardRef.current) {
      try {
        setIsDownloading(true); // Set downloading state to true
        const canvas = await html2canvas(cardRef.current);
        const imageUrl = canvas.toDataURL('image/png');
        const element = document.createElement("a");
        element.href = imageUrl;
        element.download = "yapper.png";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } catch (err) {
        console.error('Error capturing card:', err);
      } finally {
        setIsDownloading(false); // Reset downloading state after completion
      }
    }
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(content.text)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(content.text)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(content.title)}&summary=${encodeURIComponent(content.text)}`, '_blank');
  };

  return (
    <div className="bg-white p-2 rounded">
      {/* Card Component */}
      <Card ref={cardRef} className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">{content.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg font-medium">{content.text}</p>
        </CardContent>
      </Card>

      {/* Download Button and Share Buttons outside of the Card */}
      <div className="flex flex-col gap-2 mt-4">
        {/* Download Button */}
        <Button
          onClick={downloadContent}
          className="w-full"
          disabled={isDownloading} // Disable button during download
        >
          <div className="flex items-center gap-2">
            {isDownloading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" /> {/* Loading spinner */}
                Downloading...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download
              </>
            )}
          </div>
        </Button>

        {/* Share Buttons */}
        <div className="flex justify-center gap-2 w-full mt-2">
          <Button onClick={shareOnTwitter} size="icon" variant="outline">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button onClick={shareOnFacebook} size="icon" variant="outline">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button onClick={shareOnLinkedIn} size="icon" variant="outline">
            <Linkedin className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}