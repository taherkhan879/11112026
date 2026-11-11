export default function SortControls({ value, onChange }) {
  return (
    <label className="control-field">
      <span>Sort by</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="release_desc">Release date: newest first</option>
        <option value="release_asc">Release date: oldest first</option>
        <option value="rating_desc">Rating: highest first</option>
        <option value="rating_asc">Rating: lowest first</option>
      </select>
    </label>
  )
}
