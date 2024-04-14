export default function Filter ({filterValue, onFilterChange}){
return (
    <>
    <div>
      filter shown with <input value={filterValue} onChange={onFilterChange}/>
    </div>
    </>
)
} 