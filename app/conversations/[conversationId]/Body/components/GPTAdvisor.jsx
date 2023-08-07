"use client";

import axios from "axios";
import { useState } from "react";
import { BiError } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";

import Button from "@/shared-components/buttons/Button";
import Textarea from "@/shared-components/inputs/Textarea";
import AppModal from "@/shared-components/modals/AppModal";

function Body({ data, onClose }) {
  const [formState, setFormState] = useState({
    context: "",
    message: data?.body,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(false); 
  const [gptResult, setGptResult] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    setFormLoading(true);
    setFormError(false);

    axios.post("/api/gptadvisor", formState)
      .then((res) => {
        setGptResult(res.data.content);
      })
      .catch(() => {
        setFormError(true);
      })
      .finally(() => {
        setFormLoading(false);
      });
  }
  
  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex w-full flex-col items-center gap-x-4 gap-y-2 sm:flex-row sm:items-start">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100">
          <GiBrain size={26} className="text-sky-500" />
        </div>

        <div className="flex w-full flex-col items-center gap-y-2 sm:items-start">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            Welcome to GPTAdvisor!
          </h2>
            
          <p className="text-sm text-gray-500">
            Ever found yourself unsure about the perfect response in a conversation? 
            Our AI-powered feature is here to help! Simply select a message you want 
            to respond to, and provide a brief context about the ongoing conversation or situation. 
            Our AI will then generate a fitting response for you. 
          </p>

          <Textarea
            id="gpt-advisor-context"
            label="Context"
            placeholder="Give a brief context around the text you selected so that the AI can generate the best response for you. For example: 'I'm trying to convince my friend to go to the movies with me.'"
            className="min-h-[200px] w-full resize-none hyphens-auto text-justify"
            value={formState.context}
            onChange={(e) => setFormState((prev) => ({ ...prev, context: e.target.value }))}
            disabled={formLoading}
            required
          />

          <div className="mt-4 flex w-full justify-end gap-x-2">
            <Button
              onClick={onClose}
              secondary
            >
              Cancel
            </Button>

            <Button
              type="submit"
              includeLoader={formLoading}
              disabled={formLoading}
            >
              {
                gptResult ?
                  "Try another" 
                  :
                  "Generate Response"
              }
            </Button>
          </div>
        </div>
      </form>

      {gptResult && (
        <div className="mt-3 flex w-full items-start gap-x-2 rounded-lg bg-sky-100 p-3">
          <GiBrain size={20} className="shrink-0 text-sky-500"/>

          <p className="w-full whitespace-pre-line text-justify text-sm text-gray-500">
            {gptResult}
          </p>
        </div>
      )}

      {formError && (
        <div className="mt-3 flex w-full items-start gap-x-2">
          <BiError size={20} className="shrink-0 text-red-500"/>

          <p className="w-full text-sm text-red-500">
            GPTAdvisor is currently unavailable because API credits have been exhausted.
          </p>
        </div>
      )}
    </div>
  );
}

export default function GPTAdvisor({ data, onClose }) {
  return (
    <AppModal isOpen={Boolean(data)} onClose={onClose}>
      <Body data={data} onClose={onClose}/>
    </AppModal>
  );
}