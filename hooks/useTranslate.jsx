import { useEffect, useState } from "react";
import { OpenAI } from "openai";

console.log(process.env.OPENAI_API_KEY);


const openai = new OpenAI({
  organization:"org-axsl22B4WIdFCqpO0ErsD4QQ",
  project:"proj_OqCxH6taPWT2Lq863oxKsIok",
  apiKey:'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',
  dangerouslyAllowBrowser: true,
});

const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async (sourceText) => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `You will be provided with a sentence. This sentence: 
              ${sourceText}. Your tasks are to:
              - Detect what language the sentence is in
              - Translate the sentence into ${selectedLanguage}
              Do not return anything other than the translated sentence.`,
            },
          ],
        });

        const data = response.choices[0].message.content;
        setTargetText(data);
      } catch (error) {
        console.error("Error translating text:", error);
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;