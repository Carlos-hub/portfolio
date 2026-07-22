const PHONE = "5549991117061";

export function whatsappLink(message: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
