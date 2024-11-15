import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ShareableTextCard from '@/components/ShareableTextCard'

export default function TextareaWithButton() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="grid w-full gap-2">
          <Textarea placeholder="Type your milennial/boomer lingo here." />
          <Button>Make me sound cool ✨ </Button>
          <ShareableTextCard />
        </div>
      </div>
    </div>
  );
}

