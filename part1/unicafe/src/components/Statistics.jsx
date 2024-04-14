import StatisticLine from "./StatisticLine"

const Statistics = ({feedback}) => {
    const [ good, neutral, bad ] = feedback
    const all = good + neutral + bad

    return (
        all > 0
        ? (
            <>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={good - bad  / 3} />
            <StatisticLine text='positive' value={good * 100/ all} />
            </>
        )
        : ( <div>No feedback given</div>)
    )
}

export default Statistics