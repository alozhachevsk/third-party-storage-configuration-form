export interface DestinationJsonProps {
  data: Record<string, unknown>;
}

export function DestinationJson({ data }: DestinationJsonProps) {
  return (
    <div className="mt-5 w-full rounded-md bg-gray-100 p-4 break-words shadow-md">
      <h3 className="mb-2 text-lg font-medium">Destination JSON:</h3>
      <pre className="overflow-x-auto">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}
