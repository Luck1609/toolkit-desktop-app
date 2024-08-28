export default function Filter({ table }) {
  return (
    <input
      placeholder="Filter..."
      value={table.getColumn("email")?.getFilterValue() ?? ""}
      onChange={(event) =>
        table.getColumn("email")?.setFilterValue(event.target.value)
      }
      className="max-w-md p-2 rounded"
    />
  );
}
