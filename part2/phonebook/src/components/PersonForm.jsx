export default function PersonFormSubmit ({onFormSubmit, children}){
    return (
            <form onSubmit={onFormSubmit}>
                {children}
            </form>
    )
}