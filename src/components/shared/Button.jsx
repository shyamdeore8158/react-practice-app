function Button({children,classText,onClick})
{
    return(
        <div>
            <button className={classText} onClick={onClick}> {children}</button>
        </div>
    )
}

export default Button