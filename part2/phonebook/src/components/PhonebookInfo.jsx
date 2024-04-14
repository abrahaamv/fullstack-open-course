export default function PhonebookInfo ({persons, handleClick}){

    return (
        <table>
        <tbody>
            {
                persons.map(person => 
                <tr key={person.name}>
                    <td>{person.name}</td>
                    <td>{person.number}</td>
                    <td><button onClick={()=> handleClick(person)}>delete</button></td>
                </tr>)
            }
        </tbody>
        </table>
        )
}