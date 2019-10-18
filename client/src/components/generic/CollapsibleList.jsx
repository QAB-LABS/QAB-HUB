import React, { useState, useRef } from "react";
import './CollapsibleList.scss'

function CollapsibleList(props) {
    const { items, title, cutoff } = props
    const [collapsed, setCollapsed] = useState(items.length > cutoff)
    let ul = useRef();

    const getClassName = () => `${collapsed ? 'section collapsed' : 'section'}`
    const getMoreLessText = () => collapsed ? 'more' : 'less'

    return (
        <React.Fragment>
            {title ? <strong>{title}</strong> : null}
            <div className="contained" style={ul.current ? { height: (collapsed ? `${cutoff + .5}em` : ul.current.offsetHeight) } : {}}>
                <div className={`ease-in-out ${getClassName()}`} style={{ flex: `${cutoff + .5}em` }} >
                    <ul ref={ul}>
                        {items.map((item, i) => <li key={i}> {item} </li>)}
                    </ul >
                </div>
                {items.length > cutoff ? <div id="more-less" onClick={() => setCollapsed(!collapsed)}> {getMoreLessText()} </div> : null}

            </div>
        </React.Fragment >
    )
}

export default CollapsibleList
