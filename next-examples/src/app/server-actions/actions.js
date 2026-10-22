"use server";

import { revalidatePath } from "next/cache";

let messages = [
  {
    id: 1,
    text: "Mensagem inicial criada no servidor.",
  },
];

export async function getMessages() {
  return messages;
}

export async function addMessage(previousState, formData) {
  const text = formData.get("text")?.toString().trim() ?? "";

  if (!text) {
    return { error: "Digite uma mensagem antes de enviar.", success: false };
  }

  messages = [...messages, { id: Date.now(), text }];
  revalidatePath("/server-actions");

  return { error: null, success: true };
}

export async function removeMessage(formData) {
  const id = Number(formData.get("id"));

  if (!Number.isNaN(id)) {
    messages = messages.filter((message) => message.id !== id);
    revalidatePath("/server-actions");
  }
}
