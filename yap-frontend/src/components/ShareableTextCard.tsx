'use client'

import * as React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Twitter, Facebook, Linkedin } from 'lucide-react'
import html2canvas from 'html2canvas'

export default function ShareableTextCard({yapper_text}: {yapper_text:string}) {
  const cardRef = React.useRef(null);
  const content = {
    title: "Happy yapping! Slay 💅",
    text: yapper_text,
  }

  const downloadContent = async () => {
    if (cardRef.current) {
      try {
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
      }
    }
  }

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(content.text)}`, '_blank');
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(content.text)}`, '_blank');
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(content.title)}&summary=${encodeURIComponent(content.text)}`, '_blank');
  }

  return (
    <Card ref={cardRef} className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">{content.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-lg font-medium">{content.text}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button onClick={downloadContent} className="w-full">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
        <div className="flex justify-center gap-2 w-full">
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
      </CardFooter>
    </Card>
  )
}