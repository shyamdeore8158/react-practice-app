function Header({bgColor , textColor , text})
{
    const headerStyle = {
        backgroundColor : bgColor,
        color : textColor
    }
    return(
        <header style={{headerStyle}}>
            <div className="container">
                <h4>{text}</h4>
            </div>
        </header>
    )
}
Header.defaultProps = {  // default props
    bgColor: "rgba(0,0,0,0.4)",
    textColor: "#ff6a95",
}
export default Header