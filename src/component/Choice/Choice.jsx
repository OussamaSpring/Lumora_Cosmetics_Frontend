import "./Choice.css"
export default function Choice({icon1,text,icon2}) {
  return (
    <div className="Choice">
        <div className="icon">{icon1}</div>
        <p>{text}</p>
        <div className="icon2">{icon2}</div>
    </div>
  )
}
