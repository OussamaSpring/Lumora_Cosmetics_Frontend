import './Field.css';

export default function Field({
  name,
  type = "text",
  focusColor = "green",
  width = "100%",
  height = "50px", 
  fontSize = "1em",
  borderRadius = "10px",
  textLabel = "Enter your Text",
  labelFontSize = "0.9em",
  value,
  onChange
}) {
  return (
    <div className="Field">
      <div className="container" style={{ width }}>
      <div className="entryarea" style={{ height, lineHeight: height }}>
        <input
          name={name}
          type={type}
          required
          placeholder=''
          value={value}
          onChange={onChange}
          style={{
            height,
            fontSize,
            borderRadius,
            borderColor: "gray",
            width: '100%',
            
          }}
        />
        <div className="labelline" style={{ fontSize: labelFontSize }}>
          {textLabel}
        </div>
        <style>{`
          input:focus, input:valid {
            border-color: ${focusColor};
          }
          input:focus + .labelline,
          input:not(:placeholder-shown) + .labelline {
            color: ${focusColor};
          }
        `}</style>
      </div>
    </div>
    </div>
    
  );
}
