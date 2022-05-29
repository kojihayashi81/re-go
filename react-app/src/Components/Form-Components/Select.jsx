const Select = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {" "}{props.title}{" "}
      </label>
      <select
        className="form-control"
        name={props.name}
        defaultValue={props.defaultValue}
        onChange={props.handleChange}
      >
        <option value="">{props.placeholder}</option>
        {props.options.map((option) => {
          return (
            <option
              className="form-control"
              key={option.id}
              value={option.id}
              label={option.value}
            >
              {option.value}
            </option>
          )
        })}
      </select>
    </div >
  )
}
export default Select
