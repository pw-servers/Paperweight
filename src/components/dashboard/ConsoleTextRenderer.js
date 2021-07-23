import React, {useEffect} from "react";
import ReactHTMLParser from 'react-html-parser';

// This file contains a lot of raw HTML (not JSX) that is parsed by ReactHTMLParser.
// This is done to make it easier to handle the layers of parsing done to mark up the console text.
// The formatting in an IDE may look strange.

export function ConsoleTextRenderer(props) {
    let consoleRef = React.createRef();
    const text = props.text;

    useEffect(() => {
        consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    })

    return (
        <div className="console-text" ref={consoleRef}>{
            (text || []).map((t, ind) => {
                return parseLine(t, ind);
            })
        }</div>
    )
}

function parseLine(line, index) {
    let outLine = line;
    if(line.trim() === "") return;
    // This is a strange way to format this, can't think of anything better though
    outLine = makeLinksClickable(
                decorateUserInput(
                    escapeDangerousCharacters(
                        line.trim()
                    )
                )
    )

    return <p>{ReactHTMLParser(outLine)}</p>;
}

function makeLinksClickable(line) {
    // eslint-disable-next-line no-control-regex
    const regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&/=]*)/, 'gi');
    const matches = line.matchAll(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi);
    for (let match of matches) {
        line = line.replaceAll(match[0], "<a target='_blank' class='console-link' href='" + match[0] +"'>" + match[0] + "</a>");
    }
    return line;
}

function decorateUserInput(line) {
    if(!(line[0] === "[")) {
        return "<strong class='text-muted'>> " + line + "</strong>";
    }
    return line;
}

function escapeDangerousCharacters(line) {
    return line.replaceAll(">", "&gt;").replaceAll("<", "&lt;");
}

