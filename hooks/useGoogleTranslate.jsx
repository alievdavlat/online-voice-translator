
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";

  
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
   export const AIChatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
  
    const useTranslate = (sourceText, selectedLanguage) => {
      const [targetText, setTargetText] = useState("");
    
      useEffect(() => {
        const handleTranslate = async (sourceText) => {
          try {
            const {response} =   await AIChatSession.sendMessage(`Translate this text: ${sourceText} into ${selectedLanguage}`)
              const data = JSON.parse(response.candidates[0].content.parts[0].text)
              
            setTargetText(data.translation);
          } catch (error) {
            console.error("Error translating text:", error);
          }
        };
    
        if (sourceText.trim()) {
          const timeoutId = setTimeout(() => {
            handleTranslate(sourceText);
          }, 500); 
    
          return () => clearTimeout(timeoutId);
        }
      }, [sourceText, selectedLanguage]);
    
      return targetText;
    };
    
    export default useTranslate;


  