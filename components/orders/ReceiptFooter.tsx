// Closing lines of the browser-printed receipt (class names map to
// `invoicePrintStyles`). Shared by ReceiptPrintContent and EditOrderForm's
// print copy; with multi-tenancy the lines come from the organization.
const DEFAULT_LINES = ["¡Gracias por su visita!", "Laguna Escondida"];

interface ReceiptFooterProps {
  lines?: string[];
}

export default function ReceiptFooter({ lines = DEFAULT_LINES }: ReceiptFooterProps) {
  return (
    <div className="footer">
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
}
