"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ShareableTextCard from "@/components/ShareableTextCard";
import { useState } from "react";
import { generateYap } from "@/services/apiService";

export default function HomePage() {
  const [yapInput, setYapInput] = useState<string>(""); 
  const [trueYapperText, setTrueYapperText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setYapInput(e.target.value);
  };

  const handleConvertToYapper = async () => {
    setLoading(true);
    setError(null); //

    try {
      const yapperText = await generateYap(yapInput);
      setTrueYapperText(yapperText);
    } catch (err) {
        console.log(err);
      setError("Failed to generate yap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="grid w-full gap-2">
          <Textarea
            onChange={handleInputChange}
            placeholder="Type your millennial/boomer lingo here."
            value={yapInput} 
          />
          <Button onClick={handleConvertToYapper} disabled={loading}>
            {loading ? "Converting..." : "Make me sound cool ✨"}
          </Button>

          {error && <p className="text-red-500">{error}</p>} 

          <ShareableTextCard yapper_text={trueYapperText} />
        </div>
      </div>
    </div>
  );
}
