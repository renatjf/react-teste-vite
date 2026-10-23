"use server";

import { revalidatePath } from "next/cache";

export interface Message {
  id: number;
  text: string;
}

export interface MessageActionState {
  error: string | null;
  success: boolean;
}

let messages: Message[] = [
  {
    id: 1,
    text: "Mensagem inicial criada no servidor.",
  },
];

export async function getMessages(): Promise<Message[]> {
  return messages;
}

export async function addMessage(
  _previousState: MessageActionState,
  formData: FormData
): Promise<MessageActionState> {
  const text = formData.get("text")?.toString().trim() ?? "";

  if (!text) {
    return { error: "Digite uma mensagem antes de enviar.", success: false };
  }

  messages = [...messages, { id: Date.now(), text }];
  revalidatePath("/server-actions");

  return { error: null, success: true };
}

export async function removeMessage(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));

  if (!Number.isNaN(id)) {
    messages = messages.filter((message) => message.id !== id);
    revalidatePath("/server-actions");
  }
}
