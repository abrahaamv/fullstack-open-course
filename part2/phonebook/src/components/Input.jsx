export default function Input ({ inputLabel, inputValue, onInputChange}){
    return (
      <div>
        {inputLabel} <input onChange={onInputChange} value={inputValue} />
      </div>
    )
}