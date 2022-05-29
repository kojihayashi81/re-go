const TextArea = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <textarea
        className="form-control"
        id={props.name}
        name={props.name}
        defaultValue={props.defaultValue}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        rows={props.rows}
      />
    </div>
  )
}
export default TextArea
