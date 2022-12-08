export default function Messages({ messages }) {
    return (
        <div>
            {messages.map((message) => {
                return (
                    <div>
                        <label>{message.owner}</label>
                        <span>{message.message}</span>
                    </div>
                )
            })}
        </div>
    )
}