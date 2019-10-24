import React, { useState, useRef } from "react";
import './CollapsibleList.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CollapsibleList(props) {
    const { items, title, cutoff } = props
    const [collapsed, setCollapsed] = useState(items.length > cutoff)
    let ul = useRef();

    const getClassName = () => `${collapsed ? 'section collapsed' : 'section'}`
    const getMoreLessText = () => collapsed ? <>More <FontAwesomeIcon icon="caret-down" color="purple" /></> : <>Less <FontAwesomeIcon icon="caret-up" color="purple" /></>

    return (
        <div className="filter-item">
            {title ? <><h4>{title}</h4><FontAwesomeIcon icon="caret-down" color="purple" /></> : null}
            <div className="contained" style={ul.current ? { height: (collapsed ? `${cutoff + .5}em` : ul.current.offsetHeight) } : {}}>
                <div className={`ease-in-out ${getClassName()}`} style={{ flex: `${cutoff + .5}em` }} >
                    <ul ref={ul}>
                        {items.map((item, i) => <li key={i}> {item} </li>)}
                    </ul >
                </div>
                {items.length > cutoff ? <div id="more-less" onClick={() => setCollapsed(!collapsed)}> {getMoreLessText()} </div> : null}

            </div>
        </div>
    )
}

export default CollapsibleList
