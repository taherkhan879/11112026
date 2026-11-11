export default function RatingFilter({ value, onChange }) {
  return (
    <label className="control-field">
      <span>Minimum rating</span>
      <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
        <option value={0}>Any rating</option>
        <option value={5}>5.0+</option>
        <option value={6}>6.0+</option>
        <option value={7}>7.0+</option>
        <option value={8}>8.0+</option>
      </select>
    </label>
  )
}
